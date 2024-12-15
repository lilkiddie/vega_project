import React, { useState } from "react";

import './dropdown.scss';
import { cn } from "../../utils/cls";
import useVisible from "../../hooks/use-visible";
import { ChevronRightIcon } from "../icons/chevron/chevron";
const cls = cn('dropdown');

interface DropdownItem {
    key: string;
    name: string;
}

export interface DropdownProps {
    value: string | null;
    options: DropdownItem[];
    onChange: (key: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = (props) => {
    const { ref, visible, setVisible } = useVisible(false);
    const onItemChange = (key: string) => {
        props.onChange(key);
        setVisible(false);
    };

    return (
        <div className={cls()}>
            <div
                onClick={() => setVisible(true)}
                className={cls('value', { placeholder: !Boolean(props.value) })}
            >
                {props.value || 'Выберите компанию'}
                <ChevronRightIcon />
            </div>
            {visible && (
                <div ref={ref} className={cls('content')}>
                    {props.options.map(item => (
                        <div
                            key={item.key}
                            className={cls('item')}
                            onClick={() => onItemChange(item.key)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
