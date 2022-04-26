import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {start} from "../../../Store/Slice/Site/start.slice";
import ProductsView from "../../../Components/Features/ProductsView";
import {Grid} from '@mui/material';
import {SkeletonRow} from "../../../Components/Features/ProductsView/Templates";

function Dashboard() {
    const {data = {}} = useSelector(state => state.site.siteStart);
    const {userData = {}} = useSelector(state => state.panel.panelAccount);
console.log("userData", userData)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(start({
            marketPort: 2,
            marketVersion: 40803,
            pageName: "clip",
            pageNumber: 0,
        }));

        // dispatch(startBar({
        //     marketPort: 2,
        //     marketVersion: 40803,
        //     pageName: "clip_bar",
        //     pageNumber: 0,
        // }))
    }, [dispatch]);
    console.log("data", Object.keys(data));
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