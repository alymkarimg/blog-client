import cookie from 'js-cookie';
import { createHistory } from 'history'

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
    if(isHomepageActive(match)){
        if (match.path === path) {
            return { color: '#39ff14'};
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