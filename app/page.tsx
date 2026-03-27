"use client";
import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  priority: number;
  category: string;
  done: boolean;
  inbox: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  // LOAD from browser storage
  useEffect(() => {
    const saved = localStorage.getItem("lifesync-tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // SAVE to browser storage
  useEffect(() => {
    localStorage.setItem("lifesync-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input) return;
    const newTask: Task = {
      id: Date.now(),
      title: input,
      priority: 5,
      category: "Personal",
      done: false,
      inbox: true,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleDone = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const updatePriority = (id: number, value: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, priority: value, inbox: false } : t
    ));
  };

  const updateCategory = (id: number, category: string) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, category } : t
    ));
  };

  const moveToActive = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, inbox: false } : t
    ));
  };

  const activeTasks = tasks
    .filter(t => !t.done && !t.inbox)
    .sort((a, b) => a.priority - b.priority);

  const inboxTasks = tasks.filter(t => t.inbox && !t.done);

  const completedTasks = tasks.filter(t => t.done);

  const top3 = activeTasks.slice(0, 3);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">LifeSync</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Capture anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask} className="bg-black text-white px-3">
          +
        </button>
      </div>

      <h2 className="font-semibold mb-2">📥 Inbox</h2>
      {inboxTasks.map(task => (
        <div key={task.id} className="flex justify-between items-center mb-2">
          <span>{task.title}</span>
          <button
            onClick={() => moveToActive(task.id)}
            className="text-sm border px-2"
          >
            Process
          </button>
        </div>
      ))}

      <h2 className="font-semibold mt-4 mb-2">🔥 Top 3</h2>
      {top3.map(task => (
        <div key={task.id} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task.id)}
            />
            <span>{task.title}</span>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            value={task.priority}
            onChange={(e) => updatePriority(task.id, Number(e.target.value))}
            className="w-12 border"
          />
        </div>
      ))}

      <h2 className="font-semibold mt-4 mb-2">📋 Tasks</h2>
      {activeTasks.map(task => (
        <div key={task.id} className="mb-2 border p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              <span>{task.title}</span>
            </div>
            <input
              type="number"
              min="1"
              max="10"
              value={task.priority}
              onChange={(e) => updatePriority(task.id, Number(e.target.value))}
              className="w-12 border"
            />
          </div>

          <select
            value={task.category}
            onChange={(e) => updateCategory(task.id, e.target.value)}
            className="mt-1 border w-full"
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Health</option>
            <option>Admin</option>
          </select>
        </div>
      ))}

      <h2 className="font-semibold mt-4 mb-2">✅ Completed</h2>
      {completedTasks.map(task => (
        <div key={task.id} className="flex items-center gap-2 text-gray-500 line-through mb-1">
          <input
            type="checkbox"
            checked={true}
            onChange={() => toggleDone(task.id)}
          />
          <span>{task.title}</span>
        </div>
      ))}
    </div>
  );
}