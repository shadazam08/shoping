import React, { useState, useRef, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import { useAuth } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faBroom, faLock, faMap, faSave } from "@fortawesome/free-solid-svg-icons";
import userDefaultImage from "../../assets/images/21104.png";
import "./userProfile.scss";
import ChangePassword from "../user/ChangePassword/ChangePassword";

const UserProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const [clickedInput, setClickedInput] = useState(null);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState();
    const [created, setCreated] = useState();
    const [lastLogin, setLastLogin] = useState();
    const [viewImages, setImages] = useState();
    const [address, setAddress] = useState("");
    const [cities, setCities] = useState("");
    const [states, setStates] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [showAlert, setshowAlert] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [originalFirstName, setOriginalFirstName] = useState("");
    const [originalLastName, setOriginalLastName] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const formRef = useRef();
    const fileInputRef = useRef();
    const { open, Main, DrawerHeader, serverIP, serverPort } = useAuth();
    const adminId = localStorage.getItem("adminId");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setClickedInput(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            // clearTimeout(timeout)
        };
    }, []);

    const updateAddress = async (e) => {
        try {
            const body = { adminId, address, cities, states, country, zipCode, firstName, lastName, phone };

            const responce = await fetch(
                `http://${serverIP}:${serverPort}/updateData/updateAdminDetails`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );
            if (responce.ok) {
                const data = await responce.json();
                console.log(data.message);
                if (data.message === "update success full") {
                    setshowAlert(true);
                    setTimeout(() => {
                        setshowAlert(false);
                    }, 2000);
                }
            } else {
                console.error("Address upload failed. Status:", responce.status);
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        const fetchImageData = async (adminId) => {
            try {
                const responce = await fetch(
                    `http://${serverIP}:${serverPort}/updateData/getAdminImage?adminId=${adminId}`,
                    {
                        method: "GET",
                    }
                );
                if (responce.ok) {
                    const dataImage = await responce.json();
                    // console.log(dataImage);
                    setImages(dataImage);
                } else {
                    console.error("Image fetch failed. Status:", responce.status);
                }
            } catch (error) {
                console.error("Error during FETCH:", error);
            }
        };
        const fetchData = async () => {
            const body = {
                adminId: adminId,
            };
            try {
                const responce = await fetch(
                    `http://${serverIP}:${serverPort}/showData/adminViewsData`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    }
                );
                if (responce.ok) {
                    const data = await responce.json();
                    console.log('data: ', data);
                    const adminEmail = data.adminEmail;
                    localStorage.setItem("adminEmail", adminEmail);
                    setEmail(adminEmail);
                    setFirstName(data.adminFirstName);
                    setLastName(data.adminLastName);
                    setPhone(data.adminMobileNumber);
                    setCreated(data.adminCreatedOn);
                    setLastLogin(data.adminLastLogin);
                    setAddress(data.adminStreet);
                    setCities(data.adminCity);
                    setStates(data.adminState);
                    setZipCode(data.adminZipCode);
                    setCountry(data.adminCountry);
                } else {
                    console.error("Email Not Found . Status:", responce.status);
                    const errorMessage = await responce.text();
                    console.error("Error message:", errorMessage);
                }
            } catch (error) {
                console.error("Error during FETCH:", error);
            }
        };
        const uploadImage = async () => {
            if (uploadedImage) {
                try {
                    const formData = new FormData();
                    formData.append("file", uploadedImage);
                    formData.append("adminId", adminId);

                    const response = await fetch(
                        `http://${serverIP}:${serverPort}/updateData/adminProfileImage`,
                        {
                            method: "POST",
                            body: formData,
                        }
                    );

                    if (response.ok) {
                        const imageUrl = await response.json();
                        console.log("Image: ", imageUrl);
                    } else {
                        console.error("Image upload failed. Status:", response.status);
                    }
                } catch (error) {
                    console.error("Error during image upload:", error);
                } finally {
                    setUploadedImage(null);
                }
            }
        };

        fetchImageData(adminId);
        uploadImage();
        fetchData();
    }, [uploadedImage]);

    useEffect(() => {
    }, [address, cities, states, country, zipCode, firstName, lastName]);

    const handleInputClick = (inputId) => {
        setClickedInput((prevInput) => (prevInput === inputId ? null : inputId));
        if (!editMode) {
            setOriginalFirstName(firstName);
            setOriginalLastName(lastName);
        }
        setEditMode(true);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleClear = () => {
        if (editMode) {
            setFirstName(originalFirstName);
            setLastName(originalLastName);
        }
        setEditMode(false);
    };

    return (
        <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Main open={open}>
                <DrawerHeader />
                <Box
                    sx={{
                        p: 1,
                        marginLeft: { sm: "240px", md: "240px", xs: "240px" },
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3} className="profileMain">
                            <Grid item xs={12}>
                                <div ref={formRef}>
                                    {showAlert && (
                                        <Alert variant="success" className="alertMessages">
                                            {" "}
                                            Updated Successfully
                                        </Alert>
                                    )}
                                    <div className="text-white mb-4 headButton">
                                        <h1>My Profile</h1>
                                        {editMode && (
                                            <>
                                                <Button
                                                    variant="primary"
                                                    className="text-light"
                                                    style={{ padding: "0 1.5rem 0 0.2rem" }}
                                                    onClick={updateAddress}
                                                >
                                                    <FontAwesomeIcon icon={faSave} className="mx-1" />
                                                    SAVE
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    className="text-light ms-2"
                                                    style={{ padding: "0 1.5rem 0 0.2rem" }}
                                                    onClick={handleClear}
                                                >
                                                    <FontAwesomeIcon icon={faBroom} />
                                                    Clear
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                    <Card className="mb-lg-4">
                                        <Card.Header as="h5">Basic info</Card.Header>
                                        <Card.Body>
                                            <div className="imageLeft mb-5">
                                                <Card.Img
                                                    variant="top"
                                                    src={
                                                        viewImages
                                                            ? `http://${serverIP}:${serverPort}/adminProfileImage/${viewImages}`
                                                            : userDefaultImage
                                                    }
                                                    alt="ProfileImage"
                                                    className="imageStyle"
                                                    onClick={() => fileInputRef.current.click()}
                                                    style={{ cursor: "pointer" }}
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    onChange={(e) => setUploadedImage(e.target.files[0])}
                                                    ref={fileInputRef}
                                                />

                                                <h3 className=" text-capitalize">
                                                    {firstName + " " + lastName}
                                                </h3>
                                                <Button
                                                    variant="primary"
                                                    className="buttons ms-5"
                                                    onClick={handleShowModal}
                                                >
                                                    <FontAwesomeIcon icon={faLock} /> Change Password
                                                </Button>
                                                <Modal
                                                    show={showModal}
                                                    onHide={handleCloseModal}
                                                    style={{ marginTop: "70px" }}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Change Password</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <ChangePassword />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={handleCloseModal}
                                                        >
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                            <Card.Text>
                                                <Form className="nameForm">
                                                    <Form.Group
                                                        className="mb-3 firstNmae"
                                                        controlId="formBasicFirtName"
                                                    >
                                                        <Form.Label className="mt-2">First Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            style={{
                                                                borderBottom:
                                                                    clickedInput === "firstName"
                                                                        ? "2px solid #007BFF"
                                                                        : "2px solid #000",
                                                                backgroundColor: "#F5F5F5",
                                                                color: "#000",
                                                                borderTop: "none",
                                                                borderLeft: "none",
                                                                borderRight: "none",
                                                                borderRadius: "0",
                                                                transition: "none",
                                                            }}
                                                            onClick={() => handleInputClick("firstName")}
                                                            className="disableHover"
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group
                                                        className="mb-3 lastName"
                                                        controlId="formBasicLastName"
                                                    >
                                                        <Form.Label className="mt-2">Last Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            style={{
                                                                borderBottom:
                                                                    clickedInput === "lastName"
                                                                        ? "2px solid #007BFF"
                                                                        : "2px solid #000",
                                                                backgroundColor: "#F5F5F5",
                                                                color: "#000",
                                                                borderTop: "none",
                                                                borderLeft: "none",
                                                                borderRight: "none",
                                                                borderRadius: "0",
                                                                transition: "none",
                                                            }}
                                                            onClick={() => handleInputClick("lastName")}
                                                            className="disableHover"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Grid>
                            <Grid item xs={6} className="detailsCard">
                                <Card className=" mb-lg-4 leftCard">
                                    <Card.Header as="h5">Contacts</Card.Header>
                                    <Card.Body>
                                        <div className="imageLeft mb-5">
                                            <div className="iconStyle d-inline-block">
                                                <FontAwesomeIcon
                                                    icon={faAt}
                                                    spin
                                                    style={{ height: "30px", width: "30px" }}
                                                    className="mt-2 ms-2  text-center align-content-center"
                                                />
                                            </div>
                                            <h3>{phone}</h3>
                                            <p>
                                                Email: <span className="fw-bold">{email}</span>
                                            </p>
                                        </div>
                                        <Card.Text>
                                            <Form className="nameForm">
                                                <Form.Group
                                                    className="mb-3 firstNmae"
                                                    controlId="formBasicPhone"
                                                >
                                                    <Form.Label className="mt-2">Phone</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "phone"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        onClick={() => handleInputClick("phone")}
                                                        className="disableHover"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3 lastName"
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Label className="mt-2">Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "email"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        onClick={() => handleInputClick("email")}
                                                        className="disableHover"
                                                        value={email}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Form>
                                            <Form className="nameForm">
                                                <Form.Group
                                                    className="mb-3 firstNmae"
                                                    controlId="formBasicCreatedOn"
                                                >
                                                    <Form.Label className="mt-2">Created On</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "created_on"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        onClick={() => handleInputClick("created_on")}
                                                        className="disableHover"
                                                        value={new Date(created).toLocaleString("en-GB", {
                                                            day: "numeric",
                                                            month: "numeric",
                                                            year: "numeric",
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            second: "numeric",
                                                            hour12: true,
                                                        })}
                                                        disabled
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3 firstNmae"
                                                    controlId="formBasicLastLogin"
                                                >
                                                    <Form.Label className="mt-2">Last Login</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "login"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        onClick={() => handleInputClick("login")}
                                                        className="disableHover"
                                                        value={new Date(lastLogin).toLocaleString("en-GB", {
                                                            day: "numeric",
                                                            month: "numeric",
                                                            year: "numeric",
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            second: "numeric",
                                                            hour12: true,
                                                        })}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Grid>
                            <Grid item xs={6} className="detailsCard">
                                <Card className="mb-lg-4 rightCard">
                                    <Card.Header as="h5">Address</Card.Header>
                                    <Card.Body>
                                        <div className="imageLeft mb-5">
                                            <div className="iconStyle d-inline-block">
                                                <FontAwesomeIcon
                                                    icon={faMap}
                                                    beatFade
                                                    style={{ height: "30px", width: "30px" }}
                                                    className="mt-2 ms-2  text-center align-content-center"
                                                />
                                            </div>

                                            <h4>{address || ""}</h4>
                                            <p>
                                                {(cities || "") +
                                                    " " +
                                                    (states || "") +
                                                    " " +
                                                    (zipCode || "") +
                                                    " " +
                                                    (country || "")}{" "}
                                            </p>
                                        </div>
                                        <Card.Text>
                                            <Form className="nameForm">
                                                <Form.Group
                                                    className="mb-3 firstNmae"
                                                    controlId="formBasicAddress"
                                                >
                                                    <Form.Label className="mt-2">Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "street"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        value={address || ""}
                                                        onClick={() => handleInputClick("street")}
                                                        className="disableHover"
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3 lastName"
                                                    controlId="formBasicCity"
                                                >
                                                    <Form.Label className="mt-2">City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "city"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        value={cities || ""}
                                                        onClick={() => handleInputClick("city")}
                                                        onChange={(e) => setCities(e.target.value)}
                                                        className="disableHover"
                                                    />
                                                </Form.Group>
                                            </Form>
                                            <Form className="nameForm">
                                                <Form.Group
                                                    className="mb-3 lastName"
                                                    controlId="formBasicState"
                                                >
                                                    <Form.Label className="mt-2">State</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "state"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        value={states || ""}
                                                        onClick={() => handleInputClick("state")}
                                                        onChange={(e) => setStates(e.target.value)}
                                                        className="disableHover"
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3 lastName"
                                                    controlId="formBasicCountry"
                                                >
                                                    <Form.Label className="mt-2">Country</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "country"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        value={country || ""}
                                                        onClick={() => handleInputClick("country")}
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        className="disableHover"
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3 lastName"
                                                    controlId="formBasicZipCode"
                                                >
                                                    <Form.Label className="mt-2">Zip Code</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom:
                                                                clickedInput === "zipcode"
                                                                    ? "2px solid #007BFF"
                                                                    : "2px solid #000",
                                                            backgroundColor: "#F5F5F5",
                                                            color: "#000",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0",
                                                            transition: "none",
                                                        }}
                                                        value={zipCode || ""}
                                                        onClick={() => handleInputClick("zipcode")}
                                                        onChange={(e) => setZipCode(e.target.value)}
                                                        className="disableHover"
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Main>
        </Box>
    );
};

export default UserProfile;