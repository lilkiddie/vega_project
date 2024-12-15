import React from "react";

import './form.scss';
import { cn } from "../../utils/cls";
import { Button, ButtonView } from "../button/button";
const cls = cn('form');

export interface FormProps {};

export const Form: React.FC<FormProps> = (props) => {
    return (
        <div className={cls()}>
            <Button
                text={"Добавить"}
                view={ButtonView.Secondary}
                onClick={() => console.log('add')}
            />
            <Button
                text={"Отправить"}
                view={ButtonView.Primary}
                onClick={() => console.log('send')}
            />
        </div>
    )
}
