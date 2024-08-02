import axios from "axios";

export const ALL_USERS = "ALL_USERS";
export const USER_ID = "USER_ID";
export const LOGIN = "LOGIN";
export const USER_CREATE = "USER_CREATE";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER ";
export const LIMP_STATE = "LIMP_STATE";
export const LIMP_DETAIL = "LIMP_DETAIL";
export const LIMP_ERROR = "LIMP_ERROR";
export const FILTER_NAME = "FILTER_NAME"
export const FILTER_GENDER = "FILTER_GENDER"

export const GetUsersAll = () => {
  return function (dispatch, getState) {
    try {
      const state = getState();
      const token = state.token;

      if (token === "") {
        throw new Error("Token is required");
      }

      axios
        .get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => dispatch({ type: ALL_USERS, payload: data.data }))
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
};
export const GetUserId = (id) => {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const token = state.token;

      if (token === "") {
        throw new Error("Token is required");
      }
      const response = await axios.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: USER_ID, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const UpdateUser = (id, data) => {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const token = state.token;

      if (token === "") {
        throw new Error("Token is required");
      }

      let obj = {
        name: data.name,
        email: data.email,
        gender: data.gender.toUpperCase(),
        password: data.password,
        image: data.image,
        age: data.age,
      };
      const response = await axios.put(
        `/users/${id}`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: UPDATE_USER,
        payload: { data: response.data, error: ["Actualizado"] },
      });
    } catch (error) {
      dispatch({ type: UPDATE_USER, payload: { error: ["Error"] } });
      console.log(error.message);
    }
  };
};

export const DeleteUser = (id) => {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const token = state.token;

      if (token === "") {
        throw new Error("Token is required");
      }

      const response = await axios.delete(
        `/users/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: DELETE_USER, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const GetUserLogin = (data) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/login`, data);
      dispatch({
        type: LOGIN,
        payload: {
          userData: response.data.data,
          token: response.data.tokenSession,
          error: ["Entrando"],
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN,
        payload: {
          error: ["Error"],
        },
      });
      console.error("Not login:", error);
    }
  };
};

export const GetUserCreate = (data) => {
  return async function (dispatch) {
    try {
      let obj = {
        name: data.name,
        email: data.email,
        gender: data.gender.toUpperCase(),
        password: data.password,
        image: data.image,
        age: data.age,
      };
      const response = await axios.post(`/create`, obj);
      dispatch({
        type: USER_CREATE,
        payload: {
          resp: response.data,
          error: ["Creado"],
        },
      });
    } catch (error) {
      dispatch({
        type: USER_CREATE,
        payload: {
          error: ["Error"],
        },
      });
      console.error("Not create:", error);
    }
  };
};

export const GetFilterByName = (data) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/filters?order=${data}`
      );
      dispatch({
        type: FILTER_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error("Filter Failed");
    }
  };
};

export const GetFilterByGender = (data) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `/filters/sex/${data}`
      );
      dispatch({
        type: FILTER_GENDER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Filter Failed");
    }
  };
};
export const LimpState = () => {
  return { type: LIMP_STATE };
};

export const LimpDetail = () => {
  return { type: LIMP_DETAIL };
};

export const LimpError = () => {
  return { type: LIMP_ERROR };
};
