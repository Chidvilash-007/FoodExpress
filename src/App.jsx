import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import AccountSettings from "./pages/AccountSettings";
import MyOrders from "./pages/MyOrders";
import SavedAddresses from "./pages/SavedAddresses";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";
import Location from "./pages/Location";
import BookTable from "./pages/BookTable";
import CustomerCare from "./pages/CustomerCare";
import Certificates from "./pages/Certificates";
import Newsroom from "./pages/Newsroom";
import Policy from "./pages/Policy";
import Terms from "./pages/Terms";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/account" element={<Account />} />
        <Route path="/accsettings" element={<AccountSettings />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/savedaddress" element={<SavedAddresses />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/location" element={<Location />} />
        <Route path="/book" element={<BookTable />} />
        <Route path="/care" element={<CustomerCare />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </HashRouter>
  );
}
