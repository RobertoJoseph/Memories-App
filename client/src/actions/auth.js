import { AUTH } from "../constants/actions";
import * as api from "../api/index";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const res = await api.signin(formData);
    dispatch({ type: AUTH, data: res.data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const res = await api.signup(formData);
    console.log(res);
    dispatch({ type: AUTH, data: res.data });
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};
