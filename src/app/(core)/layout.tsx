"use client";
import React, { useState } from "react";
import "@/styles/global.css";
import AntdesignProvider from "@/providers/AntdesignProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import HeaderMain from "@/components/HeaderMain";
import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <AntdesignProvider>
      <TanstackProvider>
        {/* <HeaderMain /> */}
        {/* <HistorySidebar />
         */}
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  // icon: <UserOutlined />,
                  label: "nav 1",
                },
                {
                  key: "2",
                  // icon: <VideoCameraOutlined />,
                  label: "nav 2",
                },
                {
                  key: "3",
                  // icon: <UploadOutlined />,
                  label: "nav 3",
                },
              ]}
            />
          </Sider>
          <Layout>
            <HeaderMain />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
               
              }}
            >
              <html lang="en">
                <body className="[&::-webkit-scrollbar-thumb]:bg-nirvul-gray-600 [&::-webkit-scrollbar-track]:bg-nirvul-gray-200 h-full flex-1 grow overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1 antialiased">
                  <main
                    aria-describedby="root-layout"
                    className="bg-white min-h-screen h-full"
                  >
                    {children}
                  </main>
                </body>
              </html>
            </Content>
          </Layout>
        </Layout>
      </TanstackProvider>
    </AntdesignProvider>
  );
};

export default RootLayout;
