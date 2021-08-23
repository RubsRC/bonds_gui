import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {
    
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    props.onAuth(values.username, values.password);
    props.history.push("/");
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  return (
    <>
      <h1>Login</h1>
      {errorMessage}
      {props.loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="horizontal"
          wrapperCol={{ span: 6 }}
          labelCol={{ span: 8 }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>{" "}
            Or
            <NavLink to="/signup/"> register now!</NavLink>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => {
      dispatch(actions.authLogin(username, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
