import cookie from 'js-cookie';
import axios from "axios";
import { toast } from 'react-toastify'


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

// set in cookie
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        })
    }
}


// remove from cookie
export const removeCookie = (key) => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}


// get token from cookie
export const getCookie = (key) => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
}

// save in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}


// remove from localstorage
export const removeFromLocalStorage = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response)
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next();
}

export const updateUserCookie = (response, next) => {
    setLocalStorage('user', response.data.user)
    next();
}

// access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

export const isAdmin = () => {
    return isAuth() && isAuth().category.title === 'admin'
}


// signout
export const signout = (next) => {
    removeCookie('token')
    removeFromLocalStorage('user');
    next();
}

export const isEdit = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let editQuery = params.get('edit');
    return editQuery ? true : false;
}

export const isAdminArea = () => {
    let url = window.location.href;
    //get rid of the trailing / before doing a simple split on /
    var url_parts = url.replace(/\/\s*$/, '').split('/');
    //since we do not need example.com
    url_parts.shift();

    if (url_parts[2] == "admin") {
        return true
    } else {
        return false
    }

}

export const bigOrSmall = (width) => {
    if (width) {
        var isPercent = width.charAt(width.length - 1) === "%" ? true : false //   is it a percent
        var threshold = isPercent ? 50 : 500 // the value that it must be > to be classed as "big"
        const bigOrSmall = parseInt(width, 10) > threshold
    }
}

export const removeQuery = (queryName) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    params.delete(queryName)
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
};

export const getfileURL = (filename) => {
    return `http://aacafeblog.s3.amazonaws.com/Files/${filename}`
}

export const getImageURL = (filename) => {
    return `http://aacafeblog.s3.amazonaws.com/Images/${filename}`
}

export const isHomepageActive = (match) => {
    if (match.path === '/') {
        return true;
    } else {
        return false;
    }
}

export const isMessengerActive = (match) => {
    if (match.path === '/messenger') {
        return true;
    } else {
        return false;
    }
}

export const isFullscreen = (match) => {
    if (match.path === '/signin') {
        return true;
    } else {
        return false;
    }
}

export const isActive = (path, match) => {
    if (isHomepageActive(match)) {
        if (match.path === path) {
            return { color: '#39ff14' };
        } else {
            return { color: '#fdfdfb' };
        }
    } else {
        if (match.path === path) {
            return { color: '#39ff14' };
        } else {
            return { color: '#fdfdfb' };
        }
    }
}

export const getFieldsFromPrototype = (prototype, includeEditableArea = false) => {
    return prototype.filter((property) => {

        // delete any fields starting with M
        // delete slug, _id, v, editable area

        if (property == "mtitle" || property == "mdescription" ||
            property == "_id" || property == "__v"
            || property == "slug" || property == "createdAt" || property == "updatedAt") {
            return false
        }

        if (includeEditableArea == false && property == "editableArea") {
            return false
        }

        return true

    })
}

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    var d = new Date(str);
    return d.toISOString() === str;
}

export const toHumanString = (a) => {

    if (a != undefined && a.constructor === Array && a.length > 0) {
        return a.length == 1 ? a[0] : [a.slice(0, a.length - 1).join(", "), a[a.length - 1]].join(" and ")
    }
    else if (isIsoDate(a)) {
        return a.slice(0, 10);
    }
    else {
        return ""
    }

}

export const arrayToObject = (arr) => {
    var result = {};
    for (var i = 0; i < arr.length; i++) {
        result[arr[i].key] = arr[i].value;
    }
    return result
}

export const trunc = (string, n) => {
    return string.substr(0, n - 1) + (string.length > n ? '&hellip;' : '');
}


export const hasExtension = (imgExtension, fileName) => {
    const pattern = '(' + imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
}