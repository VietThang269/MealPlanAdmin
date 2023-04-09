import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { userSaga } from "./features/user/userSaga";
import { userSlice } from "./features/user/userSlice";
import { all } from "redux-saga/effects";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [saga],
});

function* rootSaga() {
  yield all([userSaga()]);
}

saga.run(rootSaga);
