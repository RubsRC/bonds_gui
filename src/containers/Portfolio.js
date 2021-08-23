import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";
import BasicTable from "../components/BasicTable";

const Portfolio = (props) => {
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [bonds, setBonds] = useState([]);

  const username = localStorage.getItem("username");

  const belongsToMe = (item) => {
    return item.buyer ? item.buyer === username : item.owner === username;
  };

  const fetchItems = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`,
    };
    axios.get("http://127.0.0.1:8000/api/bonds/").then((res) => {
      const bonos = res.data;
      const results = bonos
        .map((row) => {
          const status = row.buyer ? 'Bought' : 'Available'; 
          return ({
          key: row.id, // add this for the data-row-key
          status,
          ...row,
        })})
        .filter(belongsToMe);
      setBonds(results);
    });
  };

  return (
    <div>
      <h1>My Portfolio Bonds</h1>
      <Button
        type="primary"
        className="space-align-block"
        style={{ float: "right" }}
      >
        <Link to="/bond-create">Create Bond</Link>
      </Button>
      <BasicTable data={bonds} withStatus={true} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Portfolio);
