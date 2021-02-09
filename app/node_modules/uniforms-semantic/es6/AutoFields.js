import { __rest } from "tslib";
import { createElement } from 'react';
import { useForm } from 'uniforms';
import AutoField from './AutoField';
export default function AutoFields(_a) {
    var { autoField = AutoField, element = 'div', fields, omitFields = [] } = _a, props = __rest(_a, ["autoField", "element", "fields", "omitFields"]);
    const { schema } = useForm();
    return createElement(element, props, (fields !== null && fields !== void 0 ? fields : schema.getSubfields())
        .filter(field => !omitFields.includes(field))
        .map(field => createElement(autoField, { key: field, name: field })));
}
