import {Grid} from '@mui/material';
import {ClipItem} from "./index";
import * as React from "react";
function CategoryBar(props){
    const {rowData={}} = props;
    const {categoryRow={}} = rowData;
    const {sonItems=[]} = categoryRow;
     return(
         <Grid container spacing={2}>
            {
                sonItems.map((sonItem, index)=>  <ClipItem  key={'category-bar-'+index.toString()} sonItem={sonItem} columns={{xs:12,sm:12,md:12}}/>)
            }

        </Grid>
    )
}

export default CategoryBar