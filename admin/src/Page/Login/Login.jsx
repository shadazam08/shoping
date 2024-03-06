import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel
} from '@mui/material';
import {
    AccountCircle,
    LockOpen,
    LoginOutlined,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import Alert from 'react-bootstrap/Alert';
import './login.scss'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
    const loginSubmit = (event) => {
        event.preventDefault();
        // Basic form validation (you can extend this)
        if (formData.email.trim() === '' || formData.password.trim() === '') {
            setError('Please fill in all fields.');
            return;
        }
        // You can perform further actions here, such as sending the data to a backend for authentication
        console.log('Submitted data:', formData);
    }
    return (
        <>

            <form className='login' onSubmit={loginSubmit}>
                <Box sx={{ '& > :not(style)': { m: 1 } }} >
                    <h4 className='loginHeader'>Admin Login</h4>
                    {error && <Alert variant='danger' className='alertMessage'>{error} </Alert>}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className='mb-4 mt-4' >
                        <AccountCircle sx={{ mr: 1, my: 0.5 }} color='success' />
                        <FormControl variant="standard" color='success'>
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
