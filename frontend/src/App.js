import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import Chitietsanpham from "./page/chitietsanpham";
import Dangnhap from "./page/dangnhap";
import Dangky from "./page/dangky";
import Blog from "./page/blog";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/chitietsanpham" exact element={<Chitietsanpham />} />
          <Route path="/dangnhap" exact element={<Dangnhap />} />
          <Route path="/dangky" exact element={<Dangky />} />
          <Route path="/blog" exact element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
