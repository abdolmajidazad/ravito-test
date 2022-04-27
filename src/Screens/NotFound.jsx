import {useNavigate} from 'react-router-dom'
import {Button, Grid} from "@mui/material";

const NotFound = () => {
    const navigate = useNavigate()

    return (

        <Grid container alignItems={'center'} justifyContent={'center'} direction={'column'} style={{height:'100vh'}}>
            <Grid item>

                <h1 className="float-start display-3 me-4">404</h1>
            </Grid>
            <Grid item>
                <h4 className="pt-3">Oops! You're lost.</h4>
            </Grid>
            <Grid item>
                <p className="text-medium-emphasis float-start">The page you are looking for was not found!</p>
            </Grid>
            <Grid item>
                <Button component="a" color="primary" role="button" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Grid>
        </Grid>

    )
}

export default NotFound
