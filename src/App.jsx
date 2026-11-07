
import React, { useState, useEffect } from "react";

import "./App.css";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [editId, setEditId] = useState(null);
  const [now, setNow] = useState(Date.now());

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  // Calculate deadline
  function getDeadline() {

    const h = Number(hour);
    const m = Number(minute);

    if (
      !date ||
      hour.trim() === "" ||
      minute.trim() === "" ||
      !Number.isInteger(h) ||
      !Number.isInteger(m) ||
      h < 1 || h > 12 ||
      m < 0 || m > 59
    ) {
      alert("Enter valid date and time");
      return null;
    }

    let convertedHour = h;

    if (ampm === "PM" && h !== 12) {
      convertedHour += 12;
    }

    if (ampm === "AM" && h === 12) {
      convertedHour = 0;
    }

    const [y, mo, d] = date.split("-").map(Number);

    const deadline = new Date(
      y, mo - 1, d, convertedHour, m
    );

    if (
      deadline.getFullYear() !== y ||
      deadline.getMonth() !== mo - 1 ||
      deadline.getDate() !== d
    ) {
      alert("Enter a valid date");
      return null;
    }

    return deadline.getTime();
  }

  // Automatic priority
  function getPriority(deadline) {

    const remaining = deadline - now;
    const hours = remaining / 3600000;

    if (remaining < 0) {
      return ["Overdue", "overdue"];
    }

    if (hours <= 1) {
      return ["Very High", "very-high"];
    }

    if (hours <= 6) {
      return ["High", "high"];
    }

    if (hours <= 24) {
      return ["Medium", "medium"];
    }

    return ["Low", "low"];
  }

  // Add or update task
  function handleSubmit(e) {

    e.preventDefault();

    if (!name.trim()) {
      alert("Enter task name");
      return;
    }

    const deadline = getDeadline();

    if (deadline === null) return;

    if (editId !== null) {

      setTasks(prev =>
        prev.map(task =>
          task.id === editId
            ? {
                ...task,
                name: name.trim(),
                deadline
              }
            : task
        )
      );

    } else {

      setTasks(prev => [
        ...prev,
        {
          id: Date.now().toString() +
              Math.random().toString(36).slice(2),
          name: name.trim(),
          deadline,
          completed: false
        }
      ]);

    }

    clearForm();
  }

  // Clear form
  function clearForm() {
    setName("");
    setDate("");
    setHour("");
    setMinute("");
    setAmpm("AM");
    setEditId(null);
  }

  // Edit task
  function editTask(task) {

    setName(task.name);

    const d = new Date(task.deadline);

    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    setDate(`${y}-${mo}-${day}`);

    const h = d.getHours();

    setHour(String(h % 12 || 12));
    setMinute(String(d.getMinutes()).padStart(2, "0"));
    setAmpm(h >= 12 ? "PM" : "AM");

    setEditId(task.id);
  }

  // Delete task
  function deleteTask(id) {

    if (window.confirm("Delete this task?")) {

      setTasks(prev =>
        prev.filter(task => task.id !== id)
      );

      if (editId === id) {
        clearForm();
      }
    }
  }

  // Complete task
  function completeTask(id) {

    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: true }
          : task
      )
    );
  }

  // Sort tasks by deadline
  const pendingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => a.deadline - b.deadline);

  const completedTasks = tasks.filter(
    task => task.completed
  );

  return (
    <div className="container">

      <h1>Task Management System</h1>

      <p className="subtitle">
        Manage your tasks smartly
      </p>

      <TaskForm
        name={name}
        setName={setName}
        date={date}
        setDate={setDate}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
        ampm={ampm}
        setAmpm={setAmpm}
        editId={editId}
        handleSubmit={handleSubmit}
        clearForm={clearForm}
      />

      <TaskList
        title="Pending Tasks"
        tasks={pendingTasks}
        getPriority={getPriority}
        editTask={editTask}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />

      <TaskList
        title="Completed Tasks"
        tasks={completedTasks}
        getPriority={getPriority}
        editTask={editTask}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />

    </div>
  );
}

export default App;
