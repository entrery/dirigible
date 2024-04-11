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
/*
 * Generated by Eclipse Dirigible based on model and template.
 *
 * Do not modify the content as it may be re-generated again.
 */
angular.module('page', ["ideUI", "ideView", "entityApi"])
	.config(["messageHubProvider", function(messageHubProvider) {
		messageHubProvider.eventIdPrefix = 'inbox.launchpad.Home';
	}])
	.config(["entityApiProvider", function(entityApiProvider) {
		entityApiProvider.baseUrl = "/services/js/inbox/ui/launchpad/Home/tiles.js";
	}])
	.controller('PageController', ['$scope', 'messageHub', 'entityApi', function($scope, messageHub, entityApi) {

		$scope.openView = function(location) {
			messageHub.postMessage("openView", {
				location: location
			});
		}

		entityApi.list().then(function(response) {
			if (response.status != 200) {
				messageHub.showAlertError("Home", `Unable to get Home Launchpad: '${response.message}'`);
				return;
			}
			$scope.data = response.data;
			$scope.groups = Object.keys(response.data);

			$scope.tiles = [];
			for (let group in $scope.groups) {
				let ta = $scope.data[$scope.groups[group]];
				for (let t in ta) {
					ta[t].group = $scope.groups[group];
				}
				$scope.tiles = $scope.tiles.concat($scope.data[$scope.groups[group]]);
			}
		});








		$scope.tasksList = [];
		$scope.tasksListAssignee = [];
		$scope.currentProcessInstanceId;
		$scope.selectedClaimTask = null;
		$scope.selectedUnclaimTask = null;

		$scope.currentFetchDataTask = null;

		$scope.reload = function() {
			console.log("Reloading user tasks for current process instance id: " + $scope.currentProcessInstanceId)
			$scope.fetchData($scope.currentProcessInstanceId);
		};

		$scope.fetchData = function(processInstanceId) {
			$http.get('/services/ide/bpm/bpm-processes/instance/' + processInstanceId + '/tasks?type=groups', { params: { 'limit': 100 } })
				.then((response) => {
					$scope.tasksList = response.data;
				});

			$http.get('/services/ide/bpm/bpm-processes/instance/' + processInstanceId + '/tasks?type=assignee', { params: { 'limit': 100 } })
				.then((response) => {
					$scope.tasksListAssignee = response.data;
				});
		}

		messageHub.onDidReceiveMessage('instance.selected', function(msg) {
			const processInstanceId = msg.data.instance;
			$scope.fetchData(processInstanceId);
			$scope.$apply(function() {
				$scope.currentProcessInstanceId = processInstanceId;
			});
		});

		$scope.selectionClaimChanged = function(variable) {
			if (variable) {
				$scope.selectedClaimTask = variable;
			}
		}

		$scope.selectionUnclaimChanged = function(variable) {
			if (variable) {
				$scope.selectedUnclaimTask = variable;
			}
		}

		$scope.claimTask = function() {
			this.executeAction($scope.selectedClaimTask.id, { 'action': 'CLAIM' }, 'claimed', () => { $scope.selectedClaimTask = null });
		}

		$scope.unclaimTask = function() {
			this.executeAction($scope.selectedUnclaimTask.id, { 'action': 'UNCLAIM' }, 'unclaimed', () => { $scope.selectedUnclaimTask = null });
		}

		$scope.executeAction = function(taskId, requestBody, actionName, clearCallback) {
			const apiUrl = '/services/ide/bpm/bpm-processes/tasks/' + taskId;

			$http({
				method: 'POST',
				url: apiUrl,
				data: requestBody,
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((response) => {
					messageHub.showAlertSuccess("Action confirmation", "Task " + actionName + " successfully!")
					$scope.reload();
					console.log('Successfully ' + actionName + ' task with id ' + taskId);
					clearCallback()
				})
				.catch((error) => {
					messageHub.showAlertError("Action failed", "Failed to " + actionName + " task " + error.message);
					console.error('Error making POST request:', error);
				});
		}

		$scope.getNoDataMessage = function() {
			return 'No tasks found.';
		}






	}]);
