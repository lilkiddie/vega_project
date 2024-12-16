import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cls';

import { Layout } from '../components/layout/layout';
import { ThemeIcon } from '../components/icons/theme/theme';
import { Main } from '../components/main/main';
import { Form } from '../components/form/form';
import { Chart } from '../components/chart/chart';

import './App.scss';
import { ShareData, useGetChartInfoMutation } from '../api';

const cls = cn('app');

function App() {
    const mainRef = useRef<HTMLDivElement>(null);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);
    const [chartWidth, setCharWidth] = useState(0);
    const [chartData, setChartData] = useState<Record<string, number> | undefined>(undefined);
    const [getChartData] = useGetChartInfoMutation();

    const updateCharWidth = () => setCharWidth((mainRef.current?.offsetWidth || 500) - 80);
    useEffect(() => {
        if (!interval.current) {
            interval.current = setInterval(() => {
                if (mainRef.current) {
                    updateCharWidth();
                    window.addEventListener("resize", updateCharWidth);
                    console.log('qwer')
                    if (interval.current) {
                        clearInterval(interval.current);
                    }
                }
            }, 300);
        }
    }, [])

    const onSubmit = async (selected: ShareData[]) => {
        const result = await getChartData(selected);
        if (result.data) {
            setChartData(result.data);
        }
    }

    return (
        <div className={cls()}>
            <Layout>
                <header className={cls('header')}>
                    <a
                        target='_blank'
                        href='https://github.com/lilkiddie/vega_project'
                        className={cls('header-link')}
                    >
                        {'Github Link'}
                    </a>
                    <ThemeIcon />
                </header>
                <Main
                    ref={mainRef}
                    items={[
                        <Form onSubmit={onSubmit}/>,
                        <Chart
                            width={chartWidth}
                            data={chartData}
                        />,
                    ]}
                />
            </Layout>
        </div>
    );
}

export default App;
