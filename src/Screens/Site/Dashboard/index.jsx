import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {start, startBar} from "../../../Store/Slice/Site/start.slice";
import ProductsView from "../../../Components/Features/ProductsView";
import {Grid} from '@mui/material';
import SliderComponent from "../../../Components/Features/Slider";
import {SkeletonRow} from "../../../Components/Features/ProductsView/Templates";

function Dashboard() {
    const {data = {}, dataBar = {}} = useSelector(state => state.site.siteStart);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(start({
            marketPort: 2,
            marketVersion: 40803,
            pageName: "clip",
            pageNumber: 0,
        }));

        dispatch(startBar({
            marketPort: 2,
            marketVersion: 40803,
            pageName: "clip_bar",
            pageNumber: 0,
        }))
    }, [dispatch]);
    console.log("data", Object.keys(data));
    return (
        <>
        <Grid container spacing={2}>
            {/*<Grid item xs={dataBar?.rows?.length ? 8 : 12}>*/}
            <Grid item xs={12}>
                <SkeletonRow/>

                {/*{*/}
                   {/*Object.keys( data).length &&  <SliderComponent/> || null*/}
                {/*}*/}

            </Grid>


            <Grid item xs={12}>
                <ProductsView type={'main'} rows={data['rows']}/>
            </Grid>
            {/*{*/}
            {/*(dataBar?.rows?.length && (*/}
            {/*<Grid item xs={4}>*/}
            {/*<ProductsView type={'bar'} rows={dataBar['rows']}/>*/}
            {/*</Grid>*/}
            {/*)) || null*/}
            {/*}*/}
        </Grid>
            </>
    )
}

export default Dashboard