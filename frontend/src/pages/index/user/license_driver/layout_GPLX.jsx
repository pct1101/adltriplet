import React from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Side_bar from "../side_bar";
import My_gplx from "./my_gplx";
import Gplx from "./gplx";

function Layout_GPLX() {
  return (
    <div>
      <Header></Header>
      <div className="container user">
        <div className="background-login-signup"></div>
        <div className="group-user">
          <div className="right-user">
            <Side_bar></Side_bar>
          </div>
          <div className="left-user">
            <Gplx></Gplx>
            <My_gplx></My_gplx>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Layout_GPLX;
