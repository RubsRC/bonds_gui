import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import BasicTable from "../components/BasicTable";
class Workspace extends React.Component {

  state = {
    bonds: [],
  };

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + newProps.token,
      };
      axios.get("http://127.0.0.1:8000/api/bonds/").then((res) => {
        const results = res.data.map((row) => ({
          key: row.id, // add this for the data-row-key
          ...row,
        }));
        this.setState({
          bonds: results,
        });
      });
    }
  }

  render() {
    return (
      <>
        <h1>Buy Bonds</h1>
        <BasicTable data={this.state.bonds} />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Workspace);
