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
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          LifeSync
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Capture anything..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={addTask}
            className="bg-black text-white px-4 rounded-lg hover:bg-gray-800"
          >
            +
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-4">

          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-2">📥 Inbox</h2>
            {tasks.length === 0 && (
              <p className="text-gray-400 text-sm">No tasks yet</p>
            )}
            <ul className="space-y-2">
              {tasks.map((task, i) => (
                <li
                  key={i}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">🔥 Top 3</h2>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">📋 Tasks</h2>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">✅ Completed</h2>
          </div>

        </div>
      </div>
    </main>
  );
}