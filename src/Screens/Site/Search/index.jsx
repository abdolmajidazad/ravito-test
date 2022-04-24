import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Search} from "../../../Store/Slice/Site/search.slice";
import ProductsView from "../../../Components/Features/ProductsView";
import {Grid} from '@mui/material';
import {useParams} from "react-router-dom";

function SearchPage() {
    const {data = {}} = useSelector(state => state.site.siteSearch);
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch(Search({
            contentType: "CLIP",
            marketPort: 2,
            marketVersion: 40803,
            pageNumber: params['pageNumber'] || 0,
            pageSize: 25,
            searchStr: params['text'],
        }));
    }, [dispatch, params]);



    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProductsView type={'main'} rows={data['rows']}/>
            </Grid>
        </Grid>
    )
}

export default SearchPage