import React from "react";

import { cn } from "../../utils/cls";
import './main.scss';
const cls = cn('main');

export interface MainProps {
    items: React.ReactNode[];
}

export const Main: React.FC<MainProps> = (props) => {
    return (
        <div className={cls()}>
            {props.items.map(item => (
                <div className={cls('item')}>{item}</div>
            ))}
        </div>
    )
}
