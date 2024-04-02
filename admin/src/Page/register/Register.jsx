import React, { useState } from 'react';
import './Register.scss'
import { useAuth } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const { serverPort, serverIP } = useAuth()
    const [errorMsg, setErrorMsg] = useState(false);
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: '',
        password1: '',
        role: ''
    });

    const handleInputChange = (event) => {
        /* event.persist(); NO LONGER USED IN v.17*/
        event.preventDefault();

        const { name, value } = event.target;

        // Reset error message when typing in password fields
        if (name === 'password' || name === 'password1') {
            setErrorMsg(false);
        }


        setValues((values) => ({
            ...values,
            [name]: value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.firstName && values.lastName && values.email && values.password && values.role) {
            if (values.password !== values.password1) {
                setErrorMsg(true);
                return; // Stop form submission if passwords don't match
            }

            try {
                const response = await fetch(`http://${serverIP}:${serverPort}/authRoute/newAdminAcount`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const parseRes = await response.json();
                if (parseRes.message === 'Account Create successfully') {
                    // API call successful
                    console.log('Registration successful');
                    // Reset form values
                    setTimeout(() => {
                        setValid(true);
                    }, 2000);
                } else {
                    // Handle error response from the API
                    console.error('Registration failed');
                }
            } catch (error) {
                console.error('error: ', error);
            }
        }
        setSubmitted(true);
    };
    return (
        <div className='containe-forms'>
            {valid && <Navigate to="/login" />}
            <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    {!valid && (
                        <input
                            className="form-field"
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleInputChange}
                        />
                    )}

                    {submitted && !values.firstName && (
                        <span id="fullName-error">Please enter a First Name</span>
                    )}
                    {!valid && (
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleInputChange}
                        />
                    )}

                    {submitted && !values.lastName && (
                        <span id="fullName-error">Please enter a Last Name</span>
                    )}
                    {!valid && (
                        <input
                            className="form-field"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                        />
                    )}

                    {submitted && !values.email && (
                        <span id="email-error">Please enter an email address</span>
                    )}
                    {!valid && (
                        <input
                            className="form-field"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                        />
                    )}

                    {submitted && !values.password && (
                        <span id="email-error">Please enter a password</span>
                    )}
                    {!valid && (
                        <input
                            className="form-field"
                            type="password"
                            placeholder="Comfrim Password"
                            name="password1"
                            value={values.password1}
                            onChange={handleInputChange}
                        />
                    )}
                    {errorMsg && (
                        <span id="fullName-error">Passwords do not match</span>
                    )}

                    {submitted && !values.password && (
                        <span id="email-error">Please enter a password</span>
                    )}
                    {!valid && (
                        <select
                            className="form-field"
                            type="role"
                            name="role"
                            value={values.role}
                            onChange={handleInputChange}
                        >
                            <option value={''}>Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="superAdmin">Super Admin</option>
                        </select>
                    )}

                    {submitted && !values.role && (
                        <span id="email-error">Please Select a role</span>
                    )}
                    {!valid && (
                        <button className="form-field" type="submit">
                            Register
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Register