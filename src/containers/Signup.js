import React from "react";
import { NavLink } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Signup = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    props.onAuth(
      values.username,
      values.email,
      values.password,
      values.confirm
    );
    props.history.push("/");
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  return (
    <>
      <h1>Signup</h1>
      {errorMessage}
      {props.loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
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
            <Input placeholder="Choose your username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Strong password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Signup
            </Button>{" "}
            Have an account?
            <NavLink to="/login/"> Login!</NavLink>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password1, password2) => {
      dispatch(actions.authSignup(username, email, password1, password2));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
