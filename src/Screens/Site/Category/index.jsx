import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {CategoryWs} from "../../../Store/Slice/Site/category.slice";
import CategoryList from "./CategoryList";
import {Grid, Paper, Chip} from '@mui/material';
import {resetState} from "../../../Store/Slice/Site/start.slice";

function Category() {
    const {data = {}} = useSelector(state => state.site.siteCategory);
    const {categories = []} = data;
    const dispatch = useDispatch();
    const params = useParams();

    const {catId} =  params;

    useEffect(() => {
        return ()=>{
            dispatch(resetState())
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(() => {
        dispatch(CategoryWs({
            pageName: "clip",
            pageNumber: 0,
        }));

    }, [dispatch]);


    return (
        <>
            <Grid container  spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{
                        p: 1
                    }}>
                        <Grid container spacing={1}>
                            {
                                categories.map(((category,index) => <Grid item key={'category-' + index.toString()}><Link
                                    to={`/category/${params['pageNumber']}/${category['id']}`} ><Chip
                                    color={category['id'] === (parseInt(catId) || categories[0]['id']) ? 'primary' : 'default'}
                                    label={category['title']} style={{cursor:'pointer'}}/></Link> </Grid>))
                            }
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <CategoryList categories={categories}/>
                </Grid>
            </Grid>

        </>
    )
}

export default Category