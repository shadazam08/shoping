const showNavBar = (isLoggedIn) => {

    // const viewCourse = /^\/dashboard\/coursesList\/viewCourse\/\d+$/;
    // const viewInstructors = /^\/dashboard\/instructorsList\/viewInstructors\/\d+$/;


    return (
        isLoggedIn && (
            window.location.pathname === '' ||
            window.location.pathname === '/' ||
            window.location.pathname === '/login' ||
            window.location.pathname === '/dashboard' ||
            window.location.pathname === '/dashboard/' ||
            window.location.pathname === '/dashboard/profile'
        )
    )
}

export { showNavBar }