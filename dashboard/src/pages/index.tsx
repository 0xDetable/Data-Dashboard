import Dashboard from '@/pages/dashboard';
import scss from '../components/Layout/Layout.module.scss';
import React from 'react';

export default function Home() {
    return (
      <main className={scss.main}>
      <Dashboard />
      </main>

    )
}