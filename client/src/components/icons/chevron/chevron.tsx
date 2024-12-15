import React from "react";

import './chevron.scss';
import { cn } from "../../../utils/cls";
const cls = cn('chevron');

export const ChevronRightIcon = () => {
    return (
        <svg className={cls()} viewBox="0 0 46 86">
            <path d="M1.003,80.094c-1.338,1.352-1.338,3.541,0,4.893c1.337,1.35,3.506,1.352,4.845,0l39.149-39.539  c1.338-1.352,1.338-3.543,0-4.895L5.848,1.014c-1.339-1.352-3.506-1.352-4.845,0c-1.338,1.352-1.338,3.541-0.001,4.893L36.706,43  L1.003,80.094z"/>
        </svg>
    )
}
