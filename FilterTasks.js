import React from "react";
import style from "./Style.module.css";
import { useDispatch } from "react-redux";
import { taskActions } from "../redux/TaskSlice";

function FilterTasks() {
  const dispatch = useDispatch();
  return (
    <div className={style.filterTaskOuterContainer}>
      <div
        className={style.filterTaskContainer}
        onChange={(e) => {
          dispatch(
            taskActions.updateFilterStatus([e.target.value, e.target.checked])
          );
        }}
      >
        <div>
          <input type="checkbox" id="0" name="0" value="To Be Started" />
          <label for="0">To be started</label>
        </div>
        <div>
          <input type="checkbox" id="0" name="0" value="In Progress" />
          <label for="0">In progress</label>
        </div>
        <div>
          <input type="checkbox" id="0" name="0" value="Completed" />
          <label for="0">Completed</label>
        </div>
      </div>
    </div>
  );
}

export default FilterTasks;
