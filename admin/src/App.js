import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import { Footer, Navbar, Sidebar, UpdateProfile } from "./components";
import {
  Analytics,
  Contents,
  CreateCategory,
  Dashboard,
  OTPVerification,
  StartPage,
  WritePost,
} from "./pages";
import useStore from "./store/store";
import Settings from "./pages/Settings";

function Layout() {
  const { user } = useStore((state) => state);

  const location = useLocation();

  return user?.token ? (
    <div className='w-full h-screen'>
      <Navbar />
      <div className='w-full h-full flex border-t pt-16 '>
        <div className='hidden lg:flex '>
          <Sidebar />
        </div>

        <div className='w-full flex-1 px-4 md:px-8 py-6 overflow-y-auto'>
          <Outlet />

          <Footer />
        </div>
      </div>

      <UpdateProfile key={new Date()} />
    </div>
  ) : (
    <Navigate to='/auth' state={{ from: location }} replace />
  );
}

function App() {
  return (
    <main className='w-full min-h-screen'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/contents' element={<Contents />} />
          <Route path='/write/:postId?' element={<WritePost />} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/create" element={<CreateCategory/>}/>
        </Route>

        <Route path='/auth' element={<StartPage />} />
      </Routes>
    </main>
  );
}

export default App;
