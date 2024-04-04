import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../../context/AppContext';
import Alert from 'react-bootstrap/Alert';
import './changePassword.scss'

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confrimPassword, setConfrimPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const [oldPassword, setOldPassword] = useState();
    const [dbPassword, setDbPassword] = useState(false)
    const { serverIP, serverPort } = useAuth();
    const adminEmail = localStorage.getItem('adminEmail');

    const updatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confrimPassword) {
            setShowError(true);
            setShowAlert(false);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }

        try {
            const body = { adminEmail, newPassword, oldPassword };
            const oldPasswordCheck = await fetch(`http://${serverIP}:${serverPort}/updateData/adminPasswordCheck`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const oldPasswordCheckRes = await oldPasswordCheck.json();

            if (!oldPasswordCheckRes.success) {
                setDbPassword(true);
                setShowAlert(false);
                setTimeout(() => {
                    setDbPassword(false);
                }, 3000);
                return;
            }

            if (newPassword === confrimPassword) {

                const responce = await fetch(`http://${serverIP}:${serverPort}/updateData/adminUpdatePassword`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                const parseRes = await responce.json();
                if (parseRes.message === 'Password Updated Succesfully') {
                    setShowAlert(true);
                    setShowError(false);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);

                } else {
                    setShowError(true);
                    setShowAlert(false);
                    setTimeout(() => {
                        setShowError(false);
                    }, 3000);
                }
            }
        } catch (err) {
            console.error(err.message);
        }
        setOldPassword('')
        setNewPassword('');
        setConfrimPassword('');
    }
    return (
        <>
            {showAlert && <Alert variant='success' className='alertMessage'>Password Updated Successfully</Alert>}
            {showError && <Alert variant='danger' className='alertMessage'>new password and confrim password do not match </Alert>}
            {dbPassword && <Alert variant='danger' className='alertMessage'>Old Password is wrong</Alert>}

            <div className='password text-black bg-white'>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmails" hidden>
                        <Form.Label className='mt-2'>Email address</Form.Label>
                        <Form.Control type="email" value={adminEmail} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control type="password" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNewBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCofrimBasicPassword">
                        <Form.Label>Confrim Password</Form.Label>
                        <Form.Control type="password" placeholder="Confrim Password" onChange={(e) => setConfrimPassword(e.target.value)} value={confrimPassword} />
                    </Form.Group>
                    <Button variant="danger" type="submit" className='mb-1 w-100' onClick={updatePassword}>
                        Change Password
                    </Button>
                </Form>
            </div>
        </>
    )
}
export default ChangePassword