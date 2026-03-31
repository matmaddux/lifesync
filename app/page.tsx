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

  // Toggle complete
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

        // remove from top
        if (t.top) return { ...t, top: false };

        // limit to 3
        if (currentTopCount >= 3) {
          alert("You can only have 3 Top tasks");
          return t;
        }

        return { ...t, top: true };
      })
    );
  };

  // Split tasks
  const topTasks = tasks.filter((t) => t.top && !t.completed);
  const otherTasks = tasks.filter((t) => !t.top && !t.completed);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-4">
        <h1 className="text-xl font-bold mb-3">LifeSync</h1>

        {/* Input */}
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

        {/* TOP 3 */}
        {topTasks.length > 0 && (
          <>
            <h2 className="text-sm font-bold text-gray-500 mb-1">
              🔥 Top 3
            </h2>

            <div className="space-y-2 mb-4">
              {topTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2 rounded-lg border bg-yellow-100"
                >
                  <div
                    onClick={() => toggleTask(task.id)}
                    className="cursor-pointer font-semibold"
                  >
                    {task.text}
                  </div>

                  <div className="flex gap-3 mt-1">
                    <button
                      onClick={() => toggleTop(task.id)}
                      className="text-xs text-blue-600 font-bold"
                    >
                      Remove Top
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* OTHER TASKS */}
        <h2 className="text-sm font-bold text-gray-500 mb-1">
          📝 Tasks
        </h2>

        <div className="space-y-2">
          {otherTasks.map((task) => (
            <div
              key={task.id}
              className={`p-2 rounded-lg border ${
                task.completed ? "bg-green-100 line-through" : ""
              }`}
            >
              <div
                onClick={() => toggleTask(task.id)}
                className="cursor-pointer"
              >
                {task.text}
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  onClick={() => toggleTop(task.id)}
                  className="text-xs text-gray-500"
                >
                  Top
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}