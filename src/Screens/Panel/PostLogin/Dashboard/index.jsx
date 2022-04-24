import {useTranslation} from "react-i18next";
import { Grid, Button} from '@mui/material';
function Dashboard() {

    const {t} = useTranslation('translate');
    return (


        <>
            <div>test</div>
            <Grid container className="mx-0">
                <Button  variant="primary">Button #1</Button>
                <Button  variant="secondary" className="mx-2">Button #2</Button>
                <Button  variant="success">Button #3</Button>
            </Grid>
            <div>dashboard - {t('book')}</div>
        </>
    )
}

export default Dashboard