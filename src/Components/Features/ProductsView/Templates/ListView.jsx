import {memo, useEffect} from 'react';
import {Grid, Pagination, Typography} from '@mui/material'
import {useTranslation} from "react-i18next";
import {Link, useNavigate, useParams} from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useDispatch, useSelector} from "react-redux";
import {List} from "../../../../Store/Slice/Site/list.slice";
import {ClipItem} from "./index";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function ListView() {
    const {t} = useTranslation('translate');
    const {data = {}, pageSize = 25} = useSelector(state => state.site.siteList);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        params['pageNumber'] = parseInt(params['pageNumber']);
        params['catId'] = parseInt(params['catId']);
        params['filterMask'] = parseInt(params['filterMask']);
        params['pageSize'] = pageSize;
        dispatch(List(params));

    }, [dispatch, params]);

    let {items = [], listName} = data;
    let newList = [...items.slice(0, pageSize - 1)];
    const paginateOnChange = (e, pageNumber) => {
        const {
            catId, sort,
            nationality,
            payment,
            boundary = 'w',
            pvideo,
            filterMask
        } = params;
        navigate({
            pathname: `/list/${catId}/${sort}/${nationality}/${payment}/${boundary}/${pvideo}/${filterMask}/${pageNumber - 1}`,
        })
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={'subtitle1'} color={'primary'}>{listName}</Typography>

            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
                    </Grid>
                    <Grid item>
                        <Chip
                            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                            label="Avatar"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>



            </Grid>
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
                        <Pagination count={parseInt(params['pageNumber']) + (items.length < pageSize ? 1 : 2)}
                                    page={parseInt(params['pageNumber']) + 1}
                                    onChange={paginateOnChange}/>

                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )

}

export default memo(ListView)

