import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, AreaChart, Area } from 'recharts';
import type { Translations } from "../../translations";

interface DataAnalystProjectPageProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const DataAnalystProjectPage = ({
  t,
  isDarkMode,
  language,
}: DataAnalystProjectPageProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";
  const textSecondaryColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const borderColor = isDarkMode ? "border-[#1a1a1a]" : "border-[#e5e5e5]";
  const hoverBg = isDarkMode ? "hover:bg-[#1a1a1a]" : "hover:bg-[#f5f5f5]";
  const headingColor = isDarkMode ? "text-gray-200" : "text-gray-800"; // Keeping distinct heading color for sections if needed, or align with textColor

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

              <div className="space-y-16">
                {/* Insight A */}
                <div className="border-b border-gray-100 dark:border-gray-800 pb-12 last:border-0">
                  <h4 className="text-lg sm:text-xl font-medium mb-6 text-gray-900 dark:text-white">
                    {t.dataAnalystInsightARiskTitle}
                  </h4>

                  {/* Payment Risk - Bar Chart + Table Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Table on Left */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-blue-50 dark:bg-blue-900/20">
                            <th className={`text-left p-3 font-semibold ${textColor} border-b-2 border-blue-200 dark:border-blue-800`}>Payment Method</th>
                            <th className={`text-right p-3 font-semibold ${textColor} border-b-2 border-blue-200 dark:border-blue-800`}>Orders</th>
                            <th className={`text-right p-3 font-semibold ${textColor} border-b-2 border-blue-200 dark:border-blue-800`}>Cancellation</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor}`}>Indomaret/i.Saku</td>
                            <td className={`p-3 text-right ${textSecondaryColor}`}>43</td>
                            <td className="p-3 text-right font-bold text-red-600 dark:text-red-400">48.8%</td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor}`}>Alfamart</td>
                            <td className={`p-3 text-right ${textSecondaryColor}`}>36</td>
                            <td className="p-3 text-right font-bold text-red-600 dark:text-red-400">47.2%</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor}`}>Online Pay</td>
                            <td className={`p-3 text-right ${textSecondaryColor}`}>3,170</td>
                            <td className="p-3 text-right font-bold text-yellow-600 dark:text-yellow-400">18.6%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Chart on Right */}
                    <div>
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                          data={[
                            { method: 'Indomaret', rate: 48.8 },
                            { method: 'Alfamart', rate: 47.2 },
                            { method: 'Online Pay', rate: 18.6 },
                            { method: 'Others', rate: 33.3 }
                          ]}
                          margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="method" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip
                            contentStyle={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', border: '1px solid #e5e5e5', fontSize: 12 }}
                            formatter={(value: any) => `${value}%`}
                          />
                          <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                            <Cell fill="#ef4444" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#10b981" />
                            <Cell fill="#3b82f6" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className={`space-y-6 text-sm sm:text-base leading-relaxed ${textSecondaryColor}`}>
                    <div>
                      <span className={`font-semibold block mb-2 ${textColor}`}>{t.findings}</span>
                      <p className="text-justify">{t.dataAnalystInsightARiskFindings.replace("Findings:", "").replace("Temuan:", "").trim()}</p>
                    </div>
                    <div>
                      <span className={`font-semibold block mb-2 ${textColor}`}>{t.analysis}</span>
                      <p className="text-justify">{t.dataAnalystInsightARiskAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}</p>
                    </div>
                  </div>
                </div>

                {/* Insight B */}
                <div className="border-b border-gray-100 dark:border-gray-800 pb-12 last:border-0">
                  <h4 className="text-lg sm:text-xl font-medium mb-6 text-gray-900 dark:text-white">
                    {t.dataAnalystInsightBMarketTitle}
                  </h4>

                  {/* Regional Market - Pie Chart + Table Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Table on Left */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-purple-50 dark:bg-purple-900/20">
                            <th className={`text-left p-3 font-semibold ${textColor} border-b-2 border-purple-200 dark:border-purple-800`}>Province</th>
                            <th className={`text-right p-3 font-semibold ${textColor} border-b-2 border-purple-200 dark:border-purple-800`}>Revenue</th>
                            <th className={`text-right p-3 font-semibold ${textColor} border-b-2 border-purple-200 dark:border-purple-800`}>Share</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor} font-medium`}>Jawa Barat</td>
                            <td className={`p-3 text-right ${textSecondaryColor}`}>Rp 277M</td>
                            <td className="p-3 text-right font-bold text-purple-600 dark:text-purple-400">26.2%</td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor}`}>Banten</td>
                            <td className={`p-3 text-right ${textSecondaryColor}`}>Rp 178M</td>
                            <td className="p-3 text-right ${textSecondaryColor}">16.8%</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor}`}>DKI Jakarta</td>
                            <td className={`p-3 text-right ${textSecondaryColor}`}>Rp 135M</td>
                            <td className="p-3 text-right ${textSecondaryColor}">12.8%</td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-900/20">
                            <td className={`p-3 ${textSecondaryColor}`}>Others</td>
                            <td className={`p-3 text-right ${textSecondaryColor}`}>Rp 470M</td>
                            <td className="p-3 text-right ${textSecondaryColor}">44.2%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Pie Chart on Right */}
                    <div>
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Jawa Barat', value: 26.2 },
                              { name: 'Banten', value: 16.8 },
                              { name: 'Jakarta', value: 12.8 },
                              { name: 'Others', value: 44.2 }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name}: ${entry.value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#a78bfa" />
                            <Cell fill="#c4b5fd" />
                            <Cell fill="#ddd6fe" />
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', fontSize: 12 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className={`space-y-6 text-sm sm:text-base leading-relaxed ${textSecondaryColor}`}>
                    <div>
                      <span className={`font-semibold block mb-2 ${textColor}`}>{t.findings}</span>
                      <p className="text-justify">{t.dataAnalystInsightBMarketFindings.replace("Findings:", "").replace("Temuan:", "").trim()}</p>
                    </div>
                    <div>
                      <span className={`font-semibold block mb-2 ${textColor}`}>{t.analysis}</span>
                      <p className="text-justify">{t.dataAnalystInsightBMarketAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}</p>
                    </div>
                  </div>
                </div>

                {/* Insight C */}
                <div className="border-b border-gray-100 dark:border-gray-800 pb-12 last:border-0">
                  <h4 className="text-lg sm:text-xl font-medium mb-6 text-gray-900 dark:text-white">
                    {t.dataAnalystInsightCWholesaleTitle}
                  </h4>

                  {/* Wholesale Products - Area Chart + Table Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Table on Left */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-pink-50 dark:bg-pink-900/20">
                            <th className={`text-left p-3 font-semibold ${textColor} border-b-2 border-pink-200 dark:border-pink-800`}>Product Category</th>
                            <th className={`text-right p-3 font-semibold ${textColor} border-b-2 border-pink-200 dark:border-pink-800`}>Avg Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor}`}>Celengan, Tray, Pisau</td>
                            <td className="p-3 text-right font-bold text-pink-600 dark:text-pink-400">53</td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor}`}>Botol/Gelas, Mangkok</td>
                            <td className="p-3 text-right ${textSecondaryColor}">45</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-gray-800">
                            <td className={`p-3 ${textSecondaryColor}`}>Mangkok, Piring</td>
                            <td className="p-3 text-right ${textSecondaryColor}">27</td>
                          </tr>
                          <tr className="bg-gray-50 dark:bg-gray-900/20">
                            <td className={`p-3 ${textSecondaryColor}`}>Baskom, Spatula</td>
                            <td className="p-3 text-right ${textSecondaryColor}">25</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Area Chart on Right */}
                    <div>
                      <ResponsiveContainer width="100%" height={280}>
                        <AreaChart
                          data={[
                            { category: 'Cat 1', qty: 53 },
                            { category: 'Cat 2', qty: 45 },
                            { category: 'Cat 3', qty: 27 },
                            { category: 'Cat 4', qty: 25 }
                          ]}
                          margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip
                            contentStyle={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', fontSize: 12 }}
                            formatter={(value: any) => [`${value} units`, 'Avg Qty']}
                          />
                          <Area type="monotone" dataKey="qty" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className={`space-y-6 text-sm sm:text-base leading-relaxed ${textSecondaryColor}`}>
                    <div>
                      <span className={`font-semibold block mb-2 ${textColor}`}>{t.findings}</span>
                      <p className="text-justify">{t.dataAnalystInsightCWholesaleFindings.replace("Findings:", "").replace("Temuan:", "").trim()}</p>
                    </div>
                    <div>
                      <span className={`font-semibold block mb-2 ${textColor}`}>{t.analysis}</span>
                      <p className="text-justify">{t.dataAnalystInsightCWholesaleAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}</p>
                    </div>
                  </div>
                </div>

                {/* Insight D */}
                <div className="pb-4">
                  <h4 className="text-lg sm:text-xl font-medium mb-6 text-gray-900 dark:text-white">
                    {t.dataAnalystInsightDFinancialTitle}
                  </h4>

                  {/* Financial Impact Table */}
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-amber-50 dark:bg-amber-900/20">
                          <th className={`text-left p-3 font-semibold ${textColor} border-b-2 border-amber-200 dark:border-amber-800`}>Metric</th>
                          <th className={`text-right p-3 font-semibold ${textColor} border-b-2 border-amber-200 dark:border-amber-800`}>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className={`p-3 ${textSecondaryColor}`}>Total Revenue</td>
                          <td className={`p-3 text-right font-medium ${textColor}`}>Rp 1,056,651,631</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-800">
                          <td className={`p-3 ${textSecondaryColor}`}>Total Shipping Paid</td>
                          <td className={`p-3 text-right font-medium ${textColor}`}>Rp 87,352,926</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className={`p-3 ${textSecondaryColor}`}>Average Shipping Cost</td>
                          <td className={`p-3 text-right font-medium ${textColor}`}>Rp 4,190</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-900/20">
                          <td className={`p-3 ${textSecondaryColor} font-medium`}>Shipping % of Expenditure</td>
                          <td className="p-3 text-right font-bold text-amber-600 dark:text-amber-400">8.27%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`space-y-6 text-sm sm:text-base leading-relaxed ${textSecondaryColor}`}>
                    <div>
                      <span className={`font-semibold block mb-2 ${textColor}`}>{t.findings}</span>
                      <p className="text-justify">{t.dataAnalystInsightDFinancialFindings.replace("Findings:", "").replace("Temuan:", "").trim()}</p>
                    </div>
                    <div>
                      <span className={`font-semibold block mb-2 ${textColor}`}>{t.analysis}</span>
                      <p className="text-justify">{t.dataAnalystInsightDFinancialAnalysis.replace("Analysis:", "").replace("Analisis:", "").trim()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Business Recommendations */}
            <section className="mb-20 pb-32 pt-8 border-t border-gray-200 dark:border-gray-800">
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
            </section>

          </motion.div>
        </div>
      </div>
    </div>
  );
};
