import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const HomePageCard = ({ PageLink, ImageLink, c_name, mainClass }) => {

    return (
        <Row xs={1} md={1} className=' mb-1 mt-2'>
            <Col>
                <Card  >
                    <Link to={PageLink}>
                        <div className={mainClass}>
                            <Card.Img variant="top" src={ImageLink} />

                            {/* <Card.Header as={'h5'} className='flex flex-row'>

                                <FontAwesomeIcon style={{ marginRight: '10px' }} icon={icons} />
                                {header}
                            </Card.Header> */}

                            <Card.Body>

                                <Card.Title as={'p'}>{c_name}</Card.Title>

                            </Card.Body>
                        </div>

                    </Link>
                </Card>
            </Col>

        </Row>
    )
}

export default HomePageCard

