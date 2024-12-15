import React from "react"

import './plus.scss';
import { cn } from "../../../utils/cls";
const cls = cn('plus-icon');

export interface PlusIconProps {
    onClick: () => void;
}

export const PlusIcon: React.FC<PlusIconProps> = (props) => {
    return (
        <svg
            className={cls()}
            viewBox="0 0 24 24"
            onClick={props.onClick}
        >
            <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M16,13.25h-2.75V16c0,0.69-0.56,1.25-1.25,1.25 s-1.25-0.56-1.25-1.25v-2.75H8c-0.69,0-1.25-0.56-1.25-1.25S7.31,10.75,8,10.75h2.75V8c0-0.69,0.56-1.25,1.25-1.25 S13.25,7.31,13.25,8v2.75H16c0.69,0,1.25,0.56,1.25,1.25S16.69,13.25,16,13.25z"></path>
        </svg>
    )
}