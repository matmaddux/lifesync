"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  function addTask() {
    if (!input.trim()) return;
    setTasks([input, ...tasks]);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-200">
        
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-gray-900">
            LifeSync
          </h1>
          <p className="text-sm text-gray-500">
            Capture and organize your life
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Capture anything..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
          />
          <button
            onClick={addTask}
            className="bg-black text-white px-4 rounded-xl hover:bg-gray-800 active:scale-95 transition"
          >
            +
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-5">

          {/* Inbox */}
          <div>
            <h2 className="text-xs uppercase tracking-wide text-gray-400 mb-2">
              Inbox
            </h2>

            {tasks.length === 0 && (
              <p className="text-gray-400 text-sm">No tasks yet</p>
            )}

            <ul className="space-y-2">
              {tasks.map((task, i) => (
                <li
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-sm hover:shadow-md transition"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Other Sections */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="bg-white border rounded-xl p-3 text-center shadow-sm">
              🔥 Top 3
            </div>
            <div className="bg-white border rounded-xl p-3 text-center shadow-sm">
              📋 Tasks
            </div>
            <div className="bg-white border rounded-xl p-3 text-center shadow-sm">
              📥 Inbox
            </div>
            <div className="bg-white border rounded-xl p-3 text-center shadow-sm">
              ✅ Completed
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}