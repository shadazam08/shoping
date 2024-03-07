import { Navigate } from "react-router-dom"

const showHeaders = (isLoggedIn) => {

    return (
        !isLoggedIn && (
            window.location.pathname === '/login' ||
            window.location.pathname === '/register' ||
            window.location.pathname === '' ||
            window.location.pathname === '/'
        )
    )

}
const showLogin = (isAdminLogin) => {
    console.log("window location", window.location.pathname)
    // return true;
    return (
        isAdminLogin ? (
            window.location.pathname === "/dashboard" ||
            window.location.pathname === '/dashboard/userProfile'

        ) : (
            <Navigate to={'/login'} />
        )
    )
}
const showNavBar = (isLoggedIn) => {
    console.log("window location", window.location.pathname)
    return (
        isLoggedIn && (
            // window.location.pathname === '/' ||
            window.location.pathname === '/dashboard' ||
            window.location.pathname === '/dashboard/' ||
            window.location.pathname === '/dashboard/userProfile'
        )
    )
}

export { showNavBar, showHeaders, showLogin }