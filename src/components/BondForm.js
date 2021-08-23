import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button } from "antd";

const BondForm = (props) => {
  const history = useHistory();
  const goBack = () => {
    history.push("/portfolio");
  };

  const postBond = (payload) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`,
    };
    axios.post("http://127.0.0.1:8000/api/bonds/", payload).then(() => {
      goBack();
    });
  };

  const onFinish = (values) => {
    console.log("Values:", values);
    postBond(values);
  };

  return (
    <Form
      onFinish={onFinish}
      layout="horizontal"
      wrapperCol={{ span: 6 }}
      labelCol={{ span: 8 }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input a name!",
          },
        ]}
      >
        <Input placeholder="Put a name here" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        extra="Numeric value in the range of 0 to 100,000,000.0000"
        rules={[
          {
            required: true,
            message: "Please input the price!",
          },
        ]}
      >
        <Input placeholder="Enter price" />
      </Form.Item>
      <Form.Item
        name="total"
        label="Total"
        extra="Numeric value in the range of 1 to 10,000"
        rules={[
          {
            required: true,
            message: "Please input the total of bonds!",
          },
        ]}
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(BondForm);
