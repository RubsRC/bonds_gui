import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Header, Content, Footer } = Layout;
const CustomLayout = (props) => {

  const username = localStorage.getItem("username");

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
          <Menu.Item key="0">
            <Link to="/">Marketplace</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/portfolio">Portfolio</Link>
          </Menu.Item>
          {props.isAuthenticated ? (
            <Menu.Item key="2" onClick={props.logout}>
              <Link to="/login">Logout</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="3">
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Hello, {username}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout);
