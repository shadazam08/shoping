import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import {
    AccountCircle,
    LockOpen,
    LoginOutlined,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import { useAuth } from '../../context/AppContext';
import Alert from 'react-bootstrap/Alert';
import './login.scss'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')
    const [valid, setValid] = useState(false);
    const history = useNavigate();
    const { serverPort, serverIP, isLoggedIn, login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const loginSubmit = async (event) => {
        event.preventDefault();
        // Basic form validation (you can extend this)
        if (formData.email.trim() === '' || formData.password.trim() === '' || formData.role.trim() === '') {
            setError('Please fill in all fields.');
            setTimeout(() => {
                setError('');
            }, 2000)
            return;
        }
        // You can perform further actions here, such as sending the data to a backend for authentication

        try {
            const response = await fetch(`http://${serverIP}:${serverPort}/authRoute/adminLogin`, {
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
                const { adminToken, adminId } = parseRes;
                localStorage.setItem('adminToken', adminToken);
                localStorage.setItem('adminId', adminId);
                console.log('Login successful');
                // console.log('Submitted data:', formData);
                // Reset form values
                login(adminToken);
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


        console.log('Submitted data:', formData);
    }
    return (
        <>
            {valid && <Navigate to="/dashboard" />}
            <form className='login' onSubmit={loginSubmit}>
                <Box sx={{ '& > :not(style)': { m: 1 } }} >
                    <h4 className='loginHeader'>Admin Login</h4>
                    {error && <Alert variant='danger' className='alertMessage'>{error} </Alert>}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className='mb-4 mt-4' >
                        <AccountCircle sx={{ mr: 1, my: 0.5 }} color='success' />
                        <FormControl variant="standard" color='success' sx={{ minWidth: 240 }}>
                            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                            <Input id="standard-adornment-email" type='email' name='email' value={formData.email} onChange={handleChange} />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                        <LockOpen sx={{ mr: 1, my: 0.5 }} color='success' />
                        <FormControl variant="standard" color='success'>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff color='error' /> : <Visibility color='success' />}
                                        </IconButton>
                                    </InputAdornment>
                                }

                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className='mb-4 mt-4' >
                        <AccountCircle sx={{ mr: 1, my: 0.5 }} color='success' />
                        <FormControl variant="standard" color='success' sx={{ minWidth: 240 }}>
                            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                            <Select
                                className="form-field"
                                type="role"
                                name="role"
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Select a role</em>
                                </MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="superAdmin">Super Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Button type='submit' variant="contained" color="success" className='mt-4 text-center'>
                            Login
                            <LoginOutlined sx={{ ml: 1, my: 0.5 }} />
                        </Button>
                    </Box>
                </Box>
            </form>
        </>

    )
}

export default Login
