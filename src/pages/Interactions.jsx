import React from "react";
import Header from "../components/Header.jsx";
import Breadcrumb from "../components/Breadcrumb";
import Product from "../components/Product";
import Spec from "../components/Spec";
const Interactions = () => {
  return (
    <React.Fragment>
      <Header />
      <Breadcrumb />
      <Product />
      <Spec />
    </React.Fragment>
  );
};

export default Interactions;
