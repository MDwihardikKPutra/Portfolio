export const JournalFlowchart = () => {
  return (
    <div className="w-full my-4 border border-neutral-200 p-4 bg-neutral-50/50 font-mono text-[10px] sm:text-[11px]">
      <p className="text-[11px] font-mono text-neutral-400 mb-4 tracking-tight">System State Machine & Execution Flow Diagram:</p>

      {/* Boot Sequence */}
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <div className="bg-neutral-900 text-white px-3 py-1.5 rounded-full text-[11px]">BOOT</div>
        <span className="text-neutral-300 text-base">──▶</span>
        <div className="border border-neutral-300 bg-white px-3 py-1.5 rounded text-neutral-700">Load NVS <span className="text-neutral-400 text-[10px]">/ restore state</span></div>
        <span className="text-neutral-300 text-base">──▶</span>
        <div className="border border-neutral-300 bg-white px-3 py-1.5 rounded text-neutral-700">WiFi <span className="text-neutral-400 text-[10px]">/ WL_CONNECTED</span></div>
        <span className="text-neutral-300 text-base">──▶</span>
        <div className="border border-neutral-300 bg-white px-3 py-1.5 rounded text-neutral-700">NTP Sync <span className="text-neutral-400 text-[10px]">/ GMT+7</span></div>
        <span className="text-neutral-300 text-base">──▶</span>
        <div className="bg-neutral-900 text-white px-3 py-1.5 rounded-full text-[11px]">READY</div>
      </div>

      {/* Down arrow */}
      <div className="flex items-center gap-1 my-2 ml-2">
        <span className="text-neutral-300 text-lg">↓</span>
      </div>

      {/* Main Loop */}
      <div className="border border-dashed border-neutral-300 rounded p-4 relative">
        <span className="absolute -top-2.5 left-4 bg-neutral-50 px-2 text-[10px] text-neutral-400">MAIN LOOP ∞</span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">

          {/* Branch 1: Auth Buttons */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-neutral-400 mb-1">① Auth Buttons</div>
            <div className="border border-neutral-300 bg-white px-2 py-1.5 rounded w-full text-center text-neutral-700">Check GPIO 25 / 32 / 33</div>
            <span className="text-neutral-300">↓</span>
            <div className="border border-neutral-400 bg-neutral-100 px-2 py-1.5 w-full text-center text-neutral-700 italic">◇ Granted?</div>
            <div className="flex gap-2 w-full mt-1">
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-neutral-400 text-[10px]">yes ↓</span>
                <div className="border border-green-200 bg-green-50 px-2 py-1 rounded w-full text-center text-[10px] text-green-700">Servo 90°</div>
                <span className="text-neutral-300 text-[10px]">↓</span>
                <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">LCD Green</div>
                <span className="text-neutral-300 text-[10px]">↓</span>
                <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">Send Log</div>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-neutral-400 text-[10px]">no ↓</span>
                <div className="border border-red-200 bg-red-50 px-2 py-1 rounded w-full text-center text-[10px] text-red-600">Servo 0°</div>
                <span className="text-neutral-300 text-[10px]">↓</span>
                <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">LCD Red</div>
                <span className="text-neutral-300 text-[10px]">↓</span>
                <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">Send Log</div>
              </div>
            </div>
          </div>

          {/* Branch 2: Key Switches */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-neutral-400 mb-1">② Key Switches</div>
            <div className="border border-neutral-300 bg-white px-2 py-1.5 rounded w-full text-center text-neutral-700">Poll SW1–4 (GPIO 14/5/12/15)</div>
            <span className="text-neutral-300">↓</span>
            <div className="border border-neutral-400 bg-neutral-100 px-2 py-1.5 w-full text-center text-neutral-700 italic">◇ State changed?</div>
            <span className="text-neutral-400 text-[10px]">yes ↓</span>
            <div className="border border-yellow-200 bg-yellow-50 px-2 py-1 rounded w-full text-center text-[10px] text-yellow-700">Update NVS Flash</div>
            <span className="text-neutral-300 text-[10px]">↓</span>
            <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">LCD Yellow</div>
            <span className="text-neutral-300 text-[10px]">↓</span>
            <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">Send Log (item/user)</div>
            <span className="text-neutral-400 text-[10px] mt-1">no → skip</span>
          </div>

          {/* Branch 3: Door Sensor */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-neutral-400 mb-1">③ Door Sensor</div>
            <div className="border border-neutral-300 bg-white px-2 py-1.5 rounded w-full text-center text-neutral-700">Read GPIO 27</div>
            <span className="text-neutral-300">↓</span>
            <div className="border border-neutral-400 bg-neutral-100 px-2 py-1.5 w-full text-center text-neutral-700 italic">◇ Door closed?</div>
            <span className="text-neutral-400 text-[10px]">yes ↓</span>
            <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">Servo 0°</div>
            <span className="text-neutral-300 text-[10px]">↓</span>
            <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">LCD White</div>
            <span className="text-neutral-300 text-[10px]">↓</span>
            <div className="border border-neutral-300 bg-white px-2 py-1 rounded w-full text-center text-[10px] text-neutral-700">servoTerbuka = false</div>
            <span className="text-neutral-400 text-[10px] mt-1">no → skip</span>
          </div>

        </div>

        <div className="mt-4 pt-3 border-t border-dashed border-neutral-200 text-center text-[10px] text-neutral-400">
          ↺ all three branches execute on every <code className="text-neutral-500">loop()</code> cycle simultaneously
        </div>
      </div>
    </div>
  );
};
