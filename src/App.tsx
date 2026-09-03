import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { Layout, ScrollToTop } from "./components/layout";
import { Crest, IcArrow } from "./components/icons";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import NewsEvents from "./pages/NewsEvents";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Portal from "./pages/Portal";

function NotFound() {
  return (
    <section className="blueprint relative overflow-hidden bg-navy-950 text-chalk-50">
      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-5 py-24 sm:px-8 lg:py-32">
        <Crest className="h-16 w-auto" />
        <p className="font-display mt-8 text-[6rem] leading-none font-bold text-navy-800 sm:text-[10rem]">404</p>
        <h1 className="font-display -mt-4 text-4xl font-semibold sm:text-6xl">
          This corridor <em className="italic text-gold-300">doesn't exist.</em>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-navy-200">
          Even after 114 years, the caretaker hasn't found a door where you're pointing. Let's get you back to somewhere real.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link to="/" className="btn btn-gold">Back to the quad <IcArrow className="h-4 w-4" /></Link>
          <Link to="/contact" className="btn btn-ghost-light">Ask for directions</Link>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
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
