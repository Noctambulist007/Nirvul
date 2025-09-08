"use client";
import React from "react";
import "@/styles/global.css";
import AntdesignProvider from "@/providers/AntdesignProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import HeaderMain from "@/components/HeaderMain";
import { Layout, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { CheckCircle, FileText, History, Languages, Sparkles } from "lucide-react";
import { MenuProvider, useMenu } from "@/contexts/MenuContext";
import Link from "next/link";
import HistorySider from "@/components/HistorySidebar";
const { Text, Title } = Typography;

const MainContent = ({ children }: React.PropsWithChildren) => {
  const { activeKey, setActiveKey, setShowHistorySider} = useMenu();

  const handleMenuClick = ({ key }: { key: string }) => {
    setActiveKey(key);
    if (key === "history") {
      setShowHistorySider(true);
    } else {
      setShowHistorySider(false);
    }
  };

  const menuItems = [
    {
      key: "correct",
      icon: <CheckCircle className="w-5 h-5" />,
      label: "শুদ্ধ করুন",
      description: "ব্যাকরণ ও বানান সংশোধন"
    },
    {
      key: "translate",
      icon: <Languages className="w-5 h-5" />,
      label: "অনুবাদ",
      description: "ভাষা রূপান্তর"
    },
    {
      key: "summarize",
      icon: <FileText className="w-5 h-5" />,
      label: "সারসংক্ষেপ",
      description: "মূল বিষয় নির্ধারণ"
    },
    {
      key: "history",
      icon: <History className="w-5 h-5" />,
      label: "হিস্ট্রি",
      description: "আপনার লেখার যাত্রা"
    }
  ];

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-nirvul-gray-25 via-white to-nirvul-primary-25">
      <Sider
        width={280}
        className="shadow-2xl border-r border-nirvul-gray-200/30 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(180deg, #027e6f 0%, #0f766e 50%, #134e48 100%)',
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
          minWidth: '280px',
          maxWidth: '280px',
        }}
      >
        {/* Logo Section with Enhanced Design */}
        <div className=" border-b border-white/20 backdrop-blur-sm">
          <Link
            href="/"
            className="flex items-center justify-center space-x-3 p-2.5 hover:bg-white/10 transition-all duration-300 group"
            aria-label="Nirvul home - Your Bengali writing AI assistant"
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="text-nirvul-primary-100 group-hover:text-white transition-colors" />
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  নির্ভুল
                </h1>
              </div>
              <p className="text-nirvul-primary-100/80 text-sm font-medium group-hover:text-white/90 transition-colors">
                বাংলা লেখার AI সহযোগী
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-nirvul-primary-100/50 to-transparent mx-auto mt-3"></div>
            </div>
          </Link>
        </div>

        {/* Navigation Menu with Enhanced Styling */}
        <div className="p-4">
          <nav className="space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => handleMenuClick({ key: item.key })}
                className={`
                  w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-left
                  transition-all duration-300 group relative overflow-hidden
                  ${activeKey === item.key 
                    ? 'bg-white/20 text-white shadow-xl backdrop-blur-sm border border-white/30 scale-105 transform' 
                    : 'text-white/75 hover:bg-white/10 hover:text-white hover:scale-102 transform'
                  }
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Active indicator line */}
                {activeKey === item.key && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-nirvul-primary-100 to-white rounded-r-full"></div>
                )}
                
                {/* Icon container */}
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300
                  ${activeKey === item.key 
                    ? 'bg-white/30 shadow-lg backdrop-blur-sm' 
                    : 'bg-white/10 group-hover:bg-white/20'
                  }
                `}>
                  {React.cloneElement(item.icon, { 
                    className: `w-5 h-5 transition-transform duration-300 ${
                      activeKey === item.key ? 'scale-110' : 'group-hover:scale-105'
                    }` 
                  })}
                </div>
                
                {/* Text content */}
                <div className="flex-1">
                  <span className="font-semibold text-base block">
                    {item.label}
                  </span>
                  <span className={`
                    text-xs font-normal transition-colors duration-300
                    ${activeKey === item.key 
                      ? 'text-white/80' 
                      : 'text-white/50 group-hover:text-white/70'
                    }
                  `}>
                    {item.description}
                  </span>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            ))}
          </nav>

          {/* Bottom decorative element */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-white/60 font-medium">AI সক্রিয়</span>
              </div>
            </div>
          </div>
        </div>
      </Sider>
      <HistorySider />
      <Layout className="bg-transparent relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-nirvul-primary-25/30 via-transparent to-nirvul-gray-50/50 pointer-events-none"></div>
        
        <HeaderMain />
        
        <Content className="m-6 relative z-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-nirvul-gray-200/50 p-8 min-h-[calc(100vh-200px)] relative overflow-hidden">
            {/* Content background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-nirvul-primary-main rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-nirvul-primary-600 rounded-full blur-3xl"></div>
            </div>
            
            {/* Content border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-nirvul-primary-100/20 via-transparent to-nirvul-primary-200/20 p-0.5 -m-0.5 blur-sm"></div>
            
            <main
              aria-describedby="root-layout"
              className="h-full relative z-10"
            >
              {children}
            </main>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="[&::-webkit-scrollbar-thumb]:bg-nirvul-gray-600 [&::-webkit-scrollbar-track]:bg-nirvul-gray-200 h-full flex-1 grow overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1 antialiased">
        <AntdesignProvider>
          <TanstackProvider>
            <MenuProvider>
              <MainContent>{children}</MainContent>
            </MenuProvider>
          </TanstackProvider>
        </AntdesignProvider>
      </body>
    </html>
  );
};

export default RootLayout;