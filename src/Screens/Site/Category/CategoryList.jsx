import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {start} from "../../../Store/Slice/Site/start.slice";
import {Grid} from "@mui/material";
import ProductsView from "../../../Components/Features/ProductsView";

function CategoryList(props) {
    const {categories = []} = props;
    const {data = {}} = useSelector(state => state.site.siteStart);
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        if (categories.length) {
            dispatch(start({
                marketPort: 2,
                marketVersion: 40803,
                pageName: "cat" + (params['categoryId'] || categories[0]['id']),
                pageNumber: 0,
            }));
        }

    }, [dispatch, params, categories]);
    return (
        <Grid item xs={12}>
            <ProductsView type={'main'} rows={data['rows']}/>
        </Grid>
    )
}

export default CategoryList