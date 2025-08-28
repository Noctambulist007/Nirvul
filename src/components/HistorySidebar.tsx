"use client";

import { useState } from "react";
import {
  History,
  Clock,
  MoreVertical,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import {
  Button,
  Input,
  Dropdown,
  Empty,
  Drawer,
  Typography,
  Divider,
  Badge,
  Tooltip,
} from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface HistoryItem {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  type: "correction" | "translation" | "writing";
}

const HistoryDrawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: "1",
      title: "বাংলা বানান সংশোধন",
      content:
        "আমার নাম রাহুল এবং আমি একজন ছাত্র। এই বাক্যটিতে কিছু বানান ভুল ছিল যা সংশোধন করা হয়েছে।",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "correction",
    },
    {
      id: "2",
      title: "English to Bengali Translation",
      content:
        "Hello, how are you today? I hope you are doing well and having a great day.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "translation",
    },
    {
      id: "3",
      title: "প্রবন্ধ লেখা সহায়তা",
      content:
        "বাংলাদেশের স্বাধীনতা যুদ্ধ নিয়ে একটি প্রবন্ধ লিখতে সাহায্য করেছি। মুক্তিযুদ্ধের ইতিহাস এবং গুরুত্ব নিয়ে আলোচনা।",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: "writing",
    },
    {
      id: "4",
      title: "ব্যাকরণ পরীক্ষা",
      content:
        "বাংলা ব্যাকরণের নিয়ম অনুযায়ী বাক্য গঠন এবং শব্দ প্রয়োগ পরীক্ষা করা হয়েছে।",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      type: "correction",
    },
  ]);

  // Filter history
  const filteredHistory = historyItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "এখনই";
    if (diffInMinutes < 60) return `${diffInMinutes} মিনিট আগে`;
    if (diffInMinutes < 24 * 60)
      return `${Math.floor(diffInMinutes / 60)} ঘন্টা আগে`;
    return `${Math.floor(diffInMinutes / (24 * 60))} দিন আগে`;
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "correction":
        return {
          icon: "✓",
          bg: "bg-success-50",
          color: "text-success-700",
          border: "border-success-200",
          label: "সংশোধন",
          badgeColor: "#17b26a", // success-500
        };
      case "translation":
        return {
          icon: "🔄",
          bg: "bg-blue-light-50",
          color: "text-blue-light-700",
          border: "border-blue-light-200",
          label: "অনুবাদ",
          badgeColor: "#2065a2", // blue-light-700
        };
      case "writing":
        return {
          icon: "✏️",
          bg: "bg-purple-50",
          color: "text-purple-700",
          border: "border-purple-200",
          label: "লেখা",
          badgeColor: "#6f1a9f", // purple-700
        };
      default:
        return {
          icon: "📝",
          bg: "bg-nirvul-gray-50",
          color: "text-nirvul-gray-700",
          border: "border-nirvul-gray-200",
          label: "অন্যান্য",
          badgeColor: "#475467", // nirvul-gray-600
        };
    }
  };

  // Delete handlers
  const handleDeleteItem = (id: string) => {
    setHistoryItems((items) => items.filter((i) => i.id !== id));
  };

  const handleClearAll = () => {
    setHistoryItems([]);
  };

  const handleItemClick = (item: HistoryItem) => {
    console.log("Selected item:", item);
    // Handle item selection logic here
  };

  const mainDropdownItems = [
    {
      key: "clear",
      label: (
        <span className="flex items-center gap-2">
          <DeleteOutlined />
          Clear All History
        </span>
      ),
      onClick: handleClearAll,
      danger: true,
    },
  ];

  // Get statistics
  const getStats = () => {
    const total = historyItems.length;
    const corrections = historyItems.filter(
      (item) => item.type === "correction"
    ).length;
    const translations = historyItems.filter(
      (item) => item.type === "translation"
    ).length;
    const writings = historyItems.filter(
      (item) => item.type === "writing"
    ).length;

    return { total, corrections, translations, writings };
  };

  const stats = getStats();

  return (
    <>
      {/* Trigger Button */}
      
<Tooltip title="History" placement="bottom">
  <Button
    type="primary"
    shape="circle"
    size="large"
    icon={<PanelRightClose size={20} />}
    className="ml-3 bg-nirvul-primary hover:bg-nirvul-primary-900 border-none shadow-nirvul-xs hover:shadow-lg transition-all duration-200"
    onClick={() => setDrawerOpen(true)}
  />
</Tooltip>

      {/* Enhanced Drawer */}
      <Drawer
        placement="left"
        width={
          typeof window !== "undefined" && window.innerWidth < 768 ? "80%" : 480
        }
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        className="nirvul-history-drawer"
        styles={{
          header: { padding: 0, borderBottom: "none" },
          body: { padding: 0, backgroundColor: "#f9fafb" },
        }}
        title={
          <div className="bg-gradient-to-r from-nirvul-primary-600 to-nirvul-primary-800 text-white">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <History size={20} className="text-white" />
                </div>
                <div>
                  <Title level={4} className="!text-white !mb-0 !font-medium">
                    History
                  </Title>
                  <Text className="text-nirvul-primary-100 text-sm">
                    আপনার লেখার যাত্রা
                  </Text>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Dropdown
                  menu={{ items: mainDropdownItems }}
                  placement="bottomRight"
                >
                  <Button
                    type="text"
                    size="small"
                    icon={<MoreVertical size={20} />}
                    className="!text-white hover:bg-white/20 border-none"
                  />
                </Dropdown>
                <Button
                  type="text"
                  size="small"
                  icon={<PanelRightOpen  size={20}/>}
                  onClick={() => setDrawerOpen(false)}
                  className="!text-white hover:bg-white/20 border-none"
                />
              </div>
            </div>

            {/* Stats Bar */}
            {stats.total > 0 && (
              <div className="px-6 pb-4 border-t border-white/20">
                <div className="flex gap-4 text-sm mt-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success-300 rounded-full"></span>
                    <span className="text-nirvul-primary-100">
                      {stats.corrections} সংশোধন
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-light-300 rounded-full"></span>
                    <span className="text-nirvul-primary-100">
                      {stats.translations} অনুবাদ
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
                    <span className="text-nirvul-primary-100">
                      {stats.writings} লেখা
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
      >
        {/* Search Section */}
        <div className="p-4 bg-white border-b border-nirvul-gray-200">
          <div className="relative">
            <Input
              placeholder="Search your history..."
              prefix={<SearchOutlined className="text-nirvul-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              size="large"
              className="rounded-lg shadow-nirvul-xs border-nirvul-gray-200 focus:border-nirvul-primary-500 focus:shadow-nirvul-ring-xs"
            />
          </div>
        </div>

        {/* History Items */}
        <div className="flex-1 overflow-y-auto">
          {filteredHistory.length > 0 ? (
            <div className="p-4 space-y-3">
              {filteredHistory.map((item, index) => {
                const typeInfo = getTypeInfo(item.type);
                return (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-xl border border-nirvul-gray-200 hover:border-nirvul-primary-300 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Type indicator line */}
                    <div
                      className="absolute top-0 left-0 w-1 h-full"
                      style={{ backgroundColor: typeInfo.badgeColor }}
                    />

                    <div className="p-4 pl-6">
                      <div className="flex gap-3">
                        {/* Type Icon */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-medium ${typeInfo.bg} ${typeInfo.color} border-2 ${typeInfo.border} group-hover:scale-105 transition-transform duration-200`}
                        >
                          {typeInfo.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Title
                              level={5}
                              ellipsis={{ tooltip: item.title }}
                              className="!mb-0 !text-nirvul-gray-900 group-hover:!text-nirvul-primary-700 transition-colors !font-medium"
                            >
                              {item.title}
                            </Title>
                            <Badge
                              text={typeInfo.label}
                              color={typeInfo.badgeColor}
                              className="text-xs shrink-0"
                            />
                          </div>

                          <Text
                            type="secondary"
                            className="text-sm block mb-3 leading-relaxed text-nirvul-gray-600"
                            ellipsis={{  tooltip: item.content }}
                          >
                            {item.content}
                          </Text>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-nirvul-gray-500">
                              <Clock size={12} />
                              <span>{formatTimestamp(item.timestamp)}</span>
                            </div>

                            <Tooltip title="Delete this item">
                              <Button
                                type="text"
                                size="small"
                                icon={<DeleteOutlined />}
                                danger
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-error-50 text-error-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteItem(item.id);
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  imageStyle={{ height: 120 }}
                  description={
                    <div className="space-y-2">
                      <Text className="text-base text-nirvul-gray-600">
                        {searchTerm
                          ? "No matching history found"
                          : "No history yet"}
                      </Text>
                      {!searchTerm && (
                        <Text className="text-sm text-nirvul-gray-500">
                          Start writing to see your history here
                        </Text>
                      )}
                    </div>
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredHistory.length > 0 && (
          <>
            <Divider className="!my-0" />
            <div className="p-4 bg-nirvul-gray-25 border-t border-nirvul-gray-200">
              <div className="flex items-center justify-between text-sm text-nirvul-gray-600">
                <span>
                  Showing {filteredHistory.length} of {historyItems.length}{" "}
                  items
                </span>
                {searchTerm && (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => setSearchTerm("")}
                    className="p-0 h-auto text-nirvul-primary-600 hover:text-nirvul-primary-700"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </Drawer>

      <style jsx global>{`
        .nirvul-history-drawer .ant-drawer-header {
          border-bottom: none !important;
        }

        .nirvul-history-drawer .ant-drawer-content-wrapper {
          box-shadow: -4px 0 20px rgba(2, 126, 111, 0.15) !important;
        }

        .nirvul-history-drawer .ant-badge-count {
          font-size: 10px !important;
          min-width: 16px !important;
          height: 16px !important;
          line-height: 16px !important;
        }

        .nirvul-history-drawer .ant-input:focus,
        .nirvul-history-drawer .ant-input-focused {
          border-color: #0d9488 !important;
          box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px rgba(2, 126, 111, 0.2) !important;
        }

        .nirvul-history-drawer .ant-btn-primary {
          background-color: #0d9488 !important;
          border-color: #0d9488 !important;
        }

        .nirvul-history-drawer .ant-btn-primary:hover {
          background-color: #0f766e !important;
          border-color: #0f766e !important;
        }
      `}</style>
    </>
  );
};

export default HistoryDrawer;
