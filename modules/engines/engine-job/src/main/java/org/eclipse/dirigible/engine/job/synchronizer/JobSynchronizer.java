/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-FileCopyrightText: 2023 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipse.dirigible.engine.job.synchronizer;

import static java.text.MessageFormat.format;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.IOUtils;
import org.eclipse.dirigible.api.v3.problems.IProblemsConstants;
import org.eclipse.dirigible.api.v3.problems.ProblemsFacade;
import org.eclipse.dirigible.core.problems.exceptions.ProblemsException;
import org.eclipse.dirigible.core.scheduler.api.AbstractSynchronizer;
import org.eclipse.dirigible.core.scheduler.api.ISchedulerCoreService;
import org.eclipse.dirigible.core.scheduler.api.ISynchronizerArtefactType.ArtefactState;
import org.eclipse.dirigible.core.scheduler.api.SchedulerException;
import org.eclipse.dirigible.core.scheduler.api.SynchronizationException;
import org.eclipse.dirigible.core.scheduler.manager.SchedulerManager;
import org.eclipse.dirigible.core.scheduler.service.SchedulerCoreService;
import org.eclipse.dirigible.core.scheduler.service.definition.JobDefinition;
import org.eclipse.dirigible.engine.job.artefacts.JobSynchronizationArtefactType;
import org.eclipse.dirigible.repository.api.IResource;
import org.quartz.TriggerKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class JobSynchronizer.
 */
public class JobSynchronizer extends AbstractSynchronizer {

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(JobSynchronizer.class);

	/** The Constant JOBS_PREDELIVERED. */
	private static final Map<String, JobDefinition> JOBS_PREDELIVERED = Collections.synchronizedMap(new HashMap<String, JobDefinition>());

	/** The Constant JOBS_SYNCHRONIZED. */
	private static final List<String> JOBS_SYNCHRONIZED = Collections.synchronizedList(new ArrayList<String>());

	/** The scheduler core service. */
	private SchedulerCoreService schedulerCoreService = new SchedulerCoreService();

	/** The synchronizer name. */
	private final String SYNCHRONIZER_NAME = this.getClass().getCanonicalName();

	/** The Constant JOB_ARTEFACT. */
	private static final JobSynchronizationArtefactType JOB_ARTEFACT = new JobSynchronizationArtefactType();

	/**
	 * Synchronize.
	 */
	/*
	 * (non-Javadoc)
	 * @see org.eclipse.dirigible.core.scheduler.api.ISynchronizer#synchronize()
	 */
	@Override
	public void synchronize() {
		synchronized (JobSynchronizer.class) {
			if (beforeSynchronizing()) {
				if (logger.isTraceEnabled()) {logger.trace("Synchronizing Jobs...");}
				try {
					if (isSynchronizationEnabled()) {
						startSynchronization(SYNCHRONIZER_NAME);
						clearCache();
						synchronizePredelivered();
						synchronizeRegistry();
						startJobs();
						int immutableCount = JOBS_PREDELIVERED.size();
						int mutableCount = JOBS_SYNCHRONIZED.size();
						cleanup();
						clearCache();
						successfulSynchronization(SYNCHRONIZER_NAME, format("Immutable: {0}, Mutable: {1}", immutableCount, mutableCount));
					} else {
						if (logger.isDebugEnabled()) {logger.debug("Synchronization has been disabled");}
					}
				} catch (Exception e) {
					if (logger.isErrorEnabled()) {logger.error("Synchronizing process for Jobs failed.", e);}
					try {
						failedSynchronization(SYNCHRONIZER_NAME, e.getMessage());
					} catch (SchedulerException e1) {
						if (logger.isErrorEnabled()) {logger.error("Synchronizing process for Jobs files failed in registering the state log.", e);}
					}
				}
				if (logger.isTraceEnabled()) {logger.trace("Done synchronizing Jobs.");}
				afterSynchronizing();
			}
		}
	}

	/**
	 * Force synchronization.
	 */
	public static final void forceSynchronization() {
		JobSynchronizer synchronizer = new JobSynchronizer();
		synchronizer.setForcedSynchronization(true);
		try {
			synchronizer.synchronize();
		} finally {
			synchronizer.setForcedSynchronization(false);
		}
	}

	/**
	 * Register predelivered job.
	 *
	 * @param jobPath
	 *            the job path
	 * @throws IOException
	 *             Signals that an I/O exception has occurred.
	 */
	public void registerPredeliveredJob(String jobPath) throws IOException {
		InputStream in = JobSynchronizer.class.getResourceAsStream("/META-INF/dirigible" + jobPath);
		try {
			String json = IOUtils.toString(in, StandardCharsets.UTF_8);
			JobDefinition jobDefinition = schedulerCoreService.parseJob(json);
			jobDefinition.setName(jobPath);
			JOBS_PREDELIVERED.put(jobPath, jobDefinition);
		} finally {
			if (in != null) {
				in.close();
			}
		}
	}

	/**
	 * Synchronize registry.
	 *
	 * @throws SynchronizationException the synchronization exception
	 */
	/*
	 * (non-Javadoc)
	 * @see org.eclipse.dirigible.core.scheduler.api.AbstractSynchronizer#synchronizeRegistry()
	 */
	@Override
	protected void synchronizeRegistry() throws SynchronizationException {
		if (logger.isTraceEnabled()) {logger.trace("Synchronizing Jobs from Registry...");}

		super.synchronizeRegistry();

		if (logger.isTraceEnabled()) {logger.trace("Done synchronizing Jobs from Registry.");}
	}

	/**
	 * Synchronize resource.
	 *
	 * @param resource the resource
	 * @throws SynchronizationException the synchronization exception
	 */
	/*
	 * (non-Javadoc)
	 * @see org.eclipse.dirigible.core.scheduler.api.AbstractSynchronizer#synchronizeResource(org.eclipse.dirigible.
	 * repository.api.IResource)
	 */
	@Override
	protected void synchronizeResource(IResource resource) throws SynchronizationException {
		String resourceName = resource.getName();
		if (resourceName.endsWith(ISchedulerCoreService.FILE_EXTENSION_JOB)) {
			JobDefinition jobDefinition = schedulerCoreService.parseJob(resource.getContent());
			jobDefinition.setName(getRegistryPath(resource));
			synchronizeJob(jobDefinition);
		}

	}

	/**
	 * Cleanup.
	 *
	 * @throws SynchronizationException the synchronization exception
	 */
	/*
	 * (non-Javadoc)
	 * @see org.eclipse.dirigible.core.scheduler.api.AbstractSynchronizer#cleanup()
	 */
	@Override
	protected void cleanup() throws SynchronizationException {
		if (logger.isTraceEnabled()) {logger.trace("Cleaning up Jobs...");}
		super.cleanup();

		try {
			List<JobDefinition> jobDefinitions = schedulerCoreService.getJobs();
			for (JobDefinition jobDefinition : jobDefinitions) {
				if (!JOBS_SYNCHRONIZED.contains(jobDefinition.getName())) {
					schedulerCoreService.removeJob(jobDefinition.getName());
					if (logger.isWarnEnabled()) {logger.warn("Cleaned up Job [{}] from group: {}", jobDefinition.getName(), jobDefinition.getGroup());}
				}
			}
		} catch (SchedulerException e) {
			throw new SynchronizationException(e);
		}

		if (logger.isTraceEnabled()) {logger.trace("Done cleaning up Jobs.");}
	}

	/**
	 * Start jobs.
	 *
	 * @throws SchedulerException the scheduler exception
	 */
	private void startJobs() throws SchedulerException {
		if (logger.isTraceEnabled()) {logger.trace("Start Jobs...");}

		for (String jobName : JOBS_SYNCHRONIZED) {
			if (!SchedulerManager.existsJob(jobName)) {
				JobDefinition jobDefinition = schedulerCoreService.getJob(jobName);
				try {
					SchedulerManager.scheduleJob(jobDefinition);
					applyArtefactState(jobDefinition, JOB_ARTEFACT, ArtefactState.SUCCESSFUL_CREATE);
				} catch (SchedulerException e) {
					if (logger.isErrorEnabled()) {logger.error(e.getMessage(), e);}
					applyArtefactState(jobDefinition, JOB_ARTEFACT, ArtefactState.FAILED_CREATE, e.getMessage());
				}
			}
		}

		Set<TriggerKey> runningJobs = SchedulerManager.listJobs();
		for (TriggerKey jobKey : runningJobs) {
			JobDefinition jobDefinition = null;
			try {
				if (!JOBS_SYNCHRONIZED.contains(jobKey.getName())) {
					SchedulerManager.unscheduleJob(jobKey.getName(), jobKey.getGroup());
					if (ISchedulerCoreService.JOB_GROUP_DEFINED.equals(jobKey.getGroup())) {
						jobDefinition = schedulerCoreService.getJob(jobKey.getName());
						applyArtefactState(jobDefinition, JOB_ARTEFACT, ArtefactState.SUCCESSFUL_DELETE);
					}
				}
			} catch (SchedulerException e) {
				if (logger.isErrorEnabled()) {logger.error(e.getMessage(), e);}
				applyArtefactState(jobDefinition, JOB_ARTEFACT, ArtefactState.FAILED_DELETE, e.getMessage());
			}
		}

		if (logger.isTraceEnabled()) {logger.trace("Running Jobs: " + runningJobs.size());}
		if (logger.isTraceEnabled()) {logger.trace("Done starting Jobs.");}
	}

	/**
	 * Clear cache.
	 */
	private void clearCache() {
		JOBS_SYNCHRONIZED.clear();
	}

	/**
	 * Synchronize predelivered.
	 *
	 * @throws SynchronizationException the synchronization exception
	 */
	private void synchronizePredelivered() throws SynchronizationException {
		if (logger.isTraceEnabled()) {logger.trace("Synchronizing predelivered Jobs...");}
		// Jobs
		for (JobDefinition jobDefinition : JOBS_PREDELIVERED.values()) {
			synchronizeJob(jobDefinition);
		}
		if (logger.isTraceEnabled()) {logger.trace("Done synchronizing predelivered Jobs.");}
	}

	/**
	 * Synchronize job.
	 *
	 * @param jobDefinition the job definition
	 * @throws SynchronizationException the synchronization exception
	 */
	private void synchronizeJob(JobDefinition jobDefinition) throws SynchronizationException {
		try {
			if (!schedulerCoreService.existsJob(jobDefinition.getName())) {
				schedulerCoreService.createJob(jobDefinition.getName(), jobDefinition.getGroup(), jobDefinition.getClazz(),
						jobDefinition.getHandler(), jobDefinition.getEngine(), jobDefinition.getDescription(), jobDefinition.getExpression(),
						jobDefinition.isSingleton(), jobDefinition.getParameters());
				if (logger.isInfoEnabled()) {logger.info("Synchronized a new Job [{}] from group: {}", jobDefinition.getName(), jobDefinition.getGroup());}
				applyArtefactState(jobDefinition, JOB_ARTEFACT, ArtefactState.SUCCESSFUL_CREATE);
			} else {
				JobDefinition existing = schedulerCoreService.getJob(jobDefinition.getName());
				if (!jobDefinition.equals(existing)) {
					schedulerCoreService.updateJob(jobDefinition.getName(), jobDefinition.getGroup(), jobDefinition.getClazz(),
							jobDefinition.getHandler(), jobDefinition.getEngine(), jobDefinition.getDescription(), jobDefinition.getExpression(),
							jobDefinition.isSingleton(), jobDefinition.getParameters());
					if (logger.isInfoEnabled()) {logger.info("Synchronized a modified Job [{}] from group: {}", jobDefinition.getName(), jobDefinition.getGroup());}
					applyArtefactState(jobDefinition, JOB_ARTEFACT, ArtefactState.SUCCESSFUL_UPDATE);
				}
			}
			JOBS_SYNCHRONIZED.add(jobDefinition.getName());
		} catch (SchedulerException e) {
			logProblem(e.getMessage(), ERROR_TYPE, jobDefinition.getName(), JOB_ARTEFACT.getId());
			throw new SynchronizationException(e);
		}
	}
	
	/** The Constant ERROR_TYPE. */
	private static final String ERROR_TYPE = "JOB";
	
	/** The Constant MODULE. */
	private static final String MODULE = "dirigible-engine-job";
	
	/**
	 * Use to log problem from artifact processing.
	 *
	 * @param errorMessage the error message
	 * @param errorType the error type
	 * @param location the location
	 * @param artifactType the artifact type
	 */
	private static void logProblem(String errorMessage, String errorType, String location, String artifactType) {
		try {
			ProblemsFacade.save(location, errorType, "", "", errorMessage, "", artifactType, MODULE, JobSynchronizer.class.getName(), IProblemsConstants.PROGRAM_DEFAULT);
		} catch (ProblemsException e) {
			if (logger.isErrorEnabled()) {logger.error(e.getMessage(), e.getMessage());}
		}
	}

}
