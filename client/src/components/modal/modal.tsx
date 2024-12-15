import React from "react";
import { Modal as BaseModal, Fade } from "@mui/material";

import './modal.scss';
import { cn } from "../../utils/cls";
const cls = cn('modal');

export interface ModalProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    opened?: Boolean;
    children: React.ReactNode;
    handleClose: () => void;
};

export const Modal: React.FC<ModalProps> = (props) => {
    const opened = Boolean(props.opened);

    return (
        <BaseModal
            open={opened}
            onClose={props.handleClose}
        >
            <Fade in={opened}>
                <div className={cls()}>
                    <div className={cls('title')}>{props.title}</div>
                    <div className={cls('description')}>{props.description}</div>
                    <div className={cls('content')}>{props.children}</div>
                </div>
            </Fade>
        </BaseModal>
    )
}
