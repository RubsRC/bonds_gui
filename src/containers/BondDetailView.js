import React from 'react';
import axios from 'axios';

import { Card } from 'antd'

class BondDetailView extends React.Component {

  state = {
    bond: {}
  }
  componentDidMount() {
    const bondID = this.props.match.params.bondID;
    axios.get(`http://127.0.0.1:8000/api/bond/${bondID}/retrieve-update`)
    .then(res => {
      this.setState({
        bond: res.data
      });
    })
  }

  render() {
    const bond = this.state.bond;
    return (
      <Card title={bond.name}>
          <p>Price tag: {bond.price}</p>
      </Card>
    );
  }
}

export default BondDetailView;