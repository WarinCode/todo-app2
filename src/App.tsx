import React from "react";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./css/style.css";

export default function App(): React.JSX.Element {
  return (
    <>
      <Navbar />
        <Form />
      <Footer />
    </>
  );
}