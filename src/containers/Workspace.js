import React from 'react';
import axios from 'axios';
import BasicTable from '../components/BasicTable';
class Workspace extends React.Component {

  state = {
    bonds: []
  }
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/bond/list-create/')
    .then(res => {
      const results = res.data.map(row => ({
         key: row.id, // add this for the data-row-key
         ...row
      }))
      this.setState({
        bonds: results
      });
    })
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

export default Workspace;