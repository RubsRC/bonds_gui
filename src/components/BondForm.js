import React from "react";
import { Form, Input, Button } from "antd";

const BondForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form
      onFinish={onFinish}
      layout="horizontal"
      wrapperCol={{ span: 6 }}
      labelCol={{ span: 8 }}
    >
      <Form.Item name="name" label="Name">
        <Input placeholder="Put a name here" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        extra="Numeric value in the range of 1 to 10,000"
      >
        <Input placeholder="Enter price" />
      </Form.Item>
      <Form.Item
        name="total"
        label="Total"
        extra="Numeric value in the range of 0 to 100,000,000"
      >
        <Input placeholder="Enter number of bonds" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BondForm;
