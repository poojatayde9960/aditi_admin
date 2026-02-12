import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const funnelData = [
  { label: "Visitors", value: 12453, percent: "100%" },
  { label: "Product Views", value: 5453, percent: "72%" },
  { label: "Add to cart", value: 2000, percent: "37%" },
  { label: "Checkout", value: 1200, percent: "19%" },
  { label: "Purchase", value: 854, percent: "14%" },
];

const revenueData = [
  { name: "Jan", value: 68000 },
  { name: "Feb", value: 54000 },
  { name: "Mar", value: 63000 },
  { name: "Apr", value: 71000 },
  { name: "May", value: 52000 },
  { name: "Jun", value: 31000 },
];



const ConversionAndFuneral = () => {
  return (
    <div className="grid grid-cols-1 font-manrope   lg:grid-cols-2 gap-8 mt-10 bg-[#020523] text-white">
      {/* <ShoppingBag /> */}
      {/* LEFT CARD — Conversion Funnel */}
      <div
        className="
          bg-[#0B1135] 
          rounded-3xl 
          border border-white/40
          p-6 
          shadow-[0_0_30px_rgba(0,0,0,0.3)]
        "
      >
        <h2 className="text-3xl  font-manrope ">Conversion Funnel</h2>
        <p className="text-gray-400 mb-6 font-manrope text-xs">Customer journey breakdown</p>

        <div className="space-y-6">
          {funnelData.map((item, idx) => (
            <div key={idx}>
              {/* Label + Values */}
              {/* <div className="flex justify-between text-gray-300 mb-2">
                <span>{item.label}</span>
                <span className="text-[#FFFFFF]  font-manrope  ml-96">{item.value.toLocaleString()}</span>
                <span className="text-cyan-400  font-manrope ">{item.percent}</span>
              </div> */}



              <div className="flex items-center text-gray-300 mb-2 w-full">

                {/* LEFT — LABEL */}
                <span className="text-sm w-1/2">
                  {item.label}
                </span>

                {/* RIGHT — VALUE + PERCENT */}
                <div className="flex items-center justify-end gap-6 w-1/2">
                  <span className="text-sm text-white mr-8">
                    {item.value.toLocaleString()}
                  </span>

                  <span className="text-sm text-cyan-400">
                    {item.percent}
                  </span>
                </div>

              </div>


              {/* Gradient Bar */}
              <div className="w-full bg-[#0A0F2E] rounded-xl h-10 flex items-center">
                <div
                  className="
                    h-10 
                    rounded-xl 
                    bg-gradient-to-r 
                    from-[#00c8ff] 
                    via-[#00eaff] 
                    to-white 
                  "
                  style={{
                    width:
                      item.percent === "100%" ? "100%" : item.percent,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CARD — Revenue Over Time */}
      <div
        className="
          bg-[#0B1135] 
          rounded-xl 
          border border-white/40
          p-6 
          shadow-[0_0_30px_rgba(0,0,0,0.3)]
        "
      >
        <h2 className="text-3xl font-manrope ">Revenue Over Time</h2>
        <p className="text-gray-400 text-xs mb-6">Monthly revenue and order count</p>

        <div style={{ width: "100%", height: 450 }}>
          <ResponsiveContainer>
            <BarChart data={revenueData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#ccc" }} />
              <YAxis tick={{ fill: "#ccc" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1135",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontFamily: "Manrope",
                }}
                labelStyle={{ color: "white" }}
              />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                // radius={[20, 20, 0, 0]}
                barSize={60}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00eaff" />
                  <stop offset="100%" stopColor="#00c8ff" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ConversionAndFuneral;
