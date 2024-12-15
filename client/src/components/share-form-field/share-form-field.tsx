import React from "react";
import { Modal } from "../modal/modal";
import { FormField } from "../../form-field/form-field";
import { Dropdown } from "../dropdown/dropdown";
import { Company } from "../../api";

export interface ShareFormFieldProps {
    opened: boolean;
    value: string | null;
    companies: Company[];
    handleClose: () => void;
    onChangeCompany: (key: string) => void;
};

export const ShareFormField: React.FC<ShareFormFieldProps> = (props) => {
    const chosenCompany = props.companies.find(item => item.key === props.value)?.name || null;

    return (
        <Modal
            title={'Модалка'}
            description={'Очень прикольная модалка для акций'}
            opened={props.opened}
            handleClose={props.handleClose}
        >
            <FormField title={'Компания'}>
                <Dropdown
                    value={chosenCompany}
                    options={props.companies || []}
                    onChange={props.onChangeCompany}
                />
            </FormField>
        </Modal>
    )
}
