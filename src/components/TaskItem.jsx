
import React from "react";

function TaskItem({
  task,
  getPriority,
  editTask,
  deleteTask,
  completeTask
}) {
  const [priority, color] = getPriority(task.deadline);

  return (
    <div className="task-card">

      <h3>{task.name}</h3>

      <p>
        Deadline: {new Date(task.deadline).toLocaleString()}
      </p>

      <span className={`priority ${color}`}>
        {priority} Priority
      </span>

      <div className="actions">

        {!task.completed && (
          <button
            className="complete-btn"
            onClick={() => completeTask(task.id)}
          >
            Complete
          </button>
        )}

        {!task.completed && (
          <button
            className="edit-btn"
            onClick={() => editTask(task)}
          >
            Edit
          </button>
        )}

        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskItem;
