import { useState, useEffect, useRef } from "react";

export default function AddTask({ updateTasks }) {
  const [taskInput, setTaskInput] = useState("");
  const [payload, setPayload] = useState({});
  const initialRender = useRef(true);

  //create new task
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fetch(`http://localhost:9000/api/v0/tasks`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => updateTasks(data));
    }
  }, [payload]);

  //Change input event listener
  const onTaskChange = (e) => {
    setTaskInput(e.target.value);
  };

  //Click input event listener
  const onSendBtn = (e) => {
    //prevent default behaviour
    e.preventDefault();

    // input object
    const input = {
      taskName: taskInput,
    };

    // set input to payload state
    setPayload(input);
  };

  return (
    <div>
      <form className="form--panel">
        <input
          type="text"
          className="form--input"
          onChange={onTaskChange}
          value={taskInput}
        />

        <button className="btn btn--add" onClick={onSendBtn}>
          Add Task
        </button>
      </form>
    </div>
  );
}
