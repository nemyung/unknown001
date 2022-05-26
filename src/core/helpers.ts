import SETTING from "./constants";

function getToken() {
  return window.localStorage.getItem(SETTING.accessTokenKey);
}

function setToken() {
  window.localStorage.setItem(SETTING.accessTokenKey, SETTING.fakeAccessToken);
  return getToken();
}

function removeToken() {
  window.localStorage.removeItem(SETTING.accessTokenKey);
}

export { getToken, setToken, removeToken };
