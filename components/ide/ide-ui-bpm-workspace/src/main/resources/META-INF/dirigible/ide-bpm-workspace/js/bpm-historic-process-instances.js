/*
 * Copyright (c) 2024 Eclipse Dirigible contributors
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-FileCopyrightText: Eclipse Dirigible contributors
 * SPDX-License-Identifier: EPL-2.0
 */
let ideBpmHistoricProcessInstancesView = angular.module('ide-bpm-historic-process-instances', ['ideUI', 'ideView']);

ideBpmHistoricProcessInstancesView.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'bpm';
}]);

ideBpmHistoricProcessInstancesView.controller('IDEBpmHistoricProcessInstancesViewController', ['$scope', '$http', '$timeout', 'messageHub', function ($scope, $http, $timeout, messageHub) {

    $scope.instances = [];

    setInterval(() => {
        $scope.fetchData();
    }, 5000);

    $scope.reload = function () {
        console.log("Reloading historic process instances data")
        $scope.fetchData();
    };

    $scope.fetchData = function() {
        $http.get('/services/ide/bpm/bpm-processes/historic-instances', { params: { 'limit': 100 } })
                .then((response) => {
                    $scope.instances = response.data;
                });
    }

    $scope.getNoDataMessage = function () {
        return 'No historic instances have been found.';
    }

    $scope.selectionChanged = function (instance) {
        //$scope.selectAll = $scope.instancesList.every(x => x.selected = false);
        messageHub.postMessage('historic.instance.selected', { instance: instance.id });
//        instance.selected = true;
//        this.selectedProcessInstanceId = instance.id;
    }

}]);