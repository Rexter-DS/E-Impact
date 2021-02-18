import invariant from 'invariant';
import { createElement } from 'react';
import { useField } from 'uniforms';
import BoolField from './BoolField';
import DateField from './DateField';
import ListField from './ListField';
import NestField from './NestField';
import NumField from './NumField';
import RadioField from './RadioField';
import SelectField from './SelectField';
import TextField from './TextField';
export default function AutoField(originalProps) {
    var _a;
    const props = useField(originalProps.name, originalProps)[0];
    const { allowedValues, checkboxes, fieldType } = props;
    let { component } = props;
    if (component === undefined) {
        if (allowedValues) {
            if (checkboxes && fieldType !== Array) {
                component = RadioField;
            }
            else {
                component = SelectField;
            }
        }
        else {
            switch (fieldType) {
                case Array:
                    component = ListField;
                    break;
                case Boolean:
                    component = BoolField;
                    break;
                case Date:
                    component = DateField;
                    break;
                case Number:
                    component = NumField;
                    break;
                case Object:
                    component = NestField;
                    break;
                case String:
                    component = TextField;
                    break;
            }
            invariant(component, 'Unsupported field type: %s', fieldType);
        }
    }
    return 'options' in component && ((_a = component.options) === null || _a === void 0 ? void 0 : _a.kind) === 'leaf'
        ? createElement(component.Component, props)
        : createElement(component, originalProps);
}
