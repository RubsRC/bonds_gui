import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BasicTable from "../components/BasicTable";

const Workspace = (props) => {
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [bonds, setBonds] = useState([]);

  const username = localStorage.getItem("username");

  const purchaseable = (item) => {
    return !item.buyer && item.owner !== username;
  };

  const fetchItems = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`,
    };
    axios.get("http://127.0.0.1:8000/api/bonds/").then((res) => {
      const results = res.data.map((row) => ({
        key: row.id, // add this for the data-row-key
        ...row,
      })).filter(purchaseable);
      setBonds(results);
    });
  };
  return (
    <div>
      <h1>Buy Bonds</h1>
      <BasicTable data={bonds} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Workspace);
