import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { DEFAULT_LANG, ROUTE_SEGMENTS, isSupportedLang } from './i18n/config.js';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Perfumes from './pages/Perfumes.jsx';
import PerfumeDetails from './pages/PerfumeDetails.jsx';
import FindYourScent from './pages/FindYourScent.jsx';
import Journal from './pages/Journal.jsx';
import Article from './pages/Article.jsx';
import About from './pages/About.jsx';
import Authenticity from './pages/Authenticity.jsx';
import Note from './pages/Note.jsx';
import Cart from './pages/Cart.jsx';

function LanguageGate() {
  const { lang } = useParams();

  if (!isSupportedLang(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }

  return (
    <LanguageProvider>
      <LocalizedRoutes />
    </LanguageProvider>
  );
}

function LocalizedRoutes() {
  const { lang } = useLanguage();
  const s = ROUTE_SEGMENTS[lang];

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={s.perfumes} element={<Perfumes />} />
        <Route path={s.women} element={<Perfumes categoryKey="women" />} />
        <Route path={s.men} element={<Perfumes categoryKey="men" />} />
        <Route path={s.unisex} element={<Perfumes categoryKey="unisex" />} />
        <Route path={s.luxury} element={<Perfumes categoryKey="luxury" />} />
        <Route path={s.niche} element={<Perfumes categoryKey="niche" />} />

        <Route path={`${s.perfume}/:id`} element={<PerfumeDetails />} />
        <Route path={`${s.note}/:slug`} element={<Note />} />
        <Route path={s.find} element={<FindYourScent />} />
        <Route path={s.journal} element={<Journal />} />
        <Route path={`${s.journal}/:slug`} element={<Article />} />
        <Route path={s.about} element={<About />} />
        <Route path={s.authenticity} element={<Authenticity />} />
        <Route path={s.cart} element={<Cart />} />

        <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
          <Route path="/:lang/*" element={<LanguageGate />} />
          <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
