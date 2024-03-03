import React, { useEffect } from "react";
import "./App.css";
import Tasks from "./components/Tasks";
import FilterTasks from "./components/FilterTasks";
import CreateTask from "./components/CreateTask";
import { useDispatch } from "react-redux";
import { taskActions } from "./redux/TaskSlice";
import { NotificationContainer } from "react-notifications";

function App() {
  const dispatch = useDispatch();
  async function getData() {
    try {
      const tasksData = await fetch("http://localhost:5000/getTasks");
      const data = await tasksData.json();

      const taskList = data ?? [];
      dispatch(taskActions.refreshTask(taskList));
    } catch (e) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NotificationContainer />
      <header className="headerContainer">
        <div className="logoContainer">Task Tracker</div>
        <CreateTask />
      </header>
      <div className="homeContainer">
        <FilterTasks />
        <Tasks />
      </div>
    </>
  );
}

export default App;
