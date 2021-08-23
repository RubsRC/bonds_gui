import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Space, Tag, Button } from "antd";

const { Column } = Table;

const BasicTable = (props) => {
  const history = useHistory();
  const goBack = () => {
    history.push("/portfolio");
  };

  const userID = localStorage.getItem("userID");

  const buyBond = (bond) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`,
    };
    axios
      .patch(`http://127.0.0.1:8000/api/bonds/${bond.id}/`, {
        buyer_id: userID,
      })
      .then((res) => {
        console.log(res);
        // todo: handle res status 400
        goBack();
      });
  };

  return (
    <Table dataSource={props.data}>
      <Column title="ID" dataIndex="id" key="id" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column
        title="Price"
        dataIndex="price"
        key="price"
        render={(text, recod) => <span>$ {recod.price}</span>}
      />
      <Column title="Number" dataIndex="total" key="total" />
      <Column title="Seller" dataIndex="owner" key="owner" />
      {props.withStatus ? (
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(text, recod) =>
            recod.status === "Bought" ? (
              <Tag color="blue">
                <span>{recod.status}</span>
              </Tag>
            ) : (
              <Tag color="green">
                <span>{recod.status}</span>
              </Tag>
            )
          }
        />
      ) : (
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a href={`/bond/${record.id}`}>Detalles</a>
              <Button onClick={() => buyBond(record)}>Comprar</Button>
            </Space>
          )}
        />
      )}
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(BasicTable);
