import React from "react";
import { Table, Space, Tag } from "antd";

const { Column } = Table;

const BasicTable = (props) => {
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
      {/* <Column title="Currency" dataIndex="currency" key="currency" /> */}
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
              <a href="/">Comprar</a>
            </Space>
          )}
        />
      )}
    </Table>
  );
};

export default BasicTable;
