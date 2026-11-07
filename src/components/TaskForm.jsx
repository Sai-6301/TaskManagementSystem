
import React from "react";

function TaskForm({
  name, setName,
  date, setDate,
  hour, setHour,
  minute, setMinute,
  ampm, setAmpm,
  editId, handleSubmit, clearForm
}) {
  return (
    <form onSubmit={handleSubmit}>

      <input
        className="task-input"
        type="text"
        placeholder="Enter task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="date-time">

        <div className="field">
          <label>Deadline Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Hour (1-12)</label>
          <input
            type="number"
            placeholder="HH"
            min="1"
            max="12"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Minute (00-59)</label>
          <input
            type="number"
            placeholder="MM"
            min="0"
            max="59"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>AM / PM</label>
          <select
            value={ampm}
            onChange={(e) => setAmpm(e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

      </div>

      <button type="submit" className="add-btn">
        {editId !== null ? "Update Task" : "Add Task"}
      </button>

      {editId !== null && (
        <button
          type="button"
          className="cancel-btn"
          onClick={clearForm}
        >
          Cancel
        </button>
      )}

    </form>
  );
}

export default TaskForm;
