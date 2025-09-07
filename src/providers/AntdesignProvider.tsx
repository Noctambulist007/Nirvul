"use client";
import "@ant-design/v5-patch-for-react-19";
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
        prefixCls="nirvul"
        theme={{
          cssVar: true,
          token: {
            fontFamily: "var(--font-figtree)",
            colorPrimary: "var(--color-nirvul-primary-500)",
            lineHeight: 1,
            borderRadius: 8,
            fontSize: 16,
            colorBgContainer: "var(--color-white)",
            colorBgContainerDisabled: "var(--color-nirvul-gray-100)",
            colorBgSolid: "var(--color-nirvul-gray-950)",
            controlHeight: 40,
            controlHeightLG: 48,
            controlHeightSM: 32,
            colorBorder: "var(--color-nirvul-gray-300)",
            colorLink: "var(--color-nirvul-primary-500)",
            colorText: "var(--color-nirvul-gray-900)",
            colorTextDisabled: "var(--color-nirvul-gray-400)",
            colorTextDescription: "var(--color-nirvul-gray-500)",
            colorBorderSecondary: "var(--color-nirvul-gray-200)",
            colorBgTextHover: "var(--color-nirvul-primary-100)",
            colorTextPlaceholder: "var(--color-nirvul-gray-500)",
          },
          components: {
            Layout: {
              bodyBg: "var(--color-white)",
              footerBg: "var(--color-nirvul-gray-50)",
              footerPadding: "24px 50px",

              headerBg: "var(--color-nirvul-primary-500)",
              headerColor: "var(--color-white)",
              headerHeight: 64,
              headerPadding: "0 50px",

              lightSiderBg: "var(--color-white)",
              lightTriggerBg: "var(--color-nirvul-gray-100)",
              lightTriggerColor: "var(--color-nirvul-gray-900)",

              siderBg: "linear-gradient(135deg, var(--color-nirvul-primary-500) 0%, var(--color-nirvul-primary-700) 100%)",
              triggerBg: "var(--color-nirvul-primary-600)",
              triggerColor: "var(--color-white)",
              triggerHeight: 48,

              zeroTriggerHeight: 40,
              zeroTriggerWidth: 40,
            },
            Button: {
              colorPrimaryText: "var(--color-white)",
              colorPrimary: "var(--color-nirvul-primary-500)",
              colorPrimaryHover: "var(--color-nirvul-primary-600)",
              primaryShadow: "var(--shadow-nirvul-xs)",
              colorPrimaryActive: "var(--color-nirvul-primary-600)",
              colorPrimaryBorder: "var(--color-nirvul-primary-500)",
              colorPrimaryBorderHover: "var(--color-nirvul-primary-600)",
              fontWeight: 600,
              defaultBorderColor: "var(--color-nirvul-gray-300)",
              defaultShadow: "var(--shadow-nirvul-xs)",
              defaultActiveBg: "var(--color-nirvul-primary-50)",
              defaultActiveBorderColor: "var(--color-nirvul-primary-500)",
              contentFontSize: 16,
              borderColorDisabled: "var(--color-nirvul-gray-200)",
            },
            Menu: {
              activeBarBorderWidth: 2,
              activeBarHeight: 2,
              activeBarWidth: 0,
              collapsedIconSize: 16,
              collapsedWidth: 80,

              // Danger states (light mode)
              dangerItemActiveBg: "var(--color-nirvul-red-50)",
              dangerItemColor: "var(--color-nirvul-red-500)",
              dangerItemHoverColor: "var(--color-nirvul-red-600)",
              dangerItemSelectedBg: "var(--color-nirvul-red-50)",
              dangerItemSelectedColor: "var(--color-nirvul-red-600)",

              // Popup
              dropdownWidth: 160,
              popupBg: "var(--color-white)",
              zIndexPopup: 1050,

              // Group title
              groupTitleColor: "var(--color-nirvul-gray-500)",
              groupTitleFontSize: 14,
              groupTitleLineHeight: 1.6,

              // Horizontal menus
              horizontalItemBorderRadius: 6,
              horizontalItemHoverBg: "transparent",
              horizontalItemHoverColor: "var(--color-nirvul-primary-500)",
              horizontalItemSelectedBg: "transparent",
              horizontalItemSelectedColor: "var(--color-nirvul-primary-600)",
              horizontalLineHeight: "46px",

              // Icons
              iconMarginInlineEnd: 10,
              iconSize: 16,

              // Items
              itemActiveBg: "var(--color-nirvul-primary-500)",
              itemBg: "var(--color-nirvul-primary-50)",
              itemBorderRadius: 8,
              itemColor: "var(--color-nirvul-gray-900)",
              itemDisabledColor: "var(--color-nirvul-gray-400)",
              itemHeight: 40,
              itemHoverBg: "var(--color-nirvul-primary-100)",
              itemHoverColor: "var(--color-nirvul-gray-900)",
              itemMarginBlock: 4,
              itemMarginInline: 4,
              itemPaddingInline: 16,
              itemSelectedBg: "var(--color-nirvul-primary-500)",
              itemSelectedColor: "var(--color-white)",
            },
            Input: {
              activeBorderColor: "var(--color-nirvul-primary-500)",
              activeBg: "var(--color-white)",
              activeShadow: "var(--shadow-nirvul-ring-xs)",
              addonBg: "var(--color-nirvul-gray-100)",
              hoverBg: "var(--color-white)",
              hoverBorderColor: "var(--color-nirvul-primary-500)",
              inputFontSize: 16,
              paddingBlock: 8,
              paddingInline: 12,
              colorTextPlaceholder: "var(--color-nirvul-gray-500)",
              lineHeight: 1,
            },
            InputNumber: {
              activeBorderColor: "var(--color-nirvul-primary-500)",
              activeBg: "var(--color-white)",
              activeShadow: "var(--shadow-nirvul-ring-xs)",
              hoverBg: "var(--color-white)",
              hoverBorderColor: "var(--color-nirvul-primary-500)",
              inputFontSize: 16,
              paddingBlock: 8,
              paddingInline: 12,
              colorTextPlaceholder: "var(--color-nirvul-gray-500)",
              lineHeight: 1,
            },
            Select: {
              activeBorderColor: "var(--color-nirvul-primary-500)",
              activeOutlineColor: "var(--shadow-nirvul-ring-xs)",
              hoverBorderColor: "var(--color-nirvul-primary-500)",
              clearBg: "var(--color-white)",
              selectorBg: "var(--color-white)",
              optionActiveBg: "var(--color-nirvul-primary-50)",
              optionSelectedBg: "var(--color-nirvul-primary-50)",
              optionSelectedColor: "var(--color-nirvul-primary-500)",
              optionSelectedFontWeight: 600,
              optionFontSize: 16,
              optionHeight: 40,
              optionPadding: "8px 12px",
              multipleItemBg: "var(--color-nirvul-primary-50)",
              multipleItemBorderColor: "var(--color-nirvul-primary-200)",
              multipleItemHeight: 28,
              multipleItemHeightLG: 32,
              multipleItemHeightSM: 24,
              multipleSelectorBgDisabled: "var(--color-nirvul-gray-100)",
              multipleItemColorDisabled: "var(--color-nirvul-gray-400)",
              multipleItemBorderColorDisabled: "var(--color-nirvul-gray-200)",
              singleItemHeightLG: 48,
              showArrowPaddingInlineEnd: 12,
            },
            Tabs: {
              inkBarColor: "var(--color-nirvul-primary-500)",
              itemActiveColor: "var(--color-nirvul-primary-500)",
              itemColor: "var(--color-nirvul-gray-500)",
              itemHoverColor: "var(--color-nirvul-primary-500)",
              itemSelectedColor: "var(--color-nirvul-primary-500)",
              horizontalItemGutter: 16,
              cardBg: "transparent",
              cardHeight: 20,
              cardPadding: "8px 12px",
              colorBorderSecondary: "transparent",
              colorBgContainer: "var(--color-nirvul-primary-50)",
            },
            DatePicker: {
              activeBg: "var(--color-white)",
              activeBorderColor: "var(--color-nirvul-primary-500)",
              activeShadow: "var(--shadow-nirvul-xs)",
              addonBg: "var(--color-nirvul-primary-500)",
              cellActiveWithRangeBg: "var(--color-nirvul-primary-500)",
              cellBgDisabled: "var(--color-nirvul-gray-200)",
              cellHoverBg: "var(--color-nirvul-primary-50)",
              cellWidth: 40,
              hoverBg: "var(--color-white)",
              hoverBorderColor: "var(--color-nirvul-primary-500)",
              paddingBlock: 8,
              paddingInline: 12,
            },
            Table: {
              borderColor: "var(--color-nirvul-gray-200)",
              cellFontSize: 18,
              headerBg: "var(--color-white)",
              headerBorderRadius: 10,
              headerColor: "var(--color-nirvul-gray-750)",
              rowHoverBg: "var(--color-nirvul-gray-50)",
            },
            Tag: {
              defaultBg: "var(--color-white)",
              defaultColor: "var(--color-nirvul-gray-800)",
            },
            Dropdown: {
              fontSizeIcon: 18,
              fontSizeSM: 18,
              colorBgElevated: "var(--color-white)",
              controlItemBgHover: "var(--color-nirvul-primary-50)",
            },
            Divider: {
              colorSplit: "var(--color-nirvul-gray-200)",
            },
            Form: {
              labelColor: "var(--color-nirvul-gray-950)",
            },
            Statistic: {
              titleFontSize: 15,
              contentFontSize: 25,
              lineHeight: 1.5,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdesignProvider;
