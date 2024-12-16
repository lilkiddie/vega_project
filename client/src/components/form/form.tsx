import React, { useState } from "react";
import { Button, ButtonView } from "../button/button";
import { ShareData, useGetCompaniesQuery } from "../../api";
import { ShareFormField } from "../share-form-field/share-form-field";
import { PlusIcon } from "../icons/plus/plus";

import './form.scss';
import { cn } from "../../utils/cls";
const cls = cn('form');

export interface FormProps {
    onSubmit: (selected: ShareData[]) => void;
};

export const Form: React.FC<FormProps> = (props) => {
    const {
        isLoading,
        data: companies,
    } = useGetCompaniesQuery();

    const [selected, setSelected] = useState<ShareData[]>([]);
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
                        <span className={cls('selected-item__count')}>
                            <span>{'x'}</span>
                            {item.count}
                        </span>
                    </div>
                ))}
                {selected.length ? (
                    <PlusIcon onClick={handleOpenShareField} />
                ) : (
                    <Button
                        isDisabled={isLoading}
                        className={cls('add')}
                        text={"Добавить акции"}
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
            {selected.length > 0 && (
                <Button
                    isDisabled={selected.length === 0}
                    className={cls('send')}
                    text={"Рассчитать"}
                    view={ButtonView.Accent}
                    onClick={() => props.onSubmit(selected)}
                />
            )}
        </div>
    )
}
