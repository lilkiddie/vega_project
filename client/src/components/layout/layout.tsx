import React from 'react';

import { cn } from '../../utils/cls';
import './layout.scss';
const cls = cn('layout');

export interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div className={cls()}>{props.children}</div>
    )
}
