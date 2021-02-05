/*
 * Copyright (c) 2010-2021 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-FileCopyrightText: 2010-2021 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 * SPDX-License-Identifier: EPL-2.0
 */
exports.getTemplate = function() {
	var view = {
			"name":"access",
			"label":"Access Constraints",
			"extension":"access",
			"data":JSON.stringify(JSON.parse('{"constraints":[{"path":"/myproject/myfolder/myservice.js","method":"GET","roles":["administrator","operator"]}]}'), null, 2)
	};
	return view;
};
