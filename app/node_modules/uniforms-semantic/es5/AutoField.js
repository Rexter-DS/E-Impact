"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var invariant_1 = tslib_1.__importDefault(require("invariant"));
var react_1 = require("react");
var uniforms_1 = require("uniforms");
var BoolField_1 = tslib_1.__importDefault(require("./BoolField"));
var DateField_1 = tslib_1.__importDefault(require("./DateField"));
var ListField_1 = tslib_1.__importDefault(require("./ListField"));
var NestField_1 = tslib_1.__importDefault(require("./NestField"));
var NumField_1 = tslib_1.__importDefault(require("./NumField"));
var RadioField_1 = tslib_1.__importDefault(require("./RadioField"));
var SelectField_1 = tslib_1.__importDefault(require("./SelectField"));
var TextField_1 = tslib_1.__importDefault(require("./TextField"));
function AutoField(originalProps) {
    var _a;
    var props = uniforms_1.useField(originalProps.name, originalProps)[0];
    var allowedValues = props.allowedValues, checkboxes = props.checkboxes, fieldType = props.fieldType;
    var component = props.component;
    if (component === undefined) {
        if (allowedValues) {
            if (checkboxes && fieldType !== Array) {
                component = RadioField_1.default;
            }
            else {
                component = SelectField_1.default;
            }
        }
        else {
            switch (fieldType) {
                case Array:
                    component = ListField_1.default;
                    break;
                case Boolean:
                    component = BoolField_1.default;
                    break;
                case Date:
                    component = DateField_1.default;
                    break;
                case Number:
                    component = NumField_1.default;
                    break;
                case Object:
                    component = NestField_1.default;
                    break;
                case String:
                    component = TextField_1.default;
                    break;
            }
            invariant_1.default(component, 'Unsupported field type: %s', fieldType);
        }
    }
    return 'options' in component && ((_a = component.options) === null || _a === void 0 ? void 0 : _a.kind) === 'leaf'
        ? react_1.createElement(component.Component, props)
        : react_1.createElement(component, originalProps);
}
exports.default = AutoField;
