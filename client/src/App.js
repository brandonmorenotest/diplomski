import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import {
  BlogDetail,
  CategoryPage,
  Home,
  WriterPage,
} from "./pages";
import { Footer, Loading, Navbar } from "./components";
import useStore from "./store";
import Contact from "./pages/Contacts";
import About from "./pages/About";
import PrivacyPolicy from "./components/Privacy";
import TermsOfUse from "./components/TermsOfService";

function Layout() {
  return (
    <div className='w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-28'>
      <Navbar />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const { theme, isLoading } = useStore();
  const location = useLocation();

  return (
    <main className={theme}>
      <div className={`w-full min-h-sreen relative dark:bg-[#020b19] bg-white`}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path="/contacts" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
            <Route path='/category' element={<CategoryPage />} />
            <Route path='/:slug/:id?' element={<BlogDetail />} />
            <Route path='/writer/:id' element={<WriterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
            <Route path="/terms-of-service" element={<TermsOfUse/>} />
          </Route>
        </Routes>
        {isLoading && <Loading />}
      </div>
    </main>
  );
}

export default App;
