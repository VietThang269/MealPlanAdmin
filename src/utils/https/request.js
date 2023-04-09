import axios from "axios";

export const baseDomain = "https://dummyjson.com/";

export async function apiPost(url, payload, header) {
  try {
    url = baseDomain + url;
    const { data } = await axios.post(url, payload, {
      headers: header,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error: ", error.message);
    } else {
      console.log("error: ", "undefined");
    }
    const response = {
      data: undefined,
      error: 1,
      message: "system_error",
    };
    return response;
  }
}

export async function apiGet(url, header) {
  try {
    url = baseDomain + url;
    const { data } = await axios.get(url, {
      headers: header,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error: ", error.message);
    } else {
      console.log("error: ", "undefined");
    }
    const response = {
      data: undefined,
      error: 1,
      message: "system_error",
    };
    return response;
  }
}
