"use client";

import { useEffect, useState } from "react";
import {
  History,
  Clock,
  MoreVertical
} from "lucide-react";
import {
  Button,
  Input,
  Dropdown,
  Empty,
  Typography,
  Divider,
  Badge,
  Tooltip,
  Layout,
} from "antd";
import { CloseCircleOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useMenu } from "@/contexts/MenuContext";
import { useHistory } from "@/hooks/useHistory";
import { useUser } from "@/hooks/useUser";

const { Sider } = Layout;
const { Text, Title } = Typography;

interface HistoryItem {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  type: "correction" | "translation" | "writing";
}

const HistorySider = ({userId} : {userId: string}) => {
  const {getHistory} = useHistory();
  const {data, isLoading} = getHistory(userId);
  const history = data?.map((item) => ({
      id: item.id,
      title: item.data.type === 'correct' ? 'বানান সংশোধন' : item.data.type === 'translate' ? 'অনুবাদ' : 'লেখা সারসংক্ষেপ',
      content: item.data.inputText,
      timestamp: new Date(item.created_at),
      type: item.data.type,
    })) || []


  const { showHistorySider, setShowHistorySider } = useMenu();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(history
);


useEffect(() => {
  setHistoryItems(history);
}, [history]);

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
      case "correct":
        return {
          icon: "✓",
          bg: "bg-success-50",
          color: "text-success-700",
          border: "border-success-200",
          label: "সংশোধন",
          badgeColor: "#17b26a",
        };
      case "translate":
        return {
          icon: "🔄",
          bg: "bg-blue-light-50",
          color: "text-blue-light-700",
          border: "border-blue-light-200",
          label: "অনুবাদ",
          badgeColor: "#2065a2",
        };
      default:
        return {
          icon: "📝",
          bg: "bg-nirvul-gray-50",
          color: "text-nirvul-gray-700",
          border: "border-nirvul-gray-200",
          label: "সারসংক্ষেপ",
          badgeColor: "#475467",
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

  const stats = {
    total: historyItems.length,
    corrections: historyItems.filter((i) => i.type === "correction").length,
    translations: historyItems.filter((i) => i.type === "translation").length,
    writings: historyItems.filter((i) => i.type === "writing").length,
  };

  return (
    <Sider
      hidden={!showHistorySider}
      onCollapse={(val) => setShowHistorySider(val)}
      width={380}
      theme="light"
      className="shadow-md h-screen overflow-y-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-nirvul-primary-600 to-nirvul-primary-800 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-lg border border-white/30">
              <History size={18} className="text-white" />
            </div>
            <div>
              <Title level={5} className="!text-white !mb-0 !text-2xl">
                আপনার লেখার যাত্রা
              </Title>
            </div>
          </div>
          {
            <div className="flex items-center gap-2">
              <Dropdown
                menu={{ items: mainDropdownItems }}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  size="small"
                  icon={<MoreVertical size={18} />}
                  className="!text-white hover:bg-white/20 border-none"
                />
              </Dropdown>
              <Button
                type="text"
                size="small"
                icon={<CloseCircleOutlined />}
                onClick={() => setShowHistorySider(!showHistorySider)}
                className="!text-white hover:bg-white/20 border-none"
              />
            </div>
          }
        </div>

        {/* Stats */}
        {stats.total > 0 && (
          <div className="px-4 pb-3 border-t border-white/20">
            <div className="flex gap-3 text-xs mt-2">
              <span className="flex items-center gap-1 text-nirvul-primary-100">
                <span className="w-2 h-2 bg-success-300 rounded-full"></span>
                {stats.corrections} সংশোধন
              </span>
              <span className="flex items-center gap-1 text-nirvul-primary-100">
                <span className="w-2 h-2 bg-blue-light-300 rounded-full"></span>
                {stats.translations} অনুবাদ
              </span>
              <span className="flex items-center gap-1 text-nirvul-primary-100">
                <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
                {stats.writings} লেখা
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      {
        <div className="p-3 bg-white border-b border-nirvul-gray-200">
          <Input
            placeholder="Search your history..."
            prefix={<SearchOutlined className="text-nirvul-gray-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            size="middle"
            className="rounded-md"
          />
        </div>
      }

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            {filteredHistory.map((item) => {
              const typeInfo = getTypeInfo(item.type);
              return (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-lg border border-nirvul-gray-200 hover:border-nirvul-primary-300 hover:shadow transition cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: typeInfo.badgeColor }}
                  />
                  <div className="p-3 pl-5">
                    <div className="flex gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-base ${typeInfo.bg} ${typeInfo.color} border ${typeInfo.border}`}
                      >
                        {typeInfo.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <Title
                            level={5}
                            ellipsis={{ tooltip: item.title }}
                            className="!mb-0 !text-nirvul-gray-900"
                          >
                            {item.title}
                          </Title>
                          <Badge
                            text={typeInfo.label}
                            color={typeInfo.badgeColor}
                            className="text-xs"
                          />
                        </div>
                        <Text
                          type="secondary"
                          className="text-xs block mb-2 text-nirvul-gray-600"
                          ellipsis={{ tooltip: item.content }}
                        >
                          {item.content}
                        </Text>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-xs text-nirvul-gray-500">
                            <Clock size={12} />{" "}
                            {formatTimestamp(item.timestamp)}
                          </span>
                          <Tooltip title="Delete this item">
                            <Button
                              type="text"
                              size="small"
                              icon={<DeleteOutlined />}
                              danger
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
          <div className="h-full flex items-center justify-center">
            <Empty
              description={
                <Text className="text-sm text-nirvul-gray-500">
                  {searchTerm ? "No matching history found" : "No history yet"}
                </Text>
              }
            />
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredHistory.length > 0 && (
        <>
          <Divider className="!my-0" />
          <div className="p-3 text-xs text-nirvul-gray-600 flex justify-between">
            <span>
              Showing {filteredHistory.length} of {historyItems.length} items
            </span>
            {searchTerm && (
              <Button
                type="link"
                size="small"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </Button>
            )}
          </div>
        </>
      )}
    </Sider>
  );
};

export default HistorySider;
