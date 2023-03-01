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
package org.eclipse.dirigible.core.extensions.synchronizer;

import java.io.IOException;

import org.eclipse.dirigible.commons.api.content.AbstractClasspathContentHandler;
import org.eclipse.dirigible.core.extensions.api.IExtensionsCoreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class ExtensionsClasspathContentHandler.
 */
public class ExtensionsClasspathContentHandler extends AbstractClasspathContentHandler {

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(ExtensionsClasspathContentHandler.class);

	/** The extensions synchronizer. */
	private ExtensionsSynchronizer extensionsSynchronizer = new ExtensionsSynchronizer();

	/**
	 * Checks if is valid.
	 *
	 * @param path the path
	 * @return true, if is valid
	 */
	/*
	 * (non-Javadoc)
	 * @see org.eclipse.dirigible.commons.api.content.AbstractClasspathContentHandler#isValid(java.lang.String)
	 */
	@Override
	protected boolean isValid(String path) {

		try {
			if (path.endsWith(IExtensionsCoreService.FILE_EXTENSION_EXTENSIONPOINT)) {
				extensionsSynchronizer.registerPredeliveredExtensionPoint(path);
				return true;
			}

			if (path.endsWith(IExtensionsCoreService.FILE_EXTENSION_EXTENSION)) {
				extensionsSynchronizer.registerPredeliveredExtension(path);
				return true;
			}
		} catch (IOException e) {
			if (logger.isErrorEnabled()) {logger.error("Predelivered Extension Point or Extension at path [" + path + "] is not valid", e);}
		}

		return false;
	}

	/**
	 * Gets the logger.
	 *
	 * @return the logger
	 */
	/*
	 * (non-Javadoc)
	 * @see org.eclipse.dirigible.commons.api.content.AbstractClasspathContentHandler#getLogger()
	 */
	@Override
	protected Logger getLogger() {
		return logger;
	}

}
