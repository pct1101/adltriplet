import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail_product from "./pages/index/products/detail_product.jsx";
import Login from "./pages/index/SignUp/login.jsx";
import SignUp from "./pages/index/SignUp/sign_up.jsx";
import Blog from "./pages/index/component/about_us.jsx";
import Home from "./pages/index";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/ControllerProduct/products.jsx";
import AddCar from "./pages/admin/ControllerProduct/AddCar.jsx";
import User from "./pages/index/user/user.jsx";
import EditCar from "./pages/admin/ControllerProduct/EditCar.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          //Home
          <Route path="/" exact element={<Home />} />
          <Route path="/detai_product/:id" exact element={<Detail_product />} />
          <Route path="/about_us" exact element={<Blog />} />
          // login|signup
          <Route path="/Login" exact element={<Login />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          // admin
          <Route path="/admin" exact element={<AdminDashboard />} />
          <Route path="/admin/products" exact element={<AdminProducts />} />
          <Route path="/admin/AddCar" exact element={<AddCar />} />
          <Route path="/admin/EditCar/:id" exact element={<EditCar />} />
          // user
          <Route path="/user" exact element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
