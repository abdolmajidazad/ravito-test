import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {List, start} from "../../../Store/Slice/Site/start.slice";
import {Grid} from "@mui/material";
import ProductsView from "../../../Components/Features/ProductsView";
import {ListView} from "../../../Components/Features/ProductsView/Templates";

function CategoryList() {

    return (
        <Grid item xs={12}>
            {/*<ProductsView type={'main'} rows={data['rows']}/>*/}
            <ListView/>
        </Grid>
    )
}

export default CategoryList