import React from 'react';
import { HTMLFieldProps } from 'uniforms';
export declare type RadioFieldProps = HTMLFieldProps<string, HTMLDivElement, {
    allowedValues?: string[];
    checkboxes?: boolean;
    transform?(value: string): string;
}>;
declare const _default: React.FunctionComponent<import("uniforms").Override<import("uniforms").Override<React.HTMLProps<HTMLDivElement>, import("uniforms").GuaranteedProps<string> & {
    allowedValues?: string[] | undefined;
    checkboxes?: boolean | undefined;
    transform?(value: string): string;
}>, import("uniforms").Override<Partial<import("uniforms").GuaranteedProps<string | undefined>>, {
    label?: React.ReactNode;
    name: string;
    placeholder?: string | boolean | null | undefined;
}>>> & {
    Component: React.ComponentType<import("uniforms").Override<React.HTMLProps<HTMLDivElement>, import("uniforms").GuaranteedProps<string> & {
        allowedValues?: string[] | undefined;
        checkboxes?: boolean | undefined;
        transform?(value: string): string;
    }>>;
    options: {
        initialValue?: boolean | undefined;
        kind?: "leaf" | "node" | undefined;
    } | undefined;
};
export default _default;
