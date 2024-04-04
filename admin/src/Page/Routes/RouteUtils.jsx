const showNavBar = (isLoggedIn) => {

    const viewCourse = /^\/dashboard\/coursesList\/viewCourse\/\d+$/;
    const viewInstructors = /^\/dashboard\/instructorsList\/viewInstructors\/\d+$/;

    return (
        isLoggedIn && (
            window.location.pathname === '' ||
            window.location.pathname === '/' ||
            window.location.pathname === '/login' ||
            window.location.pathname === '/dashboard' ||
            window.location.pathname === '/dashboard/' ||
            window.location.pathname === '/dashboard/userProfile' ||
            window.location.pathname === '/dashboard/addCourses' ||
            window.location.pathname === '/dashboard/addInstructors' ||
            window.location.pathname === '/dashboard/instructorsList' ||
            window.location.pathname === '/dashboard/coursesList' ||
            viewCourse.test(window.location.pathname) ||
            viewInstructors.test(window.location.pathname)
        )
    );
}

export { showNavBar }