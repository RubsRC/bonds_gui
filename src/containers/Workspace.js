import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Radio } from "antd";
import BasicTable from "../components/BasicTable";

const Workspace = (props) => {
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [bonds, setBonds] = useState([]);
  const [currency, setCurrency] = useState({});

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
      const results = res.data
        .map((row) => ({
          key: row.id, // add this for the data-row-key
          ...row,
        }))
        .filter(purchaseable);
      setBonds(results);
    });
  };

  const getExchangeRate = () => {
    // CORS blocked... will check later

    // axios
    //   .get(
    //     "	https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=dc3cb506ae534833bf4c8238840fa189f354a5dd5ab2905c03e99a35766bb963"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
    const exangeRate = 20.38;
    return 1 / exangeRate;
  };

  const onChange = (e) => {
    setCurrency(e.target.value);
    const dollar = getExchangeRate();
    if (e.target.value === "usd") {
      bonds.forEach((bond) => {
        bond.price = (bond.price * dollar).toFixed(4);
      });
      setBonds(bonds);
    } else {
      bonds.forEach((bond) => {
        bond.price = (bond.price * 20.38).toFixed(4);
      });
      setBonds(bonds);
    }
    console.log(`radio checked:${e.target.value}`);
  };

  return (
    <div>
      <h1>Buy Bonds</h1>
      <Radio.Group
        onChange={onChange}
        defaultValue="mxn"
        className="space-align-block"
        style={{ float: "right" }}
      >
        <Radio.Button value="mxn">MXN</Radio.Button>
        <Radio.Button value="usd">USD</Radio.Button>
      </Radio.Group>
      <BasicTable data={bonds} currency={currency} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Workspace);
