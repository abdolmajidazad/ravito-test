import { Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

const NoContent = () => {

    const {t} = useTranslation('translate');

    return (

        <Grid container alignItems={'center'} justifyContent={'center'} direction={'column'} style={{height:300}}>
            <Grid item>
                <h4 className="pt-3">{t("NoContentForShow")}</h4>
            </Grid>
        </Grid>

    )
};

export default NoContent
