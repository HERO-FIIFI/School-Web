import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import NewsEvents from "./pages/NewsEvents";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Portal from "./pages/Portal";
import { IcLogo, IcArrow } from "./components/icons";

function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-32 text-center">
      <IcLogo className="w-16 h-16 mx-auto" />
      <h1 className="mt-8 font-display font-extrabold text-5xl text-pine-950 tracking-tight">
        Detention. <span className="text-gold-500">404.</span>
      </h1>
      <p className="mt-4 text-ink-soft">
        This page skipped class. The rest of the school is exactly where you left it.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-pine-900 text-chalk-50 font-bold px-7 py-3.5 hover:bg-pine-800 transition-colors"
      >
        Back to the quad <IcArrow className="w-4 h-4" />
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/news" element={<NewsEvents />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
