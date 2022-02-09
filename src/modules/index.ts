import { combineReducers } from "@reduxjs/toolkit";
import counter from "./counter";

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
