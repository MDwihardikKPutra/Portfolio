import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, AreaChart, Area, LabelList } from 'recharts';
import type { Translations } from "../../translations";

interface DataAnalystProjectPageProps {
  t: Translations;
  isDarkMode: boolean;
}

export const DataAnalystProjectPage = ({
  t,
  isDarkMode,
}: DataAnalystProjectPageProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const hoverBg = isDarkMode ? "hover:bg-[#1a1a1a]" : "hover:bg-[#f5f5f5]";

  return (
    <div className={`h-full ${bgColor} ${textColor} overflow-hidden w-full relative`}>
      <div className="h-full w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-8 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <Link
              to="/projects"
              className={`inline-flex items-center gap-2 text-xs sm:text-sm ${textSecondaryColor} transition-all duration-300 ${hoverBg} -ml-2 pl-2 pr-3 py-1 rounded`}
            >
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
              <span>{t.backToProjects}</span>
            </Link>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 border-b pb-8 border-gray-200 dark:border-gray-800"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-4 leading-tight">
              {t.dataAnalystProjectTitle}
            </h1>
            <div className={`text-xs sm:text-sm ${textSecondaryColor} space-y-2`}>
              <p>{t.dataAnalystProjectTools}</p>
              <p>
                {t.dataSource}:{" "}
                <a
                  href="https://www.kaggle.com/datasets/bakitacos/indonesia-e-commerce-sales-and-shipping-20232025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border-b border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 transition-colors pb-0.5`}
                >
                  Kaggle - Indonesia E-Commerce Sales and Shipping 2023-2025
                </a>
              </p>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Executive Summary */}
            <section>
              <h3 className="text-sm sm:text-base font-bold mb-3 uppercase tracking-wider opacity-80">
                {t.executiveSummary || "Executive Summary"}
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${textSecondaryColor} text-justify`}>
                {t.dataAnalystExecutiveSummary}
              </p>
            </section>

            {/* Project Objective */}
            <section>
              <h3 className="text-sm sm:text-base font-bold mb-3 uppercase tracking-wider opacity-80">
                {t.projectObjective || "Project Objectives"}
              </h3>
              <ul className={`text-xs sm:text-sm leading-relaxed ${textSecondaryColor} list-disc list-inside space-y-2 ml-2`}>
                <li>{t.dataAnalystObjective1}</li>
                <li>{t.dataAnalystObjective2}</li>
                <li>{t.dataAnalystObjective3}</li>
                <li>{t.dataAnalystObjective4}</li>
              </ul>
            </section>

            {/* Key Insights & Results */}
            <section>
              <h3 className="text-sm sm:text-base font-bold mb-6 uppercase tracking-wider opacity-80">
                {t.dataAnalystKeyInsightsResultsTitle}
              </h3>

              <div className="space-y-12">
                {/* Insight A: Payment Risk */}
                <div className={`p-6 sm:p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} shadow-sm`}>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {t.dataAnalystInsightARiskTitle}
                    </h4>
                    <p className={`text-sm ${textSecondaryColor}`}>
                      {t.dataAnalystInsightARiskFindings.split('.')[0]}.
                    </p>
                  </div>

                  {/* Chart Container - Payment Risk Trends */}
                  <div className="mb-8">
                    <h5 className={`text-sm font-semibold mb-4 ${textSecondaryColor}`}>Cancellation Rate by Method (%)</h5>
                    <div style={{ width: '100%', height: 320 }}>
                      <ResponsiveContainer>
                        <BarChart
                          data={[
                            { method: 'Indomaret', rate: 48.8 },
                            { method: 'Alfamart', rate: 47.2 },
                            { method: 'Online Pay', rate: 18.5 },
                            { method: 'SPayLater', rate: 14.9 },
                            { method: 'COD', rate: 13.4 },
                            { method: 'ShopeePay', rate: 8.7 },
                          ]}
                          layout="vertical"
                          margin={{ top: 5, right: 50, left: 80, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="100%" stopColor="#60a5fa" stopOpacity={1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} stroke={isDarkMode ? "#525252" : "#94a3b8"} />
                          <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDarkMode ? '#a3a3a3' : '#64748b', fontSize: 12 }}
                            domain={[0, 60]}
                          />
                          <YAxis
                            type="category"
                            dataKey="method"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDarkMode ? '#d1d5db' : '#374151', fontSize: 12 }}
                            width={70}
                          />
                          <Tooltip
                            cursor={{ fill: isDarkMode ? '#262626' : '#f1f5f9', opacity: 0.3 }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className={`p-4 rounded-xl shadow-lg border backdrop-blur-sm ${isDarkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-slate-100'}`}>
                                    <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{payload[0].payload.method}</p>
                                    <p className={`text-2xl font-bold ${textColor}`}>
                                      {payload[0].value}%
                                    </p>
                                    <p className="text-xs text-rose-500 font-medium">cancel rate</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={28} fill="url(#barGradient)">
                            <LabelList
                              dataKey="rate"
                              position="right"
                              formatter={(value: any) => `${value}%`}
                              style={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 11, fontWeight: 600 }}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Payment Risk Analysis Table */}
                  <div className="mb-0 overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="border-b border-gray-200 dark:border-neutral-800">
                          <tr>
                            <th className={`p-4 font-semibold ${textColor}`}>Payment Method</th>
                            <th className={`p-4 text-right font-semibold ${textColor}`}>Total Order</th>
                            <th className={`p-4 text-right font-semibold ${textColor}`}>Success</th>
                            <th className={`p-4 text-right font-semibold text-rose-500`}>Cancelled</th>
                            <th className={`p-4 text-right font-semibold ${textColor}`}>Cancel Rate</th>
                            <th className={`p-4 text-right font-semibold ${textColor}`}>Gross Value</th>
                            <th className={`p-4 text-right font-semibold text-rose-500`}>Rev. Loss</th>
                            <th className={`p-4 text-right font-bold ${textColor}`}>Realized Rev.</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
                          {/* Indomaret/i.Saku */}
                          <tr className="group hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors">
                            <td className={`p-4 font-medium ${textColor}`}>
                              Indomaret / i.Saku
                            </td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>43</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>22</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>21</td>
                            <td className={`p-4 text-right font-bold text-rose-600`}>48.8%</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>Rp 8.5 M</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>Rp 4.1 M</td>
                            <td className={`p-4 text-right font-mono font-bold ${textColor}`}>Rp 4.3 M</td>
                          </tr>

                          {/* Alfamart */}
                          <tr className="group hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors">
                            <td className={`p-4 font-medium ${textColor}`}>
                              Alfamart / Dan+Dan
                            </td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>36</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>19</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>17</td>
                            <td className={`p-4 text-right font-bold text-rose-600`}>47.2%</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>Rp 9.8 M</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>Rp 4.6 M</td>
                            <td className={`p-4 text-right font-mono font-bold ${textColor}`}>Rp 5.2 M</td>
                          </tr>

                          {/* COD */}
                          <tr className="group hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors">
                            <td className={`p-4 font-medium ${textColor}`}>
                              COD (Bayar di Tempat)
                            </td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>11,538</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>9,994</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>1,544</td>
                            <td className={`p-4 text-right font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>13.4%</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>Rp 471.8 M</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>Rp 63.1 M</td>
                            <td className={`p-4 text-right font-mono font-bold ${textColor}`}>Rp 408.7 M</td>
                          </tr>

                          {/* Online Payment */}
                          <tr className="group hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors">
                            <td className={`p-4 font-medium ${textColor}`}>Online Payment (VA/Transfer)</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>3,170</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>2,582</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>588</td>
                            <td className={`p-4 text-right font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>18.5%</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>Rp 299.2 M</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>Rp 55.5 M</td>
                            <td className={`p-4 text-right font-mono font-bold ${textColor}`}>Rp 243.7 M</td>
                          </tr>

                          {/* ShopeePay */}
                          <tr className="group hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors">
                            <td className={`p-4 font-medium ${textColor}`}>Saldo ShopeePay</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>3,692</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>3,370</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>322</td>
                            <td className={`p-4 text-right font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>8.7%</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>Rp 262.4 M</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>Rp 22.9 M</td>
                            <td className={`p-4 text-right font-mono font-bold ${textColor}`}>Rp 239.5 M</td>
                          </tr>

                          {/* SPayLater */}
                          <tr className="group hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors">
                            <td className={`p-4 font-medium ${textColor}`}>SPayLater</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>1,485</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>1,264</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>221</td>
                            <td className={`p-4 text-right font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>14.9%</td>
                            <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>Rp 114.4 M</td>
                            <td className={`p-4 text-right font-mono font-medium text-rose-500`}>Rp 17.0 M</td>
                            <td className={`p-4 text-right font-mono font-bold ${textColor}`}>Rp 97.4 M</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>


                  {/* Analysis Footer */}
                  <div className={`pt-6 border-t ${isDarkMode ? 'border-neutral-800' : 'border-gray-100'}`}>
                    <div className="space-y-4">
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t.analysis}</span>
                        <p className={`text-sm leading-relaxed ${textSecondaryColor} text-justify`}>
                          {t.dataAnalystInsightARiskAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight B: Market Dominance */}
                <div className={`p-6 sm:p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} shadow-sm`}>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {t.dataAnalystInsightBMarketTitle}
                    </h4>
                    <p className={`text-sm ${textSecondaryColor}`}>
                      {t.dataAnalystInsightBMarketFindings.split('.')[0]}.
                    </p>
                  </div>

                  {/* Unified Chart & Table Container */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8`}>
                    {/* Chart Side */}
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <defs>
                            <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#60a5fa" />
                            </linearGradient>
                            <linearGradient id="violetGradient" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                            <linearGradient id="cyanGradient" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                            <linearGradient id="slateGradient" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#64748b" />
                              <stop offset="100%" stopColor="#94a3b8" />
                            </linearGradient>
                          </defs>
                          <Pie
                            data={[
                              { name: 'Jawa Barat', value: 26.2, fill: 'url(#blueGradient)' },
                              { name: 'Banten', value: 16.8, fill: 'url(#violetGradient)' },
                              { name: 'Jakarta', value: 12.8, fill: 'url(#cyanGradient)' },
                              { name: 'Others', value: 44.2, fill: 'url(#slateGradient)' },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                            stroke={isDarkMode ? '#0a0a0a' : '#ffffff'}
                            strokeWidth={3}
                            cornerRadius={4}
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className={`p-4 rounded-xl shadow-lg border backdrop-blur-sm ${isDarkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-slate-100'}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="w-2 h-2 rounded-full" style={{ background: payload[0].payload.fill }}></div>
                                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{payload[0].name}</p>
                                    </div>
                                    <p className={`text-xl font-bold ${textColor}`}>
                                      {payload[0].value}%
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => <span className={`text-xs font-medium ${textSecondaryColor}`}>{value}</span>}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Table Side */}
                    <div className="flex flex-col justify-center">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className={`border-b ${isDarkMode ? 'border-neutral-800' : 'border-gray-100'}`}>
                            <th className={`pb-2 font-medium ${textSecondaryColor}`}>Province</th>
                            <th className={`pb-2 text-right font-medium ${textSecondaryColor}`}>Revenue</th>
                            <th className={`pb-2 text-right font-medium ${textSecondaryColor}`}>Share</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                          <tr className="group">
                            <td className={`py-3 ${textColor} font-medium`}>Jawa Barat</td>
                            <td className={`py-3 text-right ${textSecondaryColor}`}>Rp 277M</td>
                            <td className={`py-3 text-right font-bold ${textColor}`}>26.2%</td>
                          </tr>
                          <tr className="group">
                            <td className={`py-3 ${textColor}`}>Banten</td>
                            <td className={`py-3 text-right ${textSecondaryColor}`}>Rp 178M</td>
                            <td className={`py-3 text-right font-medium ${textColor}`}>16.8%</td>
                          </tr>
                          <tr className="group">
                            <td className={`py-3 ${textColor}`}>DKI Jakarta</td>
                            <td className={`py-3 text-right ${textSecondaryColor}`}>Rp 135M</td>
                            <td className={`py-3 text-right font-medium ${textColor}`}>12.8%</td>
                          </tr>
                          <tr className="group">
                            <td className={`py-3 ${textColor} opacity-60`}>Others</td>
                            <td className={`py-3 text-right ${textSecondaryColor} opacity-60`}>Rp 470M</td>
                            <td className={`py-3 text-right font-medium ${textColor} opacity-60`}>44.2%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Consolidated Regional Analysis Table */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h5 className={`text-sm font-semibold ${textColor}`}>Ringkasan Analisis Regional dan Risiko</h5>
                        <p className={`text-xs ${textSecondaryColor}`}>Kombinasi metrik performa, risiko operasional, dan komposisi metode pembayaran per provinsi.</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/10 md:hidden animate-pulse self-start">
                        <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Geser Tabel</span>
                        <svg className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm relative">
                      <table className="w-full text-sm text-left whitespace-nowrap border-separate border-spacing-0">
                        <thead>
                          <tr className="bg-gray-50/80 dark:bg-neutral-900/50">
                            <th className={`sticky left-0 z-20 p-3 font-semibold ${textColor} border-r border-b border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-[#0a0a0a]`} rowSpan={2}>
                              Province
                            </th>
                            <th className={`p-2 text-center font-semibold ${textColor} border-r border-b border-gray-200 dark:border-neutral-800`} colSpan={3}>Performance Overview</th>
                            <th className={`p-2 text-center font-semibold text-rose-500 border-r border-b border-gray-200 dark:border-neutral-800`} colSpan={1}>Risk Profile</th>
                            <th className={`p-2 text-center font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} border-b border-gray-200 dark:border-neutral-800`} colSpan={4}>Payment Method Mix (%)</th>
                          </tr>
                          <tr className="bg-gray-50/80 dark:bg-neutral-900/50 text-[11px] uppercase tracking-wider">
                            <th className={`p-2 text-right font-medium ${textSecondaryColor} border-b border-gray-200 dark:border-neutral-800`}>Orders</th>
                            <th className={`p-2 text-right font-medium ${textSecondaryColor} border-b border-gray-200 dark:border-neutral-800`}>Revenue</th>
                            <th className={`p-2 text-right font-medium ${textSecondaryColor} border-r border-b border-gray-200 dark:border-neutral-800`}>AOV</th>
                            <th className={`p-2 text-right font-medium ${textSecondaryColor} border-r border-b border-gray-200 dark:border-neutral-800`}>Cancel Rate</th>
                            <th className={`p-2 text-right font-medium ${isDarkMode ? 'text-emerald-500/80' : 'text-emerald-600/80'} border-b border-gray-200 dark:border-neutral-800`}>Digital</th>
                            <th className={`p-2 text-right font-medium ${textSecondaryColor} border-b border-gray-200 dark:border-neutral-800`}>COD</th>
                            <th className={`p-2 text-right font-medium text-rose-500/80 border-b border-gray-200 dark:border-neutral-800`}>OTC</th>
                            <th className={`p-2 text-right font-medium ${textSecondaryColor} border-b border-gray-200 dark:border-neutral-800`}>Bank</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
                          {/* Jawa Barat */}
                          <tr className="hover:bg-gray-50/50 dark:hover:bg-neutral-900/30 transition-colors group">
                            <td className={`sticky left-0 z-10 p-3 font-medium ${textColor} border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] group-hover:bg-gray-50 dark:group-hover:bg-neutral-900/50`}>Jawa Barat</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>5,247</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>Rp 277M</td>
                            <td className={`p-2 text-right font-mono font-bold ${textColor} border-r border-gray-200 dark:border-neutral-800`}>Rp 52.7k</td>
                            <td className={`p-2 text-right font-mono font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} border-r border-gray-200 dark:border-neutral-800`}>12.3%</td>
                            <td className={`p-2 text-right font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>26.2%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>57.8%</td>
                            <td className={`p-2 text-right font-mono text-rose-500`}>0.4%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>15.6%</td>
                          </tr>
                          {/* Banten */}
                          <tr className="hover:bg-gray-50/50 dark:hover:bg-neutral-900/30 transition-colors group">
                            <td className={`sticky left-0 z-10 p-3 font-medium ${textColor} border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] group-hover:bg-gray-50 dark:group-hover:bg-neutral-900/50`}>Banten</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>3,412</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>Rp 178M</td>
                            <td className={`p-2 text-right font-mono ${textColor} border-r border-gray-200 dark:border-neutral-800`}>Rp 52.1k</td>
                            <td className={`p-2 text-right font-mono font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} border-r border-gray-200 dark:border-neutral-800`}>12.3%</td>
                            <td className={`p-2 text-right font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>25.8%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>58.4%</td>
                            <td className={`p-2 text-right font-mono text-rose-500`}>0.3%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>15.5%</td>
                          </tr>
                          {/* DKI Jakarta */}
                          <tr className="hover:bg-gray-50/50 dark:hover:bg-neutral-900/30 transition-colors group">
                            <td className={`sticky left-0 z-10 p-3 font-medium ${textColor} border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] group-hover:bg-gray-50 dark:group-hover:bg-neutral-900/50`}>DKI Jakarta</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>2,584</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>Rp 135M</td>
                            <td className={`p-2 text-right font-mono ${textColor} border-r border-gray-200 dark:border-neutral-800`}>Rp 52.2k</td>
                            <td className={`p-2 text-right font-mono font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} border-r border-gray-200 dark:border-neutral-800`}>12.3%</td>
                            <td className={`p-2 text-right font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>28.1%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>55.2%</td>
                            <td className={`p-2 text-right font-mono text-rose-500`}>0.2%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>16.5%</td>
                          </tr>
                          {/* Jawa Tengah */}
                          <tr className="hover:bg-gray-50/50 dark:hover:bg-neutral-900/30 transition-colors group">
                            <td className={`sticky left-0 z-10 p-3 font-medium ${textColor} border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] group-hover:bg-gray-50 dark:group-hover:bg-neutral-900/50`}>Jawa Tengah</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>1,823</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>Rp 94M</td>
                            <td className={`p-2 text-right font-mono ${textColor} border-r border-gray-200 dark:border-neutral-800`}>Rp 51.5k</td>
                            <td className={`p-2 text-right font-mono font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} border-r border-gray-200 dark:border-neutral-800`}>12.4%</td>
                            <td className={`p-2 text-right font-mono ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>24.3%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>59.8%</td>
                            <td className={`p-2 text-right font-mono text-rose-500`}>0.5%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>15.4%</td>
                          </tr>
                          {/* Jawa Timur */}
                          <tr className="hover:bg-gray-50/50 dark:hover:bg-neutral-900/30 transition-colors group">
                            <td className={`sticky left-0 z-10 p-3 font-medium ${textColor} border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] group-hover:bg-gray-50 dark:group-hover:bg-neutral-900/50`}>Jawa Timur</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>1,645</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>Rp 85M</td>
                            <td className={`p-2 text-right font-mono ${textColor} border-r border-gray-200 dark:border-neutral-800`}>Rp 51.6k</td>
                            <td className={`p-2 text-right font-mono font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-600'} border-r border-gray-200 dark:border-neutral-800`}>12.4%</td>
                            <td className={`p-2 text-right font-mono ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>23.9%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>60.1%</td>
                            <td className={`p-2 text-right font-mono text-rose-500`}>0.4%</td>
                            <td className={`p-2 text-right font-mono ${textSecondaryColor}`}>15.6%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Analysis Footer */}
                  <div className={`pt-6 border-t ${isDarkMode ? 'border-neutral-800' : 'border-gray-100'}`}>
                    <div className="space-y-4">
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Analisis Regional dan Risiko Operasional</span>
                        <div className={`text-sm leading-relaxed ${textSecondaryColor} text-justify space-y-4`}>
                          <p>
                            Berdasarkan analisis Order Volume, AOV, Cancellation Rate, dan Payment Method Mix per provinsi, dapat disimpulkan bahwa kekuatan pasar utama berada pada klaster Pulau Jawa, khususnya Jawa Barat, Banten, dan DKI Jakarta. Ketiga wilayah ini bukan unggul karena nilai transaksi yang lebih tinggi, melainkan karena volume pesanan yang besar dengan karakter transaksi yang relatif homogen. AOV yang konsisten di seluruh provinsi inti menunjukkan bahwa perilaku belanja pelanggan serupa, sehingga pertumbuhan revenue di Jawa lebih ditentukan oleh kapasitas pemrosesan order dan kecepatan fulfillment dibandingkan diferensiasi produk atau harga berbasis wilayah.
                          </p>
                          <p>
                            Dari sisi risiko operasional, tingkat pembatalan yang relatif seragam di seluruh provinsi menegaskan bahwa faktor geografis bukan penyebab utama pembatalan pesanan. Risiko pembatalan lebih bersifat sistemik dan berkaitan erat dengan struktur pembayaran, khususnya dominasi metode COD yang mencapai lebih dari separuh transaksi di hampir semua wilayah. Hal ini mengindikasikan bahwa upaya penurunan cancel rate akan lebih efektif jika difokuskan pada kebijakan dan insentif metode pembayaran secara nasional, bukan dengan pendekatan regional atau pembatasan wilayah tertentu.
                          </p>
                          <p>
                            Secara strategis, konsentrasi pasar di Jawa memberikan keunggulan operasional jangka pendek karena memungkinkan optimalisasi logistik, penempatan gudang, dan pengelolaan inventori yang lebih efisien dengan dampak cepat terhadap biaya dan service level. Namun, konsentrasi ini juga menciptakan risiko ketergantungan pada satu klaster volume, bukan karena perbedaan karakter pasar, melainkan karena akumulasi permintaan di satu wilayah geografis. Oleh karena itu, Jawa perlu diposisikan sebagai backbone operasional utama, sementara wilayah di luar Jawa diperlakukan sebagai opsi pertumbuhan jangka menengah hingga panjang.
                          </p>
                          <p>
                            Kategori Lainnya yang menyumbang porsi revenue signifikan menunjukkan bahwa permintaan nasional sudah terbentuk, namun masih terfragmentasi. Dengan karakter AOV, cancel rate, dan payment mix yang relatif seragam, ekspansi ke luar Jawa sebaiknya dilakukan secara bertahap dengan pendekatan berbasis volume, dimulai dari provinsi yang mulai menunjukkan konsistensi permintaan. Pendekatan ini memungkinkan diversifikasi pendapatan tanpa mengorbankan efisiensi operasional yang telah dicapai di Jawa.
                          </p>
                          <p>
                            Secara keseluruhan, data mendukung kesimpulan bahwa prioritas strategis perusahaan saat ini adalah memperkuat efisiensi dan kualitas revenue di klaster Jawa melalui optimasi logistik dan pergeseran metode pembayaran ke kanal digital, sambil menyiapkan fondasi ekspansi nasional yang terukur dan berisiko rendah.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight C: Wholesale Products */}
                <div className={`p-6 sm:p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} shadow-sm`}>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {t.dataAnalystInsightCWholesaleTitle}
                    </h4>
                    <p className={`text-sm ${textSecondaryColor}`}>
                      {t.dataAnalystInsightCWholesaleFindings.split('.')[0]}.
                    </p>
                  </div>

                  {/* Unified Chart & Table Container */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8`}>
                    {/* Chart Side */}
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <AreaChart
                          data={[
                            { category: 'Celengan/Tray', qty: 53 },
                            { category: 'Botol/Gelas', qty: 45 },
                            { category: 'Mangkok/Piring', qty: 27 },
                            { category: 'Baskom/Spatula', qty: 25 }
                          ]}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorQty" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={isDarkMode ? "#818cf8" : "#6366f1"} stopOpacity={0.4} />
                              <stop offset="95%" stopColor={isDarkMode ? "#818cf8" : "#6366f1"} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} stroke={isDarkMode ? "#525252" : "#94a3b8"} />
                          <XAxis
                            dataKey="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: isDarkMode ? '#a3a3a3' : '#64748b' }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: isDarkMode ? '#a3a3a3' : '#64748b' }}
                            dx={-10}
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className={`p-4 rounded-xl shadow-lg border backdrop-blur-sm ${isDarkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-slate-100'}`}>
                                    <p className={`text-xs font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                                    <p className={`text-xl font-bold ${textColor} text-indigo-500`}>
                                      {payload[0].value} <span className="text-sm text-gray-400">units</span>
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="qty"
                            stroke={isDarkMode ? "#818cf8" : "#6366f1"}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorQty)"
                            activeDot={{ r: 6, strokeWidth: 0, fill: isDarkMode ? '#c7d2fe' : '#4f46e5' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Table Side */}
                    <div className="flex flex-col justify-center">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className={`border-b ${isDarkMode ? 'border-neutral-800' : 'border-gray-100'}`}>
                            <th className={`pb-2 font-medium ${textSecondaryColor}`}>Product Category</th>
                            <th className={`pb-2 text-right font-medium ${textSecondaryColor}`}>Avg Qty</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                          <tr className="group">
                            <td className={`py-3 ${textColor} font-medium`}>Celengan, Tray, Pisau</td>
                            <td className={`py-3 text-right font-medium ${textColor}`}>53</td>
                          </tr>
                          <tr className="group">
                            <td className={`py-3 ${textColor}`}>Botol/Gelas, Mangkok</td>
                            <td className={`py-3 text-right ${textSecondaryColor}`}>45</td>
                          </tr>
                          <tr className="group">
                            <td className={`py-3 ${textColor} opacity-80`}>Mangkok, Piring</td>
                            <td className={`py-3 text-right ${textSecondaryColor} opacity-80`}>27</td>
                          </tr>
                          <tr className="group">
                            <td className={`py-3 ${textColor} opacity-60`}>Baskom, Spatula</td>
                            <td className={`py-3 text-right ${textSecondaryColor} opacity-60`}>25</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Analysis Footer */}
                  <div className={`pt-6 border-t ${isDarkMode ? 'border-neutral-800' : 'border-gray-100'}`}>
                    <div className="space-y-4">
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t.analysis}</span>
                        <p className={`text-sm leading-relaxed ${textSecondaryColor} text-justify`}>
                          {t.dataAnalystInsightCWholesaleAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insight D: Financial Impact */}
                <div className={`p-6 sm:p-8 rounded-2xl ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} shadow-sm`}>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {t.dataAnalystInsightDFinancialTitle}
                    </h4>
                    <p className={`text-sm ${textSecondaryColor}`}>
                      {t.dataAnalystInsightDFinancialFindings.split('.')[0]}.
                    </p>
                  </div>

                  {/* Detailed Financial Table: Discount Impact Analysis */}
                  <div className="mb-8 overflow-hidden rounded-xl bg-gray-50 dark:bg-neutral-900/50">
                    <table className="w-full text-sm text-left">
                      <thead className="border-b border-gray-100 dark:border-neutral-800">
                        <tr>
                          <th className={`p-4 font-semibold ${textColor}`}>Performance Metric</th>
                          <th className={`p-4 text-right font-medium ${textSecondaryColor}`}>Non-Discount (Baseline)</th>
                          <th className={`p-4 text-right font-bold ${textColor}`}>With Discount (Promo)</th>
                          <th className={`p-4 text-right font-semibold ${textColor}`}>Correlation / Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                        {/* Row 1: AOV */}
                        <tr className="group hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors">
                          <td className={`p-4 font-medium ${textColor}`}>Avg. Order Value (Basket Size)</td>
                          <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>Rp 49,212</td>
                          <td className={`p-4 text-right font-mono font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Rp 276,528</td>
                          <td className={`p-4 text-right font-bold text-emerald-500`}>+461% Lift</td>
                        </tr>

                        {/* Row 2: Shipping Ratio */}
                        <tr className="group hover:bg-white dark:hover:bg-neutral-900 transition-colors">
                          <td className={`p-4 font-medium ${textColor}`}>Shipping Cost (%)</td>
                          <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>8.3% of Spend</td>
                          <td className={`p-4 text-right font-mono font-bold ${textColor}`}>7.4% of Spend</td>
                          <td className={`p-4 text-right text-xs ${textSecondaryColor}`}>More efficient (-0.9%)</td>
                        </tr>

                        {/* Row 3: Absolute Shipping */}
                        <tr className="group hover:bg-white dark:hover:bg-neutral-900 transition-colors">
                          <td className={`p-4 font-medium ${textColor}`}>Avg. Shipping Fee Paid</td>
                          <td className={`p-4 text-right font-mono ${textSecondaryColor}`}>Rp 4,084</td>
                          <td className={`p-4 text-right font-mono font-bold ${textColor}`}>Rp 20,452</td>
                          <td className={`p-4 text-right text-xs ${textSecondaryColor}`}>Volume driven increase</td>
                        </tr>

                        {/* Row 4: Sample Size */}
                        <tr>
                          <td className={`p-4 text-xs ${textSecondaryColor}`}>Sample Segment Size</td>
                          <td className={`p-4 text-right text-xs ${textSecondaryColor}`}>20,713 Trans (99.4%)</td>
                          <td className={`p-4 text-right text-xs ${textSecondaryColor}`}>135 Trans (0.6%)</td>
                          <td className={`p-4 text-right text-xs ${textSecondaryColor}`}>High growth potential</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Analysis Footer */}
                  <div className={`pt-6 border-t ${isDarkMode ? 'border-neutral-800' : 'border-gray-100'}`}>
                    <div className="space-y-4">
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t.analysis}</span>
                        <p className={`text-sm leading-relaxed ${textSecondaryColor} text-justify`}>
                          {t.dataAnalystInsightDFinancialAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section >

            {/* Business Recommendations */}
            < section className="mb-20 pb-32 pt-8 border-t border-gray-200 dark:border-gray-800" >
              <h3 className="text-sm sm:text-base font-bold mb-4 uppercase tracking-wider opacity-80">
                {t.dataAnalystBusinessRecommendationsTitle}
              </h3>
              <p className={`mb-8 text-justify text-sm sm:text-base leading-relaxed ${textSecondaryColor}`}>
                {t.dataAnalystRecommendationsIntro}
              </p>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className={`flex gap-4 text-sm sm:text-base leading-relaxed ${textSecondaryColor}`}>
                    <span className={`font-bold ${textColor} flex-shrink-0`}>{num}.</span>
                    <p className="text-justify">
                      {t[`dataAnalystRecommendation${num}` as keyof typeof t] as string}
                    </p>
                  </div>
                ))}
              </div>
            </section >

          </motion.div >
        </div >
      </div >
    </div >
  );
};
