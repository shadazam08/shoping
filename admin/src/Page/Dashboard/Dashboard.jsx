import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar, faGraduationCap, faPencil, faTrash, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'

import { Box } from '@mui/material';
import './dasboard.scss';
// import './dasboard.css';


const Dashboard = () => {
  const { open, Main, DrawerHeader, serverIP, serverPort } = useAuth();
  const [totalStudent, setTotalStudent] = useState([]);
  const [totalNewStudent, setTotalNewStudent] = useState([]);
  const [totalCourses, setTotalCourses] = useState([]);


  useEffect(() => {
    const fetchStudentDetils = async () => {
      try {
        const response = await fetch(`http://${serverIP}:${serverPort}/showData/studentDetails`);
        const parseRes = await response.json();
        if (parseRes.message === 'success') {
          // setMsgSuccess('Insert Success Full');
          setTotalStudent(parseRes.totalStudents);
          setTotalNewStudent(parseRes.totalNewStudents);
          setTotalCourses(parseRes.totalcountCourses);

          console.log('parseRes.totalcountCourses: ', parseRes.totalcountCourses)

        } else {
          console.error('URL Insert failed. Status:', response.status);
          const errorMessage = await response.text();
          console.error('Error message:', errorMessage);
        }
      } catch (error) {
        console.error('Error during Inser:', error);
      }
    }
    fetchStudentDetils();
  }, []);


  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Main open={open}>
          <DrawerHeader />
          <Box sx={{
            p: 1,
            marginLeft: { sm: '240px', md: '240px', xs: '240px' }
          }}>
            <div className="content-body">

              <div className="container-fluid">

                <div className="row">
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="widget-stat card bg-primary">
                      <div className="card-body">
                        <div className="media">
                          <span className="mr-3">
                            <FontAwesomeIcon icon={faUsers} />
                            {/* <i className="la la-users"></i> */}
                          </span>
                          <div className="media-body text-white">
                            <p className="mb-1">Total Students</p>
                            <h3 className="text-white">{totalStudent}</h3>
                            {/* <div className="progress mb-2 bg-white">
                              <div className="progress-bar progress-animated bg-light" style={{ width: `${newTotal}%` }}></div>
                            </div>
                            <small>80% Increase in 20 Days</small> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="widget-stat card bg-warning">
                      <div className="card-body">
                        <div className="media">
                          <span className="mr-3">
                            <FontAwesomeIcon icon={faUser} />
                            {/* <i className="la la-user"></i> */}
                          </span>
                          <div className="media-body text-white">
                            <p className="mb-1">New Students</p>
                            <h3 className="text-white">{totalNewStudent}</h3>
                            {/* <div className="progress mb-2 bg-white">
                              <div className="progress-bar progress-animated bg-light" style={{ width: "50%" }}></div>
                            </div>
                            <small>50% Increase in 25 Days</small> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="widget-stat card bg-secondary">
                      <div className="card-body">
                        <div className="media">
                          <span className="mr-3">
                            <FontAwesomeIcon icon={faGraduationCap} />
                            {/* <i className="la la-graduation-cap"></i> */}
                          </span>
                          <div className="media-body text-white">
                            <p className="mb-1">Total Course</p>
                            <h3 className="text-white">{totalCourses}</h3>
                            {/* <div className="progress mb-2 bg-white">
                              <div className="progress-bar progress-animated bg-light" style={{ width: "76%" }}></div>
                            </div>
                            <small>76% Increase in 20 Days</small> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="widget-stat card bg-danger">
                      <div className="card-body">
                        <div className="media">
                          <span className="mr-3">
                            <FontAwesomeIcon icon={faDollar} />
                            {/* <i className="la la-dollar"></i> */}
                          </span>
                          <div className="media-body text-white">
                            <p className="mb-1">Fees Collection</p>
                            <h3 className="text-white">25160$</h3>
                            {/* <div className="progress mb-2 bg-white">
                              <div className="progress-bar progress-animated bg-light" style={{ width: "30%" }}></div>
                            </div>
                            <small>30% Increase in 30 Days</small> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-xxl-6 col-lg-12 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">University Survey</h3>
                      </div>
                      <div className="card-body">
                        GHraph
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Donught Chart</h3>
                      </div>
                      <div className="card-body">
                        graph
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-xxl-3 col-sm-6">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">University Survey</h3>
                      </div>
                      <div className="card-body">
                        graph
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">New Student List</h4>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive recentOrderTable">
                          <table className="table verticle-middle table-responsive-md">
                            <thead>
                              <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Assigned Professor</th>
                                <th scope="col">Date Of Admit</th>
                                <th scope="col">Status</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Fees</th>
                                <th scope="col">Edit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>01</td>
                                <td>Jack Ronan</td>
                                <td>Airi Satou</td>
                                <td>01 August 2020</td>
                                <td><span className="badge badge-rounded badge-primary">Checkin</span></td>
                                <td>Commerce</td>
                                <td>120$</td>
                                <td>
                                  <a href="#" className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faPencil} /></a>
                                  <a href="#" className="btn btn-sm btn-danger"><FontAwesomeIcon icon={faTrash} /></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Main>
      </Box>
    </>

  )
}

export default Dashboard
