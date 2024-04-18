/*
 * Generated by Eclipse Dirigible based on model and template.
 *
 * Do not modify the content as it may be re-generated again.
 */
const generateUtils = dirigibleRequire("ide-generate-service/template/generateUtils");
const parameterUtils = dirigibleRequire("ide-generate-service/template/parameterUtils");

exports.generate = function (model, parameters) {
    model = JSON.parse(model).model;
    let templateSources = exports.getTemplate(parameters).sources;
    parameterUtils.process(model, parameters)
    return generateUtils.generateFiles(model, parameters, templateSources);
};

exports.getTemplate = function (parameters) {
    return {
        name: "Application - DAO",
        description: "Application with DAO",
        extension: "model",
        sources: [{
            location: "/template-application-dao/dao/entity.ts.template",
            action: "generate",
            rename: "gen/dao/{{perspectiveName}}/{{name}}Repository.ts",
            engine: "velocity",
            collection: "daoModels"
        }, {
            location: "/template-application-dao/dao/entity.extensionpoint.template",
            action: "generate",
            rename: "gen/dao/{{perspectiveName}}/{{name}}.extensionpoint",
            engine: "velocity",
            collection: "daoModels"
        }, {
            location: "/template-application-dao/dao/reportEntity.ts.template",
            action: "generate",
            rename: "gen/dao/{{perspectiveName}}/{{name}}Repository.ts",
            engine: "velocity",
            collection: "reportModels"
        }, {
            location: "/template-application-dao/project.json.mjs",
            action: "generate",
            rename: "project.json",
            engine: "javascript",
        }, {
            location: "/template-application-dao/tsconfig.json.template",
            action: "generate",
            rename: "tsconfig.json",
            engine: "velocity"
        }, {
            location: "/template-application-dao/dao/utils/EntityUtils.ts.template",
            action: "copy",
            rename: "gen/dao/utils/EntityUtils.ts"
        }],
        parameters: [{
            name: "tablePrefix",
            label: "Table Prefix",
            placeholder: "Table prefix",
            required: false
        }, {
            name: "dataSource",
            label: "Data Source",
            placeholder: "Data Source (DefaultDB)",
            required: false
        }]
    };
};