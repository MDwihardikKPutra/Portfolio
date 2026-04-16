import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend, AreaChart, Area, LabelList } from 'recharts';
import type { Translations } from "../../translations";

interface DataAnalystProjectPageProps {
  t: Translations;
  isDarkMode: boolean;
}

export const DataAnalystProjectPage = ({ t }: DataAnalystProjectPageProps) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="section-container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-[10px] uppercase font-medium tracking-[0.2em] text-black hover:text-accent transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t.backToProjects}</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-black/10 pb-16"
        >
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 leading-tight">
            {t.dataAnalystProjectTitle}
          </h1>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase font-medium tracking-widest text-black">
             <div className="space-y-2">
                <span className="block">{t.dataAnalystProjectTools}</span>
                <span className="block">{t.dataSource}: Kaggle Dataset</span>
             </div>
             <div className="w-12 h-px bg-black hidden md:block" />
             <div className="max-w-md opacity-70">
                {t.dataAnalystExecutiveSummary.slice(0, 150)}...
             </div>
          </div>
        </motion.header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar Info */}
          <aside className="lg:col-span-4 space-y-12">
            <section>
              <h3 className="text-[10px] uppercase tracking-widest font-medium mb-6 border-b border-black pb-2 inline-block">Objectives</h3>
              <ul className="space-y-4 text-xs text-black leading-relaxed">
                <li className="flex gap-3 font-medium"><span>01</span> {t.dataAnalystObjective1}</li>
                <li className="flex gap-3 font-medium"><span>02</span> {t.dataAnalystObjective2}</li>
                <li className="flex gap-3 font-medium"><span>03</span> {t.dataAnalystObjective3}</li>
                <li className="flex gap-3 font-medium"><span>04</span> {t.dataAnalystObjective4}</li>
              </ul>
            </section>

            <section className="bg-surface p-6">
               <h3 className="text-[10px] uppercase tracking-widest font-medium mb-4">Core Recommendation</h3>
               <p className="text-[11px] leading-loose text-black italic">
                 {t.dataAnalystRecommendation1}
               </p>
            </section>
          </aside>

          {/* Main Visualizations */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Visual 1: Payment Risk */}
            <section>
               <h4 className="text-xl font-medium tracking-tight mb-8 uppercase flex items-center gap-3"><span className="w-6 h-px bg-black"/> 01. {t.dataAnalystInsightARiskTitle}</h4>
               <div className="w-full h-[350px] mb-8 bg-surface p-6 rounded-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { method: 'Indomaret', rate: 48.8 },
                        { method: 'Alfamart', rate: 47.2 },
                        { method: 'Online Pay', rate: 18.5 },
                        { method: 'COD', rate: 13.4 },
                        { method: 'ShopeePay', rate: 8.7 },
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e5e5" />
                      <XAxis type="number" hide />
                      <YAxis 
                        type="category" 
                        dataKey="method" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fontWeight: 500, fill: '#000000' }} 
                        width={80}
                      />
                      <Tooltip />
                      <Bar dataKey="rate" fill="#000000" radius={[0, 4, 4, 0]} barSize={24}>
                        <LabelList dataKey="rate" position="right" formatter={(v: any) => `${v}%`} style={{ fontSize: 9, fontWeight: 500, fill: '#000000' }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <p className="text-xs leading-loose text-black text-justify p-6 border-l border-black bg-surface/30">
                  {t.dataAnalystInsightARiskAnalysis}
               </p>
            </section>

            {/* Visual 2: Market Dominance */}
            <section>
               <h4 className="text-xl font-medium tracking-tight mb-8 uppercase flex items-center gap-3"><span className="w-6 h-px bg-black"/> 02. {t.dataAnalystInsightBMarketTitle}</h4>
               <div className="grid md:grid-cols-2 gap-8 items-center bg-black text-white p-10 rounded-sm">
                  <div className="h-[250px]">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Jawa Barat', value: 26.2 },
                          { name: 'Banten', value: 16.8 },
                          { name: 'Jakarta', value: 12.8 },
                          { name: 'Others', value: 44.2 },
                        ]}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        <Bar fill="#ffffff" dataKey="value" /> 
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-medium text-white/40 block mb-4">Regional Share</span>
                    <div className="space-y-4 font-medium">
                       <div className="flex justify-between border-b border-white/10 pb-2">
                         <span className="text-xs uppercase">Jawa Barat</span>
                         <span className="text-xs">26.2%</span>
                       </div>
                       <div className="flex justify-between border-b border-white/10 pb-2 text-white/60">
                         <span className="text-xs uppercase">Banten</span>
                         <span className="text-xs">16.8%</span>
                       </div>
                       <div className="flex justify-between text-white/40">
                         <span className="text-xs uppercase">Jakarta</span>
                         <span className="text-xs">12.8%</span>
                       </div>
                    </div>
                  </div>
               </div>
               <div className="mt-8 text-xs leading-loose text-black text-justify">
                  {t.dataAnalystInsightBMarketAnalysis.split('\n\n')[0]}
               </div>
            </section>

          </div>
        </div>

        {/* Recommendations Grid */}
        <section className="mt-40 pt-20 border-t border-black">
           <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-black block mb-12">Actionable Recommendations</span>
           <div className="grid md:grid-cols-2 gap-px bg-black/10 border border-black/10">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="bg-white p-10 hover:bg-surface transition-colors">
                   <span className="text-xl font-medium mb-6 block uppercase tracking-tighter">Plan 0{num}</span>
                   <p className="text-xs leading-relaxed text-black/80 font-normal">
                     {t[`dataAnalystRecommendation${num}` as keyof typeof t] as string}
                   </p>
                </div>
              ))}
           </div>
        </section>

      </div>
    </div>
  );
};
