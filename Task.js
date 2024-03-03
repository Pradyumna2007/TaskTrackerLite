import style from "./Style.module.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import TaskView from "./TaskView";
const Task = ({ task }) => {
  const modalEle = document.getElementById("modal");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)} className={style.taskContainer}>
        <span className={style.titleContainer}>{task.title}</span>
        <span className={style.statusContainer}>{task.status}</span>
      </div>
      {showModal &&
        createPortal(
          <TaskView
            task={task}
            onClose={() => {
              setShowModal(false);
            }}
          />,
          modalEle
        )}
    </>
  );
};

export default Task;
