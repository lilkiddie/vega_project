import React from 'react';
import { cn } from '../utils/cls';

import { Layout } from '../components/layout/layout';
import { ThemeIcon } from '../components/icons/theme/theme';
import { Main } from '../components/main/main';
import { Form } from '../components/form/form';

import './App.scss';

const cls = cn('app');

function App() {
    return (
        <div className={cls()}>
            <Layout>
                <header className={cls('header')}>
                    <a href="." className={cls('header-link')}>Sosal Inc.</a>
                    <ThemeIcon />
                </header>
                <Main
                    items={[
                        <Form />,
                        <div style={{height: '500px'}}>Какой-то график</div>,
                    ]}
                />
            </Layout>
        </div>
    );
}

export default App;
