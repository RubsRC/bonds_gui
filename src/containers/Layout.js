import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Header, Content, Footer } = Layout;
const CustomLayout = (props) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item>
            <Link to="/">Workspace</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/portfolio">Portfolio</Link>
          </Menu.Item>
          {props.isAuthenticated ? (
            <Menu.Item onClick={props.logout}>Logout</Menu.Item>
          ) : (
            <Menu.Item>
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
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
      this.history.push("/login");
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout);
