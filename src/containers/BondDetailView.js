import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Card } from "antd";

const BondDetailView = (props) => {
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [bond, setBond] = useState([]);

  const bondID = props.match.params.bondID;

  const fetchItem = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`,
    };
    axios.get(`http://127.0.0.1:8000/api/bonds/${bondID}`).then((res) => {
      console.log(res);
      setBond(res.data);
    });
  };

  return (
    <Card title={bond.name}>
      <p>Price: <b>{bond.price}</b></p>
      <p>Total: <b>{bond.total}</b></p>
      <p>Owner: <b>{bond.owner}</b></p>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(BondDetailView);
