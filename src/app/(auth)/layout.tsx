"use client";
import React, { useState } from "react";
import "@/styles/global.css";
import AntdesignProvider from "@/providers/AntdesignProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import HeaderMain from "@/components/HeaderMain";
import HistorySidebar from "@/components/HistorySidebar";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="[&::-webkit-scrollbar-thumb]:bg-nirvul-gray-600 [&::-webkit-scrollbar-track]:bg-nirvul-gray-200 h-full flex-1 grow overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1 antialiased">
        <AntdesignProvider>
          <TanstackProvider>
            <main
              aria-describedby="root-layout"
              className="bg-white min-h-screen h-full"
            >
              <HeaderMain />
              {children}
            </main>
          </TanstackProvider>
        </AntdesignProvider>
      </body>
    </html>
  );
};

export default RootLayout;
