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

const DatabaseFacade = Java.type("org.eclipse.dirigible.components.api.db.DatabaseFacade");

export function nextval(sequence, datasourceName = null, tableName = null) {
	return DatabaseFacade.nextval(sequence, datasourceName, tableName);
};

export function create(sequence, datasourceName = null) {
	DatabaseFacade.createSequence(sequence, datasourceName);
};

export function drop(sequence, datasourceName = null) {
	DatabaseFacade.dropSequence(sequence, datasourceName);
};