import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cls';

import { Layout } from '../components/layout/layout';
import { ThemeIcon } from '../components/icons/theme/theme';
import { Main } from '../components/main/main';
import { Form } from '../components/form/form';
import { Chart } from '../components/chart/chart';

import './App.scss';

const cls = cn('app');

const data = [
    {
        date: '15.12.2024',
        price: 4000,
    },
    {
        date: '16.12.2024',
        price: 3000,
    },
    {
        date: '17.12.2024',
        price: 9800,
    },
    {
        date: '18.12.2024',
        price: 3908,
    },
    {
        date: '19.12.2024',
        price: 4800,
    },
    {
        date: '20.12.2024',
        price: 3800,
    },
    {
        date: '21.12.2024',
        price: 3900,
    },
];

function App() {
    const mainRef = useRef<HTMLDivElement>(null);
    const [chartWidth, setCharWidth] = useState(0);

    const updateCharWidth = () => setCharWidth((mainRef.current?.offsetWidth || 500) - 80);

    useEffect(() => {
        window.addEventListener("resize", updateCharWidth);
    }, []);

    useEffect(() => {
        if (mainRef.current) {
            updateCharWidth();
        }
    }, [mainRef])

    return (
        <div className={cls()}>
            <Layout>
                <header className={cls('header')}>
                    <a
                        target='_blank'
                        href='https://github.com/lilkiddie/vega_project'
                        className={cls('header-link')}
                    >
                        {'Sosal Inc.'}
                    </a>
                    <ThemeIcon />
                </header>
                <Main
                    ref={mainRef}
                    items={[
                        <Form />,
                        <Chart
                            width={chartWidth}
                            data={data}
                        />,
                    ]}
                />
            </Layout>
        </div>
    );
}

export default App;
