import {Outlet} from 'react-router-dom';
import * as React from "react";
import {Grid, CssBaseline} from"@mui/material"
function PreLogin() {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />

            <Outlet/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    )
}

export default PreLogin