import OwlCarousel from 'react-owl-carousel-rtl';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {ClipItem} from ".";
import {Grid} from "@mui/material";
import * as React from "react";
export default function RowSlider(props) {
    const {rowData = {}} = props;
    const {categoryRow = {}} = rowData;
    let {sonItems = []} = categoryRow;
    return (
        <div className={'owl-slider'}>
            <Grid container>
                <OwlCarousel
                    className="owl-theme"
                    rtl={true}
                    rtlClass="owl-rtl"
                    margin={5}
                    lazyLoad={true}
                    stagePadding={5}
                    nav
                    dots={false}
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
                            <ClipItem key={'relative-row-' + index.toString()} sonItem={sonItem}
                            />
                        ))
                    }



                </OwlCarousel>
            </Grid>
        </div>
    )
}

