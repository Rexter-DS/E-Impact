import { ComponentType } from 'react';
export declare type AutoFieldsProps = {
    autoField?: ComponentType<{
        name: string;
    }>;
    element?: ComponentType | string;
    fields?: string[];
    omitFields?: string[];
};
export default function AutoFields({ autoField, element, fields, omitFields, ...props }: AutoFieldsProps): import("react").ReactElement<{}, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
