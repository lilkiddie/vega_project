import React, { useState } from "react";
import { Modal } from "../modal/modal";
import { FormField } from "../form-field/form-field";
import { Dropdown } from "../dropdown/dropdown";
import { Company } from "../../api";

import './share-form-field.scss';
import { cn } from "../../utils/cls";
import { Button, ButtonView } from "../button/button";
const cls = cn('share-form-field');

export interface ShareFormFieldProps {
    opened: boolean;
    companies: Company[];
    handleClose: () => void;
    onSubmit: (key: string, count: number) => void;
};

export const ShareFormField: React.FC<ShareFormFieldProps> = (props) => {
    const [chosenCompany, setChosenCompany] = useState<string | null>(null);
    const [shareCount, setShareCount] = useState<number>();
    const humanName = props.companies.find(item => item.key === chosenCompany)?.name || null;

    const onChangeShareCount = (count: string) => {
        if (!Boolean(count)) {
            setShareCount(undefined);
        } else if (!isNaN(+count)) {
            setShareCount(Number(count));
        }
    }

    const onSubmit = () => {
        if (chosenCompany && shareCount) {
            props.onSubmit(chosenCompany, shareCount);
            setChosenCompany(null);
            setShareCount(undefined);
            props.handleClose();
        }
    }

    return (
        <Modal
            title={'Добавить акции'}
            description={'Выберите компанию и количество акций'}
            opened={props.opened}
            handleClose={props.handleClose}
        >
            <FormField title={'Компания'}>
                <Dropdown
                    value={humanName}
                    options={props.companies || []}
                    onChange={(key) => setChosenCompany(key)}
                />
            </FormField>
            <FormField title={'Количество акций'}>
                <input
                    className={cls('input')}
                    value={shareCount}
                    placeholder={"Введите число акций"}
                    onChange={(e) => onChangeShareCount(e.target.value)}
                />
            </FormField>
            <Button
                isDisabled={!Boolean(chosenCompany) || !Boolean(shareCount)}
                onClick={onSubmit}
                className={cls('add')}
                text={"Добавить"}
                view={ButtonView.Accent}
            />
        </Modal>
    )
}
