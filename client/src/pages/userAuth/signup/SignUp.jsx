import React, { useState } from 'react'
import { useAuth } from '../../../context/AppContext';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
    const { serverIP, serverPort } = useAuth();
    const [errorMsg, setErrorMsg] = useState(false);
    const [valid, setValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'password' || name === 'password1') {
            setErrorMsg(false);
        }
        setValues((values) => ({
            ...values,
            [name]: value
        }));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (values.name && values.email && values.password) {
            if (values.password !== values.cpassword) {
                setErrorMsg(true);
                return; // Stop form submission if passwords don't match
            }
            try {
                const response = await fetch(`http://${serverIP}:${serverPort}/authRoute/newStudentLogin`, {
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
        <>
            {valid && <Navigate to={'/'} />}
            <div className="form-container sign-up-container">
                <form onSubmit={handleOnSubmit}>
                    <h3>Create Account</h3>
                    {!valid && (
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                    )}
                    {submitted && !values.name && (
                        <span id="fullName-error">Please enter a Name</span>
                    )}

                    {!valid && (
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    )}
                    {submitted && !values.email && (
                        <span id="fullName-error">Please enter an Email Address</span>
                    )}
                    {!valid && (
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    )}
                    {submitted && !values.password && (
                        <span id="email-error">Please enter a password</span>
                    )}

                    {!valid && (
                        <input
                            type="password"
                            name="cpassword"
                            value={values.cpassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                    )}
                    {errorMsg && (
                        <span id="fullName-error">Passwords do not match</span>
                    )}
                    {submitted && !values.password && (
                        <span id="email-error">Please enter a confrim password</span>
                    )}
                    {!valid && (
                        <button>Sign Up</button>
                    )}

                </form>
            </div>
        </>
    );
}

export default SignUp
