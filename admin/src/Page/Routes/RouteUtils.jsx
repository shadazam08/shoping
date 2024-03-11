const showNavBar = (isLoggedIn) => {
    return (
        isLoggedIn && (
            window.location.pathname === '' ||
            window.location.pathname === '/' ||
            window.location.pathname === '/login' ||
            window.location.pathname === '/dashboard' ||
            window.location.pathname === '/dashboard/' ||
            window.location.pathname === '/dashboard/userProfile' ||
            window.location.pathname === '/dashboard/createUrl'
        )
    )
}

export { showNavBar }