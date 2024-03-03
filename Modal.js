import React from "react";
import style from "./Style.module.css";
import TaskView from "./TaskView";

function Modal({ children }) {
  return (
    <div className={style.modalContainer}>
      {children}
      {/* <TaskView task={task} onClose={onClose} /> */}
    </div>
  );
}

export default Modal;
