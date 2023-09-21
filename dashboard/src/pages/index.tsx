import Dashboard from '@/pages/dashboard';
import Header from '@/pages/components/Header';
import SideMenu from '@/pages/components/SideMenu';
import scss from './Home.module.scss';
import React from 'react';

export default function Home() {
    return (
      <main className={scss.main}>
      <Dashboard />
      </main>

    )
}