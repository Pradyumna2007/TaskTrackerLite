import React, { useRef } from "react";
import style from "./Style.module.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Divider } from "@react-md/divider";
import Modal from "./Modal";

import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../redux/TaskSlice";

import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function TaskView({ task, onClose }) {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);
  const statusRef = useRef("");

  const SELECTED_VALUE = task.status;
  const options = [
    { value: "0", label: "To be Started" },
    { value: "1", label: "In Progress" },
    { value: "2", label: "Completed" },
  ];
  const updateTasksInStore = () => {
    const updatedTasks = taskList.filter((t) => {
      return t.taskID !== task.taskID;
    });
    dispatch(taskActions.refreshTask(updatedTasks));
  };
  const onDeleteHandler = () => {
    (async function deleteTask() {
      try {
        const response = await fetch(
          `http://localhost:5000/deleteTask/${task.taskID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task.id),
          }
        );
        if (response.status === 200) {
          updateTasksInStore();
          NotificationManager.success("Task Deleted", "Success", 1000);
        } else {
          NotificationManager.error("Deletion Failed", "Error", 1000);
        }
      } catch (e) {
        console.error(e.message);
      }
      onClose();
    })();
  };

  async function updateStatus() {
    try {
      const response = await fetch(
        `http://localhost:5000/updateTask/${task.taskID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(statusRef.current.value),
        }
      );
      console.log(response);

      if (response.status === 200) {
        // dispatch(
        //   taskActions.addTask({ ...formData, taskID: resBody.taskID })
        // );
        NotificationManager.success("Task Updated", "Success", 1000);
      } else {
        NotificationManager.error("Task Updation Failed", "Error", 1000);
      }
    } catch (e) {
      console.error(e.message);
    }
    onClose();
  }
  const onSaveHandler = (e) => {
    console.log(task.status);
    console.log(statusRef.current.value);
    if (task.status !== statusRef.current.value) {
      updateStatus();
    }
  };
  return (
    <Modal>
      <div className={style.taskViewContainer}>
        <div className={style.taskViewDescriptionContainer}>
          <div className={style.taskViewtitleContainer}>{task.title}</div>
          <div>{task.description}</div>
        </div>
        <Divider className={style.taskViewDivider} />
        <div className={style.taskViewDetailsOuterContainer}>
          <div className={style.taskViewDetailsContainer}>
            <div className={style.taskViewStatusContainer}>
              <span className={style.taskViewDetailsTitle}>Status</span>
              <select
                ref={statusRef}
                className={style.taskViewStatusDropdownContainer}
              >
                <option value="To Be Started">To Be Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <div className={style.taskViewDetailsTitle}>Due Date</div>
              <div>{task.dueDate}</div>
            </div>
            <div>
              <div className={style.taskViewDetailsTitle}>Priotrity</div>
              <div>{task.priority}</div>
            </div>
          </div>
          <div className={style.taskViewDetailsButtonContainer}>
            <button
              onClick={onSaveHandler}
              className={style.taskViewSaveButton}
            >
              Save
            </button>
            <button
              onClick={onDeleteHandler}
              className={style.taskViewSaveButton}
            >
              Delete
            </button>
            <button className={style.taskViewCloseButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TaskView;
