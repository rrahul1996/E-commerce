import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Header from './components/Header';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Filter from './components/Filter';
import ProductDetailpage from './components/ProductDetailpage';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { useSelector } from 'react-redux';
import Shipping from './components/Shipping';
import PlaceOrder from './components/PlaceOrder';
import Orderhistory from './components/Orderhistory';

function App() {
  const users = useSelector((state) => state.user);
  const { userLoggedIn } = users;
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={userLoggedIn ?<Home/>: <Signin/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/cart" element={userLoggedIn ? <Cart/> : <Signin/>}/>
          <Route path="/filter" element={userLoggedIn ? <Filter/> : <Signin/>}/>
          <Route path="/productdetail/:id" element={userLoggedIn ? <ProductDetailpage/> : <Signin/>}/>
          <Route path="/shipping" element={userLoggedIn ? <Shipping/> : <Signin/>}/>
          <Route path="/placeorder" element={userLoggedIn ? <PlaceOrder/> : <Signin/>}/>
          <Route path="/orderhistory" element={userLoggedIn ? <Orderhistory/> : <Signin/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
