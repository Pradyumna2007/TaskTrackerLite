import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "taskSlice",
  initialState: {
    taskList: [],
    filterStatus: [],
  },
  reducers: {
    refreshTask(state, actions) {
      state.taskList = actions.payload;
    },
    addTask(state, action) {
      state.taskList = [...state.taskList, action.payload];
    },
    updateFilterStatus(state, action) {
      const isChecked = action.payload[1];
      const status = action.payload[0];
      if (isChecked) {
        state.filterStatus.push(status);
      } else {
        state.filterStatus = state.filterStatus.filter((s) => s !== status);
      }
    },
  },
});

export const taskActions = slice.actions;
export default slice.reducer;
