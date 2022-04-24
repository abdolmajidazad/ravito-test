import {useEffect, useState} from 'react';
import OwlCarousel from 'react-owl-carousel-rtl';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {ClipItem} from "../ProductsView/Templates";
import {Link} from "react-router-dom";
import {GetAssetUrl} from "../../../Action/Setting";
import ReactTimeAgo from "../ProductsView/Templates/ClipItem";
import {Card, CardContent, CardMedia, Grid, Typography, Rating} from "@mui/material";
// import {ClipItem} from "../ProductsView/Templates";
export default function SliderComponent(props) {
    const {rowData = {}} = props;
    const {categoryRow = {}} = rowData;
    const {sonItems = []} = categoryRow;
    return (
        <div className={'owl-slider'}>
            <Grid container>
                <OwlCarousel
                    className="owl-theme"
                    rtl={true}
                    rtlClass="owl-rtl"
                    margin={10}
                    lazyLoad={true}
                    stagePadding={10}
                    nav
                    dots={false}
                    // autoWidth={true}
                    responsive={{
                    0:{
                    items:1
                },
                    600:{
                    items:3
                },
                    1000:{
                    items:4
                }
                }}>

                    {
                        sonItems.map((sonItem, index)=>(
                            <Grid component={Link} to={`/content/${sonItem['uuid']}`} item key={index.toString()}>
                                <Card
                                    sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                                >
                                    <CardMedia
                                        component="img"
                                        image={GetAssetUrl('icon', sonItem['uuid'], 'CLIP', sonItem['versionCode'])}
                                        alt="random"
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography variant={'subtitle2'} noWrap={true}> {sonItem.title}</Typography>
                                        <Grid container alignItems={'center'} justifyContent={'space-between'}>
                                            <Grid item>
                                                <Typography variant={'caption'} color="text.secondary"></Typography>
                                            </Grid>
                                            <Grid item >
                                                <Rating style={{marginTop:5}} name="read-only" value={sonItem['rate']/2} readOnly  size="small" />

                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }



                </OwlCarousel>
            </Grid>
        </div>
    )
}

// function Item(props)
//
// {
//     const {sonItem={}} =  props;
//     return (
//         <ClipItem sonItem={sonItem} columns={{xs:6,sm:4,md:3}}/>
//     )
// }