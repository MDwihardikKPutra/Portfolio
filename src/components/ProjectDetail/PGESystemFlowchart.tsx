interface PGESystemFlowchartProps {
  isDarkMode: boolean;
}

export const PGESystemFlowchart = ({ isDarkMode }: PGESystemFlowchartProps) => {
  return (
    <div
      className={`p-4 rounded-lg transition-colors h-full flex flex-col min-h-0 overflow-hidden ${
        isDarkMode ? "bg-[#0a0a0a]" : "bg-[#f9f9f9]"
      }`}
    >
      <h3
        className={`text-base font-medium mb-4 flex-shrink-0 transition-colors ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        PGE System Workflow
      </h3>
      <div className="flowchart-container flex-1 min-h-0 overflow-hidden flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          {/* Start */}
          <div
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isDarkMode
                ? "bg-blue-900/30 text-blue-300 border border-blue-700"
                : "bg-blue-50 text-blue-700 border border-blue-300"
            }`}
          >
            User Mengakses Sistem
          </div>

          <div
            className={`w-0.5 h-6 transition-colors ${
              isDarkMode ? "bg-[#555555]" : "bg-gray-300"
            }`}
          ></div>

          {/* Decision: Select Module */}
          <div
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors transform rotate-45 w-24 h-24 flex items-center justify-center ${
              isDarkMode
                ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                : "bg-yellow-50 text-yellow-700 border border-yellow-300"
            }`}
          >
            <span className="transform -rotate-45 text-xs">Pilih Modul</span>
          </div>

          {/* Module Options */}
          <div className="flex gap-3 mt-2 flex-wrap justify-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-white text-black border-2 border-gray-300"
                }`}
              >
                Leave Module
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-white text-black border-2 border-gray-300"
                }`}
              >
                Payment Module
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-white"
                    : "bg-white text-black border-2 border-gray-300"
                }`}
              >
                Work Module
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


