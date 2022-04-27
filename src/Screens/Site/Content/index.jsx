import * as React from 'react';
import {useParams} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Fetch} from "../../../Store/Slice/Site/content.slice";
import Player from "../../../Components/Features/Player";
import {Comments, RelatedRows} from "../../../Components/Features/ProductsView/Templates";
import {Rating} from "@mui/material";


export default function ContentPage() {
    const {data = {}} = useSelector(state => state.site.siteContent);
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch(Fetch({
            marketPort: 2,
            marketVersion: 40803,
            uuid: params['uuid'],
        }));
    }, [dispatch, params]);
    return (

        <>


            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={8}>
                    <Player/>

                    <Grid container alignItems={'center'} justifyContent={'space-between'}>
                        <Grid item>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="text.primary"
                                gutterBottom
                            >
                                {data.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Rating style={{marginTop: 5}} name="read-only" value={data['rate'] / 2} readOnly
                                    size="small"/>

                        </Grid>
                    </Grid>

                    <Typography variant="subtitle1" component="h2" color="text.secondary" paragraph>
                        {data.description}
                    </Typography>

                    <Grid>
                        <Comments/>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RelatedRows relatedRows={data.relatedRows} columns={{xs: 12, sm: 12, md: 12}}/>
                </Grid>
            </Grid>
        </>
    );
}