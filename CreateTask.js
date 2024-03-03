import React, { useState, useRef } from "react";
import style from "./Style.module.css";
import Modal from "./Modal";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { taskActions } from "../redux/TaskSlice";
import { NotificationManager } from "react-notifications";

const Form = function ({ closeForm }) {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const dateRef = useRef(null);
  const priorityRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = {
      taskID: null,
      title: titleRef.current.value,
      description: descRef.current.value,
      dueDate: dateRef.current.value,
      priority: priorityRef.current.value,
      status: "To Be Started",
    };

    async function submitData() {
      try {
        const response = await fetch("http://localhost:5000/insertTasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const resBody = await response.json();
        if (response.status === 200) {
          dispatch(
            taskActions.addTask({ ...formData, taskID: resBody.taskID })
          );
          NotificationManager.success("Task Added", "Success", 1000);
        } else {
          NotificationManager.error("Task Addition Failed", "Error", 1000);
        }
      } catch (e) {
        console.error(e.message);
      }

      closeForm();
    }
    submitData();
  };
  return (
    <Modal>
      <form className={style.formContainer} onSubmit={handleSubmitForm}>
        <label htmlFor="">Title</label>
        <input type="text" ref={titleRef} required />
        <label htmlFor="">Description</label>
        <textarea ref={descRef} required />

        <label htmlFor="">Due date</label>
        <input type="date" ref={dateRef} placeholder="Due Date" required />

        <label htmlFor="">Priority</label>
        <select ref={priorityRef}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Submit</button>
        <button onClick={closeForm}>Cancel</button>
      </form>
    </Modal>
  );
};
function CreateTask() {
  const [openForm, setOpenForm] = useState(false);
  const modalEle = document.getElementById("modal");

  return (
    <div>
      <button
        className={style.addTaskButton}
        onClick={() => {
          setOpenForm(!openForm);
        }}
      >
        Add Task
      </button>
      {openForm &&
        createPortal(
          <Form
            closeForm={() => {
              setOpenForm(!openForm);
            }}
          />,
          modalEle
        )}
    </div>
  );
}

export default CreateTask;
