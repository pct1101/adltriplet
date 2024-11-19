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
import User_favorite from "./pages/index/user/user_favorite.jsx";
import User_change_password from "./pages/index/user/user_change_password.jsx";
import PrivateRoute from "./pages/Private/private_component.jsx";
import { AuthProvider } from "./pages/Private/Auth.jsx";
import AdminBooking from "./pages/admin/Booking/Adminbooking.jsx";
import AdminAddBooking from "./pages/admin/Booking/AddBooking.jsx";
import EditBooking from "./pages/admin/Booking/EditBooking.jsx";
import AdminFeedbacks from "./pages/admin/Feedbacks/Feedbacks.jsx";
import AdminAddFeedback from "./pages/admin/Feedbacks/AddFeedbacks.jsx";
import EditFeedback from "./pages/admin/Feedbacks/EditFeedbacks.jsx";
import UserList from "./pages/admin/User/ManagerUser.jsx";
import EditUser from "./pages/admin/User/EditUser.jsx";
import AdminAddUser from "./pages/admin/User/AddUser.jsx";
import AdminFavorite from "./pages/admin/Favorite/AdminFavorite.jsx";
import AdminFavoriteDetails from "./pages/admin/Favorite/DetailFavorite.jsx";
import AddFavorite from "./pages/admin/Favorite/AddFavorite.jsx";
import Payment_booking from "./pages/index/booking/payment_booking.jsx";
import { BookingProvider } from "./pages/Private/bookingContext.jsx";
import UserDetail from "./pages/admin/User/DetailUserAdmin.jsx";
import My_car from "./pages/index/user/my_car.jsx";
import AdminBookingDetails from "./pages/admin/Booking/DetailBooking.jsx";

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        {" "}
        <div>
          <Router>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />
              <Route path="/detai_product/:id" element={<Detail_product />} />
              <Route path="/about_us" element={<Blog />} />

              {/* Login | Signup */}
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />

              {/* Admin */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              {/* edit, add, delete car */}
              <Route
                path="/admin/products"
                element={
                  <PrivateRoute>
                    <AdminProducts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/AddCar"
                element={
                  <PrivateRoute>
                    <AddCar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/EditCar/:id"
                element={
                  <PrivateRoute>
                    <EditCar />
                  </PrivateRoute>
                }
              />

              {/* edit, add, delete booking */}
              <Route
                path="/admin/booking"
                element={
                  <PrivateRoute>
                    <AdminBooking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/addbooking"
                element={
                  <PrivateRoute>
                    <AdminAddBooking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/editbooking/:id"
                element={
                  <PrivateRoute>
                    <EditBooking />
                  </PrivateRoute>
                }
              />

              {/* edit, add, delete feedback */}
              <Route
                path="/admin/booking"
                element={
                  <PrivateRoute>
                    <AdminBooking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/addbooking"
                element={
                  <PrivateRoute>
                    <AdminAddBooking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/editbooking/:id"
                element={
                  <PrivateRoute>
                    <EditBooking />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/detailbooking/:bookingId"
                element={
                  <PrivateRoute>
                    <AdminBookingDetails />
                  </PrivateRoute>
                }
              />
              {/* edit, add, delete feedbacks */}
              <Route
                path="/admin/feedbacks"
                element={
                  <PrivateRoute>
                    <AdminFeedbacks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/add_feedback"
                element={
                  <PrivateRoute>
                    <AdminAddFeedback />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/edit_feedback/:id"
                element={
                  <PrivateRoute>
                    <EditFeedback />
                  </PrivateRoute>
                }
              />
              {/* edit, add, delete user */}
              <Route
                path="/admin/user"
                element={
                  <PrivateRoute>
                    <UserList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/add_user"
                element={
                  <PrivateRoute>
                    <AdminAddUser />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/edit_user/:id"
                element={
                  <PrivateRoute>
                    <EditUser />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/user/:id"
                element={
                  <PrivateRoute>
                    <UserDetail />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/favorite"
                element={
                  <PrivateRoute>
                    <AdminFavorite />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/favorite/:userId/:carId"
                element={
                  <PrivateRoute>
                    <AdminFavoriteDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/addfavorite"
                element={
                  <PrivateRoute>
                    <AddFavorite />
                  </PrivateRoute>
                }
              />

              {/* User */}
              <Route path="/user" element={<User />} />
              <Route path="/user_favorite" element={<User_favorite />} />
              <Route
                path="/user_repassword"
                element={<User_change_password />}
              />
              <Route path="/user_car" element={<My_car />} />

              {/* Payment */}
              <Route path="/payment_car" element={<Payment_booking />} />
            </Routes>
          </Router>
        </div>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
