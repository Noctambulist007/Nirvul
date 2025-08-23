'use client'
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, message } from "antd";
import React, { useEffect } from "react";

const AntdesignProvider = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    message.config({
      duration: 5,
    });
  }, []);

  return (
    <AntdRegistry>
      <ConfigProvider
        prefixCls="thinkshop"
        theme={{
          cssVar: true,
          token: {
            // global token
            fontFamily: "var(--font-figtree)",
            colorPrimary: "var(--color-tshop-primary-500)", // Using CSS variable
            lineHeight: 1,
            borderRadius: 8,
            fontSize: 16,
            colorBgContainer: "var(--color-white)",
            colorBgContainerDisabled: "var(--color-tshop-gray-100)",
            colorBgSolid: "var(--color-tshop-gray-950)",
            controlHeight: 40,
            controlHeightLG: 48,
            controlHeightSM: 32,
            colorBorder: "var(--color-tshop-gray-300)",
            colorLink: "var(--color-tshop-primary-500)", // Using CSS variable
            colorText: "var(--color-tshop-gray-900)",
            colorTextDisabled: "var(--color-tshop-gray-400)",
            colorTextDescription: "var(--color-tshop-gray-500)",
            colorBorderSecondary: "var(--color-tshop-gray-200)",
            colorBgTextHover: "var(--color-tshop-primary-100)",
            colorTextPlaceholder: "var(--color-tshop-gray-500)",
          },
          components: {
            Button: {
              // primary button
              colorPrimaryText: "var(--color-white)",
              colorPrimary: "var(--color-tshop-primary-500)",
              colorPrimaryHover: "var(--color-tshop-primary-600)",
              primaryShadow: "var(--shadow-tshop-xs)",
              colorPrimaryActive: "var(--color-tshop-primary-600)",
              colorPrimaryBorder: "var(--color-tshop-primary-500)",
              colorPrimaryBorderHover: "var(--color-tshop-primary-600)",
              fontWeight: 600,

              // default button
              defaultBorderColor: "var(--color-tshop-gray-300)",
              defaultShadow: "var(--shadow-tshop-xs)",
              defaultActiveBg: "var(--color-tshop-primary-50)",
              defaultActiveBorderColor: "var(--color-tshop-primary-500)",

              // for all buttons
              contentFontSize: 16,
              borderColorDisabled: "var(--color-tshop-gray-200)",
            },
            Input: {
              activeBorderColor: "var(--color-tshop-primary-500)",
              activeBg: "var(--color-white)",
              activeShadow: "var(--shadow-tshop-ring-xs)",
              addonBg: "var(--color-tshop-gray-100)",
              hoverBg: "var(--color-white)",
              hoverBorderColor: "var(--color-tshop-primary-500)",
              inputFontSize: 16,
              paddingBlock: 8,
              paddingInline: 12,
              colorTextPlaceholder: "var(--color-tshop-gray-500)",
              lineHeight: 1,
            },
            InputNumber: {
              activeBorderColor: "var(--color-tshop-primary-500)",
              activeBg: "var(--color-white)",
              activeShadow: "var(--shadow-tshop-ring-xs)",
              hoverBg: "var(--color-white)",
              hoverBorderColor: "var(--color-tshop-primary-500)",
              inputFontSize: 16,
              paddingBlock: 8,
              paddingInline: 12,
              colorTextPlaceholder: "var(--color-tshop-gray-500)",
              lineHeight: 1,
            },
            Pagination: {
              itemActiveBg: "var(--color-tshop-primary-500)",
              itemSize: 40,
              colorText: "var(--color-tshop-gray-900)",
              colorTextDisabled: "var(--color-tshop-gray-400)",
            }, 
            Tabs: {
              inkBarColor: "var(--color-tshop-primary-500)",
              itemActiveColor: "var(--color-tshop-primary-500)",
              itemColor: "var(--color-tshop-gray-500)",
              itemHoverColor: "var(--color-tshop-primary-500)",
              itemSelectedColor: "var(--color-tshop-primary-500)",
              horizontalItemGutter: 16,

              // card tabs
              cardBg: "transparent",
              cardHeight: 20,
              cardPadding: "8px 12px",
              colorBorderSecondary: "transparent",
              colorBgContainer: "var(--color-tshop-primary-50)",
            },
            DatePicker: {
              activeBg: "var(--color-white)",
              activeBorderColor: "var(--color-tshop-primary-500)",
              activeShadow: "var(--shadow-tshop-xs)",
              addonBg: "var(--color-tshop-primary-500)",
              cellActiveWithRangeBg: "var(--color-tshop-primary-500)",
              cellBgDisabled: "var(--color-tshop-gray-200)",
              cellHoverBg: "var(--color-tshop-primary-50)",
              cellWidth: 40,
              hoverBg: "var(--color-white)",
              hoverBorderColor: "var(--color-tshop-primary-500)",
              paddingBlock: 8,
              paddingInline: 12,
            },
            Table: {
              borderColor: "var(--color-tshop-gray-200)",
              cellFontSize: 18,
              headerBg: "var(--color-white)",
              headerBorderRadius: 10,
              headerColor: "var(--color-tshop-gray-750)",
              rowHoverBg: "var(--color-tshop-gray-50)",
            },
            Tag: {
              defaultBg: "var(--color-white)",
              defaultColor: "var(--color-tshop-gray-800)",
            },
            Dropdown: {
              fontSizeIcon: 18,
              fontSizeSM: 18,
              colorBgElevated: "var(--color-white)",
              controlItemBgHover: "var(--color-tshop-primary-50)",
            },
            Divider: {
              colorSplit: "var(--color-tshop-gray-200)",
            },
            Form: {
              labelColor: "var(--color-tshop-gray-950)",
            },
            Statistic: {
              titleFontSize: 15,
              contentFontSize: 25,
              lineHeight: 1.5,
            }
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdesignProvider;