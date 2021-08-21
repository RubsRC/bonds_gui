import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from 'antd';
import BasicTable from "../components/BasicTable";
class Portfolio extends React.Component {
  state = {
    bonds: [],
  };
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/bond/list-create/").then((res) => {
      const results = res.data.map((row) => ({
        key: row.id, // add this for the data-row-key
        ...row,
      }));
      this.setState({
        bonds: results,
      });
    });
  }

  render() {
    return (
      <>
        <h1>My Portfolio Bonds</h1>
        <Button>
          <Link to='/bond-create'>Create Bond</Link>
        </Button>
        <BasicTable data={this.state.bonds} />
      </>
    );
  }
}

export default Portfolio;
