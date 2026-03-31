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

  // Load tasks
  useEffect(() => {
    const saved = localStorage.getItem("lifesync-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("lifesync-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
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

  // Toggle complete (ONLY via button now)
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Toggle Top 3
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
          <h1 className="text-2xl font-semibold">LifeSync</h1>
          <p className="text-sm text-gray-500">
            Capture → Focus → Execute
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs your attention?"
            className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={addTask}
            className="bg-black text-white px-4 rounded-xl active:scale-95 transition"
          >
            +
          </button>
        </div>

        {/* TOP 3 */}
        {topTasks.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs uppercase text-gray-400 mb-2">
              Top 3
            </h2>

            <div className="space-y-2">
              {topTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 flex items-center justify-between"
                >
                  <div className="text-sm font-medium">
                    {task.text}
                  </div>

                  <div className="flex gap-3 text-xs">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="text-green-600"
                    >
                      Done
                    </button>

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
          <h2 className="text-xs uppercase text-gray-400 mb-2">
            Tasks
          </h2>

          <div className="space-y-1">
            {otherTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white border border-gray-200 rounded-xl px-3 py-2 flex items-center justify-between ${
                  task.completed ? "opacity-40 line-through" : ""
                }`}
              >
                <div className="text-sm">{task.text}</div>

                <div className="flex gap-3 text-xs">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-green-600"
                  >
                    Done
                  </button>

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
  );
}