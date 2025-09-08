import { Button, Select } from "antd";
import React from "react";
import { CheckCircle, FileText, Languages, Type } from "lucide-react";
import { LoadingAction, WritingStyle } from "@/app/(core)/page";
import { useMenu } from "@/contexts/MenuContext";

const { Option } = Select;

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  isLoading: boolean;
  onCorrect: () => void;
  onTranslate: () => void;
  onSummarize: () => void;
  loadingAction: LoadingAction;
  writingStyle: WritingStyle;
  setWritingStyle: (style: WritingStyle) => void;
  hasInput: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  inputText,
  setInputText,
  isLoading,
  onCorrect,
  onTranslate,
  onSummarize,
  loadingAction,
  writingStyle,
  setWritingStyle,
  hasInput,
}) => {
  const { activeKey } = useMenu();

  const charCount = inputText.length;
  const wordCount =
    inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;

  // Get action button config based on activeKey
  const getActionButton = () => {
    switch (activeKey) {
      case "correct":
        return {
          onClick: onCorrect,
          loading: isLoading && loadingAction === "correct",
          icon: <CheckCircle className="w-4 h-4" />,
          text: "শুদ্ধ করুন",
          className:
            "bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 border-0 shadow-lg shadow-success-500/25",
        };
      case "translate":
        return {
          onClick: onTranslate,
          loading: isLoading && loadingAction === "translate",
          icon: <Languages className="w-4 h-4" />,
          text: "অনুবাদ",
          className:
            "bg-gradient-to-r from-blue-light-500 to-blue-light-600 hover:from-blue-light-600 hover:to-blue-light-700 border-0 shadow-lg shadow-blue-light-500/25",
        };
      case "summarize":
        return {
          onClick: onSummarize,
          loading: isLoading && loadingAction === "summarize",
          icon: <FileText className="w-4 h-4" />,
          text: "সারসংক্ষেপ",
          className:
            "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0 shadow-lg shadow-purple-500/25",
        };
      default:
        return null;
    }
  };

  const actionButton = getActionButton();

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-nirvul-gray-200/20 border border-nirvul-gray-100 overflow-hidden h-full flex flex-col backdrop-blur-sm">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-nirvul-primary-25 via-white to-nirvul-primary-25 p-6 border-b border-nirvul-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-nirvul-primary-500 to-nirvul-primary-600 flex items-center justify-center shadow-lg">
              <Type className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-nirvul-gray-800 bg-gradient-to-r from-nirvul-gray-800 to-nirvul-gray-700 bg-clip-text text-transparent">
              আপনার লেখাটি এখানে দিন
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-nirvul-gray-600">
              লিখনের ধরন
            </span>
            <Select
              value={writingStyle}
              onChange={(val) => setWritingStyle(val)}
              className="min-w-[200px]"
              size="large"
              style={{
                borderRadius: "12px",
              }}
            >
              <Option value="standard">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-nirvul-primary-400"></div>
                  স্ট্যান্ডার্ড → স্বাভাবিক / সাধারণ / প্রচলিত
                </div>
              </Option>
              <Option value="formal">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                  শুদ্ধ → পাণ্ডিত্যপূর্ণ / প্রাচীন / সাহিত্যিক
                </div>
              </Option>
              <Option value="creative">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                  সৃজনশীল → কল্পনাময় / কাব্যিক / রূপকধর্মী
                </div>
              </Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 flex flex-col min-h-0">
        {/* Text Input Area */}
        <div className="relative flex-1 flex flex-col">
          <textarea
            className="w-full h-full p-4 text-base text-slate-700 placeholder-slate-400 bg-gray-50 rounded-lg border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-nirvul-primary-500 transition-all duration-200 bg-gradient-to-br from-nirvul-gray-25 to-white
                     placeholder:text-nirvul-gray-400 placeholder:font-medium
                     hover:border-nirvul-gray-300 hover:shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed
                     scrollbar-thin scrollbar-thumb-nirvul-gray-300 scrollbar-track-transparent"
            placeholder="উদাহরণ: আমি বাংলায় গান গাই..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            aria-label="Bengali text input"
            maxLength={10000}
            style={{
              fontFamily: "SolaimanLipi, Kalpurush, Arial, sans-serif",
            }}
          />

          {/* Character limit indicator */}
          {charCount > 8000 && (
            <div
              className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
              ${
                charCount > 9500
                  ? "bg-error-100 text-error-700 border border-error-200"
                  : "bg-warning-100 text-warning-700 border border-warning-200"
              }`}
            >
              {10000 - charCount} অক্ষর বাকি
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-6 p-4 bg-gradient-to-r from-nirvul-gray-25 to-nirvul-primary-25 rounded-2xl border border-nirvul-gray-100">
          {/* Action Button */}
          <div className="flex gap-3">
            {actionButton && (
              <Button
                type="primary"
                size="large"
                icon={actionButton.icon}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white 
                          transition-all duration-300 transform hover:scale-105 active:scale-95
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                          ${actionButton.className}`}
                onClick={actionButton.onClick}
                loading={actionButton.loading}
                disabled={isLoading || !hasInput}
              >
                {actionButton.text}
              </Button>
            )}
          </div>

          {/* Stats and Progress */}
          <div className="flex items-center gap-4">
            {/* Word/Character Counter */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-nirvul-primary-400"></div>
                <span className="font-semibold text-nirvul-gray-700">
                  {wordCount}
                </span>
                <span className="text-nirvul-gray-500">শব্দ</span>
              </div>
              <div className="w-px h-4 bg-nirvul-gray-300"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-nirvul-gray-400"></div>
                <span className="font-semibold text-nirvul-gray-700">
                  {charCount}
                </span>
                <span className="text-nirvul-gray-500">অক্ষর</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-24 h-2 bg-nirvul-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full
                  ${
                    charCount < 5000
                      ? "bg-gradient-to-r from-success-400 to-success-500"
                      : charCount < 8000
                      ? "bg-gradient-to-r from-warning-400 to-warning-500"
                      : "bg-gradient-to-r from-error-400 to-error-500"
                  }`}
                style={{
                  width: `${Math.min((charCount / 10000) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
