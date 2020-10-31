import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("https://floating-springs-14668.herokuapp.com/api/v1/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`https://floating-springs-14668.herokuapp.com/api/v1/profile`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(
      `https://floating-springs-14668.herokuapp.com/api/v1/profile/handle/${handle}`
    )
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`https://floating-springs-14668.herokuapp.com/api/v1/profile/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
export const postCurrentProfile = (profileData, history) => dispatch => {
  axios
    .post(
      "https://floating-springs-14668.herokuapp.com/api/v1/profile",
      profileData
    )
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
export const clearCurrentUserProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can Not be undown!")) {
    axios
      .delete("https://floating-springs-14668.herokuapp.com/api/v1/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        }).catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        })
      );
  }
};
export const addEdu = (eduData, history) => dispatch => {
  axios
    .post(
      "https://floating-springs-14668.herokuapp.com/api/v1/profile/education",
      eduData
    )
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const addExp = (expData, history) => dispatch => {
  axios
    .post(
      "https://floating-springs-14668.herokuapp.com/api/v1/profile/experience",
      expData
    )
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteExp = id => dispatch => {
  axios
    .delete(
      `https://floating-springs-14668.herokuapp.com/api/v1/profile/experience/${id}`
    )
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteEdu = id => dispatch => {
  axios
    .delete(
      `https://floating-springs-14668.herokuapp.com/api/v1/profile/education/${id}`
    )
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
