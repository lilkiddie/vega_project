import React from "react";

import './form-field.scss';
import { cn } from "../utils/cls";
const cls = cn('form-field');

export interface FormFieldProps {
    title?: string;
    children: React.ReactNode;
};

export const FormField: React.FC<FormFieldProps> = (props) => {
    return (
        <div className={cls()}>
            <span className={cls('title')}>{props.title}</span>
            <div className={cls('content')}>{props.children}</div>
        </div>
    )
}
