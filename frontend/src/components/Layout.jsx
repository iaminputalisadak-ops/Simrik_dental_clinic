import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { getHomeDataPromise } from '../api/homeData';
import JsonLd from './JsonLd';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/') getHomeDataPromise();
  }, [pathname]);

  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
