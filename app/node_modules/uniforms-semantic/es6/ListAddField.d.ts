import React from 'react';
import { HTMLFieldProps } from 'uniforms';
export declare type ListAddFieldProps = HTMLFieldProps<unknown, HTMLSpanElement, {
    initialCount?: number;
}>;
declare const _default: React.FunctionComponent<import("uniforms").Override<import("uniforms").Override<React.HTMLProps<HTMLSpanElement>, import("uniforms").GuaranteedProps<unknown> & {
    initialCount?: number | undefined;
}>, import("uniforms").Override<Partial<import("uniforms").GuaranteedProps<unknown>>, {
    label?: React.ReactNode;
    name: string;
    placeholder?: string | boolean | null | undefined;
}>>> & {
    Component: React.ComponentType<import("uniforms").Override<React.HTMLProps<HTMLSpanElement>, import("uniforms").GuaranteedProps<unknown> & {
        initialCount?: number | undefined;
    }>>;
    options: {
        initialValue?: boolean | undefined;
        kind?: "leaf" | "node" | undefined;
    } | undefined;
};
export default _default;
