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

  // Load saved tasks
  useEffect(() => {
    const saved = localStorage.getItem("lifesync-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("lifesync-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks([
      { id: Date.now().toString(), text: input, completed: false, top: false },
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

  const toggleTop = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, top !t.top }
      )
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-4">
        <h1 className="text-xl font-bold mb-3">LifeSync</h1>

        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Capture anything..."
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            onClick={addTask}
            className="bg-black text-white px-3 rounded-lg active:scale-90 transition"
          >
            +
          </button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-2 rounded-lg border cursor-pointer ${
                task.completed ? "bg-green-100 line-through" : ""
              }`}
            >
              {task.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}