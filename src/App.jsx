import './App.scss'
import { Routes, Route } from 'react-router-dom'
import LazyLoad from './LazyLoad'
import Navbar from '@components/Navbars/Navbar'
import Footer from '@components/Footer/Footer'
import Home from './pages/Homes/Home'
function App() {
  return (
    <div className="App">
      {/* Header Navbar */}
      <div className='navbar_container'>
        <div className='navbar_contents'>
          <Navbar />
        </div>
      </div>
      <div className='app_container'>
        {/* Content Router */}
        <Routes>
          <Route path="/" element={LazyLoad(() => import("@pages/Homes/Home"))()} />
          <Route path="/register" element={LazyLoad(() => import("@pages/Registers/Register"))()} />
          <Route path="login" element={LazyLoad(() => import("@pages/Logins/Login"))()} />
          <Route path="plant/:type" element={LazyLoad(() => import("@pages/Plant/Plant"))()} />
          <Route path="cart" element={LazyLoad(() => import("@pages/Carts/Cart"))()} />
          <Route path="payment" element={LazyLoad(() => import("@pages/Payment/Payment"))()} />
          <Route path="detailItem/:id" element={LazyLoad(() => import("@pages/DetailItems/DetailItem"))()} />
        </Routes>
      </div>
      {/* Content Footer */}
      <div className='footers'>
        <div className='navbar_contents'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
