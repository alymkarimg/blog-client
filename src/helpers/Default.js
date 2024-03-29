/* eslint-disable no-extend-native */
import cookie from "js-cookie";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get token from cookie
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// save in localstorage
export const setLocalStorage = (key, value) => {
  try {
    if (window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {}
};

// get from localstorage
export const getLocalStorage = (key, initialValue) => {
  try {
    if (window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    }
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
};

// remove from localstorage
export const removeFromLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

export const updateUserCookie = (response, next) => {
  setLocalStorage("user", response.data.user);
  next();
};

// access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const isAdmin = () => {
  return isAuth() && isAuth().category.title === "admin";
};

// signout
export const signout = (next) => {
  removeCookie("token");
  removeFromLocalStorage("user");
  next();
};

export const isEdit = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let editQuery = params.get("edit");
  return editQuery ? true : false;
};

export const isAdminArea = () => {
  let url = window.location.href;
  //get rid of the trailing / before doing a simple split on /
  var url_parts = url.replace(/\/\s*$/, "").split("/");
  //since we do not need example.com
  url_parts.shift();

  if (url_parts[2] === "admin") {
    return true;
  } else {
    return false;
  }
};

export const removeQuery = (queryName) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  params.delete(queryName);
  window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
};

export const getfileURL = (filename) => {
  return `http://aacafeblog.s3.amazonaws.com/Files/${filename}`;
};

export const getImageURL = (filename) => {
  return `http://aacafeblog.s3.amazonaws.com/Images/${filename}`;
};

export const isHomepageActive = (match) => {
  if (match.path === "/") {
    return true;
  } else {
    return false;
  }
};

export const isMessengerActive = (match) => {
  if (match.path === "/messenger") {
    return true;
  } else {
    return false;
  }
};

export const isFullscreen = (match) => {
  if (match.path === "/signin") {
    return true;
  } else {
    return false;
  }
};

export const isActive = (path, match) => {
  if (isHomepageActive(match)) {
    if (match.path === path) {
      return { color: "#39ff14" };
    } else {
      return { color: "#fdfdfb" };
    }
  } else {
    if (match.path === path) {
      return { color: "#39ff14" };
    } else {
      return { color: "#fdfdfb" };
    }
  }
};

export const getFieldsFromPrototype = (
  prototype,
  includeEditableArea = false,
  includeCreatedAt = false
) => {
  return prototype.filter((property) => {
    // delete any fields starting with M
    // delete slug, _id, v, editable area
    if (
      property === "_id" ||
      property === "__v" ||
      property === "slug" ||
      property === "createdAt" ||
      property === "updatedAt" ||
      property === "resetPasswordLink" ||
      property === "hashed_password" ||
      property === "password" ||
      property === "description"
    ) {
      return false;
    }

    if (includeEditableArea === false && property === "editableArea") {
      return false;
    }

    return true;
  });
};

function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str);
  return d.toISOString() === str;
}

export const toHumanString = (a) => {
  if (a !== undefined && a.constructor === Array && a.length > 0) {
    return a.length === 1
      ? a[0]
      : [a.slice(0, a.length - 1).join(", "), a[a.length - 1]].join(" and ");
  } else if (isIsoDate(a)) {
    return a.slice(0, 10);
  } else {
    return "";
  }
};

export const arrayToObject = (arr) => {
  var result = {};
  for (var i = 0; i < arr.length; i++) {
    result[arr[i].key] = arr[i].value;
  }
  return result;
};

export const trunc = (string, n) => {
  return (
    string &&
    string.substr(0, n - 1) + (string.length > n && n != 0 ? "&hellip;" : "")
  );
};

export const hasExtension = (imgExtension, fileName) => {
  const pattern = "(" + imgExtension.join("|").replace(/\./g, "\\.") + ")$";
  return new RegExp(pattern, "i").test(fileName);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(number);
};


export const isEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}

export const  isPostCode = (postcode) => {
  postcode = postcode.replace(/\s/g, "");
  var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  return regex.test(postcode);
}