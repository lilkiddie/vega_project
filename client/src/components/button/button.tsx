import React from "react";

import './button.scss';
import { cn } from "../../utils/cls";
const cls = cn('button');

export enum ButtonView {
    Primary = 'primary',
    Secondary = 'secondary',
    Accent = 'accent',
}

export interface ButtonProps {
    className?: string;
    isDisabled?: boolean;
    text?: string;
    view: ButtonView;
    onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button
            className={cls({view: props.view, disabled: props.isDisabled}, props.className)}
            onClick={props.isDisabled ? undefined : props.onClick}
        >
            {props.text}
        </button>
    )
}
