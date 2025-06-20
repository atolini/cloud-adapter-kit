"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const handlebars_1 = require("handlebars");
const handlebars_2 = require("../../implementations/handlebars");
class TemplateService {
    template;
    eventsLogger;
    constructor(templateString, logger) {
        this.eventsLogger = new handlebars_2.TemplateServiceEventLogger(logger);
        this.template = (0, handlebars_1.compile)(templateString);
        this.eventsLogger.templateInitialized(templateString);
    }
    compile(data = {}) {
        const result = this.template(data);
        this.eventsLogger.templateCompiled(data, result);
        return result;
    }
}
exports.TemplateService = TemplateService;
