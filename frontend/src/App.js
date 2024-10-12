import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chitietsanpham from "./pages/index/body/chitietsanpham";
import Dangnhap from "./pages/index/SignUp/dangnhap";
import Dangky from "./pages/index/SignUp/dangky";
import Blog from "./pages/index/header/blog";
import Home from "./pages/index";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/chitietsanpham/:id" exact element={<Chitietsanpham />} />
          <Route path="/dangnhap" exact element={<Dangnhap />} />
          <Route path="/dangky" exact element={<Dangky />} />
          <Route path="/blog" exact element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
