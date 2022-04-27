import {memo, useEffect} from 'react';
import {Grid, Pagination, Typography} from '@mui/material'
import {useTranslation} from "react-i18next";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {List, resetState, listStart} from "../../../../Store/Slice/Site/list.slice";
import {ClipItem} from "./index";
import Chip from '@mui/material/Chip';
import SkeletonRow from "./SkeletonRow";
import NoContent from "../../NoContent";


function ListView() {
    const {t} = useTranslation('translate');
    const Sorts = [
        {title: t('alphabet'), parameter: "a"},
        {title: t('downloadCount'), parameter: "f"},
        {title: t('newArrival'), parameter: "n"},
        {title: t('mostStar'), parameter: "r"},
    ];
    const {data = {}, pageSize = 25, loading = false} = useSelector(state => state.site.siteList);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const {
        catId,
        sort,
        nationality,
        payment,
        boundary = 'w',
        pvideo,
        filterMask,
        pageNumber
    } = params;
    useEffect(() => {
        return () => {
            dispatch(resetState())
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        dispatch(listStart());
        params['pageNumber'] = parseInt(params['pageNumber']);
        params['catId'] = parseInt(params['catId']);
        params['filterMask'] = parseInt(params['filterMask']);
        params['pageSize'] = pageSize;
        dispatch(List(params));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params]);

    let {items = [], listName} = data;
    let newList = [...items.slice(0, pageSize - 1)];

    const GeneratUrl = (sort) => {
        return `/list/${catId}/${sort}/${nationality}/${payment}/${boundary}/${pvideo}/${filterMask}/0`
    };
    const paginateOnChange = (e, pageNumber) => {
        navigate({
            pathname: `/list/${catId}/${sort}/${nationality}/${payment}/${boundary}/${pvideo}/${filterMask}/${pageNumber - 1}`,
        })
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={'subtitle1'} color={'primary'}>{listName}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    {
                        Sorts.map((sortItem => <Grid key={sortItem['parameter']} item><Link
                            to={GeneratUrl(sortItem['parameter'])}><Chip
                            color={sort === sortItem['parameter'] ? 'primary' : 'default'}
                            label={sortItem['title']}/></Link> </Grid>))
                    }

                </Grid>
            </Grid>

            {

                (newList.length && (
                    <>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                {
                                    newList.map((rowData, index) => (
                                            <ClipItem key={'list-' + index.toString()} sonItem={rowData}
                                                      columns={{xs: 12, sm: 4, md: 3}}/>
                                        )
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent={'center'}>
                                <Grid item>
                                    <Pagination count={parseInt(pageNumber) + (items.length < pageSize ? 1 : 2)}
                                                page={parseInt(pageNumber) + 1}
                                                onChange={paginateOnChange}/>

                                </Grid>
                            </Grid>

                        </Grid>
                    </>
                )) || (
                    <Grid item xs={12}>
                        {
                            (loading && <SkeletonRow rows={24} columns={{xs: 12, sm: 4, md: 3}} type={'list'}/>) ||
                            <NoContent/>
                        }

                    </Grid>
                )

            }

        </Grid>
    )

}

export default memo(ListView)

