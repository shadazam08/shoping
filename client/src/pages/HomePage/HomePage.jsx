import React from 'react'
import './homePage.scss'
import { Box, Grid } from '@mui/material'
import HomePageCard from './HomePageCard'


const HomePage = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1, margin: '30px 20px 0px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <HomePageCard ImageLink={'https://static.javatpoint.com/images/homeicon/swagger.png'} title={'moviesCount'} c_name="Swagger" PageLink={'https://www.javatpoint.com/swagger'} mainClass={'homecontent'} />
                    </Grid>
                    <Grid item xs={2}>
                        <HomePageCard ImageLink={'https://static.javatpoint.com/images/homeicon/swagger.png'} title={'moviesCount'} c_name="Swagger" PageLink={'https://www.javatpoint.com/swagger'} mainClass={'homecontent'} />
                    </Grid>
                    <Grid item xs={2}>
                        <HomePageCard ImageLink={'https://static.javatpoint.com/images/homeicon/swagger.png'} title={'moviesCount'} c_name="Swagger" PageLink={'https://www.javatpoint.com/swagger'} mainClass={'homecontent'} />
                    </Grid>
                    <Grid item xs={2}>
                        <HomePageCard ImageLink={'https://static.javatpoint.com/images/homeicon/swagger.png'} title={'moviesCount'} c_name="Swagger" PageLink={'https://www.javatpoint.com/swagger'} mainClass={'homecontent'} />
                    </Grid>
                    <Grid item xs={2}>
                        <HomePageCard ImageLink={'https://static.javatpoint.com/images/homeicon/swagger.png'} title={'moviesCount'} c_name="Swagger" PageLink={'https://www.javatpoint.com/swagger'} mainClass={'homecontent'} />
                    </Grid>
                    <Grid item xs={2}>
                        <HomePageCard ImageLink={'https://static.javatpoint.com/images/homeicon/swagger.png'} title={'moviesCount'} c_name="Swagger" PageLink={'https://www.javatpoint.com/swagger'} mainClass={'homecontent'} />
                    </Grid>
                    <Grid item xs={2}>
                        <HomePageCard ImageLink={'https://static.javatpoint.com/images/homeicon/swagger.png'} title={'moviesCount'} c_name="Swagger" PageLink={'https://www.javatpoint.com/swagger'} mainClass={'homecontent'} />
                    </Grid>
                    <Grid item xs={2}>
                        <HomePageCard ImageLink={'https://static.javatpoint.com/images/homeicon/swagger.png'} title={'moviesCount'} c_name="Swagger" PageLink={'https://www.javatpoint.com/swagger'} mainClass={'homecontent'} />
                    </Grid>
                </Grid>
            </Box>

            {/* <div className='cards'>
                <Link href="https://www.javatpoint.com/swagger">
                    <div className="homecontent">
                        <img alt="Swagger tutorial" src="https://static.javatpoint.com/images/homeicon/swagger.png" />
                        <p>Swagger</p>
                    </div>
                </Link>
                <Link href="https://www.javatpoint.com/swagger">
                    <div className="homecontent">
                        <img alt="Swagger tutorial" src="https://static.javatpoint.com/images/homeicon/swagger.png" />
                        <p>Swagger</p>
                    </div>
                </Link>
                <Link href="https://www.javatpoint.com/swagger">
                    <div className="homecontent">
                        <img alt="Swagger tutorial" src="https://static.javatpoint.com/images/homeicon/swagger.png" />
                        <p>Swagger</p>
                    </div>
                </Link>
            </div> */}

        </>
    )
}

export default HomePage
