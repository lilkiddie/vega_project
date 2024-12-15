import React, { useState } from "react";

import './form.scss';
import { cn } from "../../utils/cls";
import { Button, ButtonView } from "../button/button";
import { useGetCompaniesQuery } from "../../api";
import { ShareFormField } from "../share-form-field/share-form-field";
import { PlusIcon } from "../icons/plus/plus";
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

    const onAddItem = (key: string, count: number) => {
        setSelected(prev => [...prev, { key, count }]);
    }

    const onDeleteItem = (key: string) => {
        setSelected(prev => prev.filter(item => item.key !== key));
    }

    return (
        <div className={cls({direction: Boolean(selected.length) ? 'column' : 'row'})}>
            <div className={cls('add-wrapper')}>
                {selected.map(item => (
                    <div
                        className={cls('selected-item')}
                        key={item.key}
                        onClick={() => onDeleteItem(item.key)}
                    >
                        {companies?.find(c => c.key === item.key)?.name}
                        <span>{`x${item.count}`}</span>
                    </div>
                ))}
                {selected.length ? (
                    <PlusIcon onClick={handleOpenShareField} />
                ) : (
                    <Button
                        className={cls('add')}
                        text={"Добавить"}
                        view={ButtonView.Secondary}
                        onClick={handleOpenShareField}
                    />
                )}
                <ShareFormField
                    companies={companies || []}
                    opened={openShareField}
                    handleClose={handleCloseShareField}
                    onSubmit={onAddItem}
                />
            </div>
            <Button
                className={cls('send')}
                text={"Отправить"}
                view={ButtonView.Primary}
                onClick={() => console.log(selected)}
            />
        </div>
    )
}
