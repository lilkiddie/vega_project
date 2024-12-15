import React from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
    TooltipProps,
} from 'recharts';

import './chart.scss';
import { cn } from "../../utils/cls";
const cls = cn('chart');

interface ChartPoint {
    date: string;
    price: number;
}

export interface ChartProps {
    width: number;
    data?: ChartPoint[];
};

const CustomTooltip = ({ label, payload }: TooltipProps<number, string>) => {
    if (label && payload && payload.length > 0) {
        return (
            <div className={cls('tooltip')}>
                <div>{`Дата: ${label}`}</div>
                <div>{`Стоимость: ${payload[0].value}`}</div>
            </div>
        )
    }

    return null;
};

export const Chart: React.FC<ChartProps> = (props) => {
    if (!props.data) {
        return (
            <div className={cls('empty')}>{"Отправьте какие-нибудь данные, чтобы увидеть график"}</div>
        )
    }

    return (
        <div className={cls()}>
            <LineChart
                width={props.width}
                height={500}
                data={props.data}
                margin={{
                    left: 0,
                    right: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" stroke="var(--color-primary)" name="Цена акций" />
            </LineChart>
        </div>
    )
}
