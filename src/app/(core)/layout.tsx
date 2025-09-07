"use client";
import React from "react";
import "@/styles/global.css";
import AntdesignProvider from "@/providers/AntdesignProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import HeaderMain from "@/components/HeaderMain";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { CheckCircle, FileText, History, Languages } from "lucide-react";
import { MenuProvider, useMenu } from "@/contexts/MenuContext";


const MainContent = ({ children }: React.PropsWithChildren) => {
  const { activeKey, setActiveKey } = useMenu();

  const handleMenuClick = ({ key }: { key: string }) => {
    setActiveKey(key);
  };

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: "correct",
              icon: <CheckCircle className="w-5 h-5 text-green-600" />,
              label: "শুদ্ধ করুন",
            },
            {
              key: "translate",
              icon: <Languages className="w-5 h-5 text-blue-600" />,
              label: "অনুবাদ",
            },
            {
              key: "summarize",
              icon: <FileText className="w-5 h-5 text-purple-600" />,
              label: "সারসংক্ষেপ",
            },
            {
              key: "history",
              icon: <History className="w-5 h-5 text-rose-600" />,
              label: "হিস্ট্রি"
            }
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
  );
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <AntdesignProvider>
      <TanstackProvider>
        <MenuProvider>
          <MainContent>{children}</MainContent>
        </MenuProvider>
      </TanstackProvider>
    </AntdesignProvider>
  );
};

export default RootLayout;