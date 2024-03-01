import React from 'react'
import HomePage from '../pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'
import UserAuth from '../pages/userAuth/UserAuth'
import Header from '../pages/header/Header'

const Rought = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<UserAuth />} />
            </Routes>
        </>
    )
}

export default Rought
