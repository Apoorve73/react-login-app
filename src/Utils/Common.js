// Session Storage can be understood as a sesion cookie
// which expires as soon as the browser is closed
//but remains even afte rthe browser is refrshed

//returning the user data from the sessin storage

export const getUser = () => {
    const userStr = sessionStorage.getItem('user')
    if (userStr) return JSON.parse(userStr)
    else return null
}

//return the toke  from the session storage
export const getToken = () =>{
    return sessionStorage.getItem('token') || null
}

// remove the token and user from the session storage
export const removeUserSession = () =>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
}

//set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(user))
}


