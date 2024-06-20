/*
 * Generated by Eclipse Dirigible based on model and template.
 *
 * Do not modify the content as it may be re-generated again.
 */
exports.getSources = function (parameters) {
	var sources = [];
	sources = sources.concat(getMaster(parameters));
	sources = sources.concat(getDetails(parameters));
	return sources;
};

function getMaster(parameters) {
	return [
		// Location: "gen/{{genFolderName}}/ui/perspective"
		{
			location: "/template-application-ui-angular/ui/perspective/index.html",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/index.html",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/perspective.extension",
			action: "generate",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/perspective.extension",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/perspective-portal.extension",
			action: "generate",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/perspective-portal.extension",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/perspective.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/perspective.js",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/controller.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/controller.js",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/index.html.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/index.html",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/tile.extension",
			action: "generate",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/tile.extension",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/tile-portal.extension",
			action: "generate",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/tile-portal.extension",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/tile.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/tile.js",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/view.extension",
			action: "generate",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/view.extension",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/view.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/view.js",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/main-details/controller.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/main-details/controller.js",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/main-details/index.html.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/main-details/index.html",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/main-details/view.extension",
			action: "generate",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/main-details/view.extension",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/main-details/view.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/main-details/view.js",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/dialog-filter/controller.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/dialog-filter/controller.js",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/dialog-filter/index.html.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/dialog-filter/index.html",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/dialog-filter/view.extension",
			action: "generate",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/dialog-filter/view.extension",
			collection: "uiManageMasterModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/dialog-filter/view.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{name}}/dialog-filter/view.js",
			collection: "uiManageMasterModels"
		}
	];
}

function getDetails(parameters) {
	return [
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/controller.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/controller.js",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/index.html.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/index.html",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/view.extension.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/view.extension",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/view.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/view.js",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/dialog-window/controller.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/dialog-window/controller.js",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/dialog-window/index.html.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/dialog-window/index.html",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/dialog-window/view.extension.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/dialog-window/view.extension",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/dialog-window/view.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/dialog-window/view.js",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/dialog-filter/controller.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/dialog-filter/controller.js",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/dialog-filter/index.html.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/dialog-filter/index.html",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/dialog-filter/view.extension",
			action: "generate",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/dialog-filter/view.extension",
			collection: "uiManageDetailsModels"
		},
		{
			location: "/template-application-ui-angular/ui/perspective/master-manage/detail/dialog-filter/view.js.template",
			action: "generate",
			engine: "velocity",
			rename: "gen/{{genFolderName}}/ui/{{perspectiveName}}/{{masterEntity}}/{{name}}/dialog-filter/view.js",
			collection: "uiManageDetailsModels"
		}
	];
}
