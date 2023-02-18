import "./App.css";
import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import ListOfTasks from "./components/ListOfTasks";

function App() {
  //App state
  const [tasks, setTasks] = useState([]);

  //Update task
  const updateTasks = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  //delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  //Fetch data to server
  useEffect(() => {
    fetch(`http://localhost:9000/api/v0/tasks/`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="app--container">
      <div className="container">
        <AddTask updateTasks={updateTasks} />
        <ListOfTasks tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
