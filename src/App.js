import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'
import './App.css';
// import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { useEffect } from 'react';
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import Orders from './components/Orders';
const promise = loadStripe('pk_test_51Kvx4tD3nFL35a2r1akPIcEF9fUbPDs54OSL7PIGfQYKUQocAyrsg9FpKcnLW7enKmzTL06QZPnshLUv8SnHErHY00DfTppBND');

function App() {
  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    // will onnly run once when the app component loads..
    // dynamic if-statment
    auth.onAuthStateChanged(authUser => {
      console.log("user  authenication ", authUser);
      if (authUser) {
        // the user just logged in /the user logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out 
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/payment" element={<Payment />} /> */}
          <Route
            path="/payment"
            element={<Elements stripe={promise}>
              <Payment />
            </Elements>} />
            <Route path="/order" element={<Orders />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
