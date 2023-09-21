import Head from 'next/head'
import Dashboard from '@/pages/dashboard';
import Header from '@/pages/components/Header';
import SideMenu from '@/pages/components/SideMenu';
import scss from './Home.module.scss';
import React from 'react';

export default function Home() {
    return (
        <>
            <Head>
                <title>Data Dashboard</title>
                <meta name="description" content="Data Dashboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={scss.main}>
                <Dashboard />
                <SideMenu/>
            </main>
        </>
    )
}