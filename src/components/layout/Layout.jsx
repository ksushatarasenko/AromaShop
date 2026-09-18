import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CartToast from '../cart/CartToast.jsx';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
      <CartToast />
    </>
  );
}
