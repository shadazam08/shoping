import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AppContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Login = () => {
    const { serverPort, serverIP, isLoggedIn, login } = useAuth();
    const history = useNavigate();
    const [error, setError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [valid, setValid] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isLoggedIn) {
            history('/dashboard')
        }
    }, [isLoggedIn, history])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError('');
    };

    const loginSubmit = async (event) => {
        event.preventDefault();
        if (formData.email.trim() === '' || formData.password.trim() === '') {
            setError('Please fill in all fields.');
            setTimeout(() => {
                setError('');
            }, 2000)
            return;
        }
        try {
            const response = await fetch(`http://${serverIP}:${serverPort}/authRoute/studentLogin`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const parseRes = await response.json();
            if (parseRes.message === 'Logged in successfully') {
                // API call successful
                const { studentToken, studentId } = parseRes;
                localStorage.setItem('studentToken', studentToken);
                localStorage.setItem('studentId', studentId);
                console.log('Login successful');
                login(studentToken);
                setTimeout(() => {
                    setValid(true);
                }, 2000);
            } else {
                if (parseRes.message === 'Invalid Email ID') {
                    setLoginError('Email Id Invalid');
                } else if (parseRes.message === 'Invalid Password') {
                    setLoginError('Password Invalid');
                } else if (parseRes.message === 'User is Disable') {
                    setLoginError('User Is Disabled');
                }
                console.error('Login failed. Status:', response.status);
                const errorMessage = await response.text();
                console.error('Error message:', errorMessage);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }

    };

    return (
        <>
            {valid && <Navigate to={'/dashboard'} />}
            <div className="form-container sign-in-container">
                <form onSubmit={loginSubmit}>
                    {error && <Alert variant='danger' className='alertMessage'>{error} </Alert>}
                    {loginError && <Alert variant='danger' className='alertMessage'>{loginError}</Alert>}
                    <h3 className='mb-1'>Sign in</h3>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Link to={'#'}>Forgot your password?</Link>
                    {/* <a ></a> */}
                    <button>Sign In</button>
                </form>
            </div>
        </>
    )
}

export default Login