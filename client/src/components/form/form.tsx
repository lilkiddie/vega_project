import React, { useState } from "react";

import './form.scss';
import { cn } from "../../utils/cls";
import { Button, ButtonView } from "../button/button";
import { useGetCompaniesQuery } from "../../api";
import { ShareFormField } from "../share-form-field/share-form-field";
const cls = cn('form');

export interface FormProps {};

type SelectedProps = {
    key: string;
    count: number;
}[];

export const Form: React.FC<FormProps> = (props) => {
    const {
        isLoading,
        data: companies,
    } = useGetCompaniesQuery();

    const [selected, setSelected] = useState<SelectedProps>([]);

    const [openShareField, setOpenShareFieldl] = useState(false);
    const handleOpenShareField = () => setOpenShareFieldl(true);
    const handleCloseShareField = () => setOpenShareFieldl(false);

    const onAdd = (key: string, count: number) => {
        setSelected(prev => [...prev, { key, count }]);
    }

    return (
        <div className={cls()}>
            <Button
                text={"Добавить"}
                view={ButtonView.Secondary}
                onClick={handleOpenShareField}
            />
            <ShareFormField
                companies={companies || []}
                opened={openShareField}
                handleClose={handleCloseShareField}
                onSubmit={onAdd}
            />
            <Button
                text={"Отправить"}
                view={ButtonView.Primary}
                onClick={() => console.log('send')}
            />
        </div>
    )
}
