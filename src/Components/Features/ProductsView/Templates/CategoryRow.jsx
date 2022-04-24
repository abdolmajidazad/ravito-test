import {Grid, Card, CardMedia, CardContent, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {GetAssetUrl} from "../../../../Action/Setting";
import * as React from "react";
import {ClipItem} from "./index";

function CategoryRow(props) {
    const {rowData = {}} = props;
    const {categoryRow = {}} = rowData;
    const {sonItems = []} = categoryRow;
    return (
        <Grid container spacing={2}>
            {
                sonItems.map((sonItem, index) => (
                <ClipItem  key={'category-row-'+index.toString()} sonItem={sonItem} columns={{xs:6,sm:4,md:3}}/>
                ))
            }

        </Grid>
    )
}

export default CategoryRow