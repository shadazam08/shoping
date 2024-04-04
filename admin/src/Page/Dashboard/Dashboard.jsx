import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar, faGraduationCap, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mui/material';
import DashBoardTable from './DashBoardTable';
import './dasboard.scss';

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
          setTotalStudent(parseRes.totalStudents);
          setTotalNewStudent(parseRes.totalNewStudents);
          setTotalCourses(parseRes.totalcountCourses);
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
  }, [serverIP, serverPort]);


  return (
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
                        </span>
                        <div className="media-body text-white">
                          <p className="mb-1">Total Students</p>
                          <h3 className="text-white">{totalStudent}</h3>
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
                        </span>
                        <div className="media-body text-white">
                          <p className="mb-1">New Students</p>
                          <h3 className="text-white">{totalNewStudent}</h3>
                          <small>in a month</small>
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
                        </span>
                        <div className="media-body text-white">
                          <p className="mb-1">Total Course</p>
                          <h3 className="text-white">{totalCourses}</h3>
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
                        </span>
                        <div className="media-body text-white">
                          <p className="mb-1">Fees Collection</p>
                          <h3 className="text-white">25160$</h3>
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
                          <DashBoardTable />
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
  );
};

export default Dashboard