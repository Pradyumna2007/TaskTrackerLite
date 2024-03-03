import Task from "./Task";
import style from "./Style.module.css";
import { useSelector } from "react-redux";

function Tasks() {
  let tasks = useSelector((state) => state.task.taskList);
  const filterStatus = useSelector((state) => state.task.filterStatus);
  if (filterStatus.length > 0) {
    let taskList = tasks;
    tasks = taskList.filter((task) => {
      return filterStatus.includes(task.status);
    });
  }
  return (
    <div className={style.tasksOuterContainer}>
    <div className={style.tasksContainer}>
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
    </div>
  );
}

export default Tasks;
