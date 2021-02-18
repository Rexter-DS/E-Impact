import React, { ReactNode } from 'react';
export declare type ListItemFieldProps = {
    children?: ReactNode;
    value?: unknown;
};
declare const _default: React.FunctionComponent<import("uniforms").Override<ListItemFieldProps, import("uniforms").Override<Partial<import("uniforms").GuaranteedProps<unknown>>, {
    label?: unknown;
    name: string;
    placeholder?: unknown;
}>>> & {
    Component: React.ComponentType<ListItemFieldProps>;
    options: {
        initialValue?: boolean | undefined;
        kind?: "leaf" | "node" | undefined;
    } | undefined;
};
export default _default;
