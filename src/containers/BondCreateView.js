import React from "react";
// import axios from "axios";
import BondForm from "../components/BondForm";

class BondCreateView extends React.Component {
  render() {
    return (
      <>
        <h1>Create Bond</h1>
        <BondForm />
      </>
    );
  }
}

export default BondCreateView;