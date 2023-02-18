import { FaTrash } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

export default function ListOfTasks({ tasks, deleteTask }) {
  const [taskId, setTaskId] = useState("");
  const [change, setChange] = useState(false);
  const [updateInput, setUpdateInput] = useState("");
  const initialRender = useRef(true);

  useEffect(() => {
    //Prohibit useEffect from running in the initial render
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fetch(`http://localhost:9000/api/v0/tasks/${taskId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          deleteTask(data._id);
        });
    }
  }, [taskId]);

  //Get task id and save as state variable
  const removeItem = (id) => {
    setTaskId(id);
  };

  //Update task item
  const onClickTaskItem = (value) => {
    setChange(!change);
    setUpdateInput(value);
  };

  //Update input form
  const onChangeInput = (e) => {
    setUpdateInput(e.target.value);
  };

  return (
    <div>
      <ul className="list--container">
        {tasks.map((task) => {
          return (
            <li
              className={`list--item ${
                task.isComplete ? "completed" : "not--completed"
              }`}
              key={task._id}
            >
              <div className="card--body__content">
                {!change ? (
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickTaskItem(task.taskName);
                    }}
                  >
                    {task.taskName}
                  </p>
                ) : (
                  <form>
                    <input
                      type="text"
                      value={updateInput}
                      onChange={onChangeInput}
                      className="update--input"
                    />
                  </form>
                )}
              </div>

              <div className="card--input__panel">
                <button
                  className=" btn--remove"
                  onClick={(e) => {
                    e.preventDefault();

                    removeItem(task._id);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
