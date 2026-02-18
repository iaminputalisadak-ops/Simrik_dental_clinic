import { Outlet } from 'react-router-dom';
import JsonLd from './JsonLd';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
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
