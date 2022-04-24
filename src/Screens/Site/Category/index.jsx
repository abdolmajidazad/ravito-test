import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {CategoryWs} from "../../../Store/Slice/Site/category.slice";
import CategoryList from "./list";
import {Grid}  from '@mui/material';

function Category() {
    const {data = {}} = useSelector(state => state.site.siteCategory);
    const {categories = []} = data;
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch(CategoryWs({
            marketPort: 2,
            marketVersion: 40803,
            pageName: "clip",
            pageNumber: 0,
        }));

    }, [dispatch]);
    return (
        <>
            <Grid container>
                {categories.map((category, index) => (
                    <Grid item  key={'category-' + index.toString()}>
                        <Link
                              to={`/category/${params['pageNumber']}/${category['id']}`}>
                            <span className="badge bg-warning text-dark">{category['title']}</span>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <CategoryList categories={categories}/>
        </>
    )
}

export default Category