
import React from "react";
import TaskItem from "./TaskItem";

function TaskList({
  title,
  tasks,
  getPriority,
  editTask,
  deleteTask,
  completeTask
}) {
  return (
    <div>

      <h2>{title} ({tasks.length})</h2>

      {tasks.length === 0 && (
        <p className="empty">No tasks available</p>
      )}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          getPriority={getPriority}
          editTask={editTask}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}

    </div>
  );
}

export default TaskList;
