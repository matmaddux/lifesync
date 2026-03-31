"use client";

import { useState, useEffect } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  top: boolean;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("lifesync-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("lifesync-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks([
      {
        id: Date.now().toString(),
        text: input,
        completed: false,
        top: false,
      },
      ...tasks,
    ]);
    setInput("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTop = (id: string) => {
    const currentTopCount = tasks.filter(
      (t) => t.top && !t.completed
    ).length;

    setTasks(
      tasks.map((t) => {
        if (t.id !== id) return t;

        if (t.top) return { ...t, top: false };

        if (currentTopCount >= 3) {
          alert("Only 3 Top tasks allowed");
          return t;
        }

        return { ...t, top: true };
      })
    );
  };

  const topTasks = tasks.filter((t) => t.top && !t.completed);
  const otherTasks = tasks.filter((t) => !t.top && !t.completed);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          LifeSync
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Capture anything..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={addTask}
            className="bg-black text-white px-4 rounded-xl active:scale-90 transition"
          >
            +
          </button>
        </div>

        {/* TOP 3 */}
        {topTasks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs uppercase tracking-wide text-gray-400 mb-2">
              Top 3
            </h2>

            <div className="space-y-3">
              {topTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 shadow-sm"
                >
                  <div
                    onClick={() => toggleTask(task.id)}
                    className="font-medium text-gray-900 cursor-pointer"
                  >
                    {task.text}
                  </div>

                  <div className="flex gap-4 mt-2 text-xs">
                    <button
                      onClick={() => toggleTop(task.id)}
                      className="text-blue-600"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TASKS */}
        <div>
          <h2 className="text-xs uppercase tracking-wide text-gray-400 mb-2">
            Tasks
          </h2>

          <div className="space-y-2">
            {otherTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white border rounded-xl p-3 shadow-sm ${
                  task.completed ? "opacity-50 line-through" : ""
                }`}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="cursor-pointer text-gray-800"
                >
                  {task.text}
                </div>

                <div className="flex gap-4 mt-2 text-xs">
                  <button
                    onClick={() => toggleTop(task.id)}
                    className="text-gray-500"
                  >
                    Top
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}