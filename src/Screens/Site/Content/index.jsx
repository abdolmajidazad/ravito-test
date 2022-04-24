import * as React from 'react';
import {useParams, Link} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Fetch} from "../../../Store/Slice/Site/content.slice";
import {GetAssetUrl} from "../../../Action/Setting";
import Player from "../../../Components/Features/Player";
import {Comments, RelatedRows} from "../../../Components/Features/ProductsView/Templates";
import ReactTimeAgo from "../../../Components/Features/ProductsView/Templates/ClipItem";
import {Rating} from "@mui/material";


export default function ContentPage() {
    const {data = {}} = useSelector(state => state.site.siteContent);
    console.log("data", data);
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
                <Grid item xs={12} sm={6} md={9}>
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
                <Grid item xs={12} sm={6} md={3}>
                    <RelatedRows relatedRows={data.relatedRows} columns={{xs: 12, sm: 12, md: 12}}/>
                </Grid>
            </Grid>
        </>
    );
}