import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {start, listStart} from "../../../Store/Slice/Site/start.slice";
import {Grid} from "@mui/material";
import ProductsView from "../../../Components/Features/ProductsView";
import {ListView, SkeletonRow} from "../../../Components/Features/ProductsView/Templates";

function CategoryList(props) {
    let {categories = []} = props;
    const {data = {}, loading=false} = useSelector(state => state.site.siteStart);
    const dispatch = useDispatch();
    const params = useParams();
    const {catId} = params;
    useEffect(() => {
        if (categories.length) {
            dispatch(listStart());
            dispatch(start({
                pageName: "cat" + (catId || categories[0]['id']),
                pageNumber: 0,
            }));
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params, categories,catId ]);
    return ((Object.keys(data).length || !loading) && (
        <Grid item xs={12}>
            {
                (data['rows'] && <ProductsView type={'main'} rows={data['rows']}/>) || <ListView/>
            }

        </Grid>
    )) || <SkeletonRow rows={5}/>
}

export default CategoryList