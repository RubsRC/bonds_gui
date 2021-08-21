import React from "react";
import { Table, Space } from "antd";

const { Column } = Table;

const BasicTable = (props) => {
  return (
    <Table dataSource={props.data}>
      <Column title="ID" dataIndex="id" key="id" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column title="Currency" dataIndex="currency" key="currency" />
      <Column title="Number" dataIndex="total" key="total" />
      <Column title="Seller" dataIndex="seller" key="seller" />
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
    </Table>
  );
};

export default BasicTable;
