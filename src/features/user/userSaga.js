import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { apiGet } from "../../utils/https/request";

function* handleSignIn(payload) {
  try {
    console.log("saga", payload);
  } catch (error) {}
}

export function* userSaga() {
  yield takeLatest("user/requestSignIn", handleSignIn);
}
