import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {start, resetState} from "../../../Store/Slice/Site/start.slice";
import ProductsView from "../../../Components/Features/ProductsView";
import {Grid} from '@mui/material';
import {SkeletonRow} from "../../../Components/Features/ProductsView/Templates";

function Dashboard() {
    const {data = {}} = useSelector(state => state.site.siteStart);
    const dispatch = useDispatch();
    useEffect(() => {
        return ()=>{
            dispatch(resetState())
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(() => {
        dispatch(start({
             pageNumber: 0,
        }));
        // dispatch(startBar({
        //     marketPort: 2,
        //     marketVersion: 40803,
        //     pageName: "clip_bar",
        //     pageNumber: 0,
        // }))
    }, [dispatch]);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    (data['rows'] && <ProductsView type={'main'} rows={data['rows']}/>) || <SkeletonRow rows={5}/>
                }
            </Grid>
        </Grid>
    )
}

export default Dashboard