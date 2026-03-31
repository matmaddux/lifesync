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
  <div className="min-h-screen bg-neutral-100 flex justify-center px-4 pt-10">
    <div className="w-full max-w-md">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">LifeSync</h1>
        <p className="text-sm text-gray-500">Capture → Focus → Execute</p>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs your attention?"
          className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={addTask}
          className="bg-black text-white px-5 rounded-2xl shadow active:scale-95 transition"
        >
          +
        </button>
      </div>

      {/* TOP 3 */}
      {topTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">
            Top 3 Priorities
          </h2>

          <div className="space-y-3">
            {topTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md"
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="text-lg font-medium cursor-pointer"
                >
                  {task.text}
                </div>

                <div className="flex gap-4 mt-3 text-xs">
                  <button
                    onClick={() => toggleTop(task.id)}
                    className="text-gray-500"
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
        <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">
          Everything Else
        </h2>

        <div className="space-y-2">
          {otherTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white border border-gray-200 rounded-2xl p-3 shadow-sm transition ${
                task.completed ? "opacity-40 line-through" : ""
              }`}
            >
              <div
                onClick={() => toggleTask(task.id)}
                className="cursor-pointer"
              >
                {task.text}
              </div>

              <div className="flex gap-4 mt-2 text-xs">
                <button
                  onClick={() => toggleTop(task.id)}
                  className="text-gray-400"
                >
                  Top
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400"
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
)}