import React from "react";

import { cn } from "../../utils/cls";
import './main.scss';
const cls = cn('main');

export interface MainProps {
    items: React.ReactNode[];
    ref: React.Ref<HTMLDivElement>;
}

export const Main: React.FC<MainProps> = React.forwardRef<HTMLDivElement, MainProps>((props, ref: React.Ref<HTMLDivElement>) => {
    return (
        <div className={cls()} ref={ref}>
            {props.items.map((item, idx) => (
                <div className={cls('item')} key={idx}>{item}</div>
            ))}
        </div>
    )
});
