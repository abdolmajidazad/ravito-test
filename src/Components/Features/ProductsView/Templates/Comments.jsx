import {Fragment, useState, useMemo} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {useEffect} from "react";
import {List as commentList, resetState, changePage} from "../../../../Store/Slice/Site/comment.slice";
import {Grid} from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import LoadingButton from '@mui/lab/LoadingButton';
import {useTranslation} from "react-i18next";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
function setPageNumberFunc(num) {
    return num
}

export default function Comments() {
    const {data = {}, loading = false, nextPage=false, pageNumber=0} = useSelector(state => state.site.siteComment);
    // const [pageNumber, setPageNumber] = useState(0);
    const [siteParams, setSiteParams] = useState({});
    const {t} = useTranslation('translate');
    console.log("data", data);
    const dispatch = useDispatch();
    const params = useParams();

    // useMemo(() => setPageNumberFunc(pageNumber), [pageNumber])
    useEffect(() => {
        console.log("siteParams", siteParams, params)
        setSiteParams(params);
        if(siteParams['uuid'] && siteParams['uuid']!==params['uuid']){
            dispatch(resetState());
            if(!pageNumber){
                getData()
            }
        }else{
            getData()
        }

        function getData(){
            dispatch(commentList({
                marketPort: 2,
                marketVersion: 40803,
                order: "date",
                pageNumber: pageNumber,
                pageSize: 10,
                uuid: params['uuid'],
            }));
        }

    }, [dispatch, params, pageNumber]);
    // useEffect(() => {
    //     setPageNumber(0);
    //     dispatch(resetState());
    // }, [dispatch, params]);
    console.log("data", data)
    return (
        <Grid container>

            <Grid item xs={12}>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {
                        data?.comments?.map((comment, index) => (
                            <Fragment key={index.toString()}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                                                <Grid item>
                                                    {comment['userName']}
                                                </Grid>
                                                {
                                                    comment['subdate'] && (
                                                        <Grid item>
                                                            <Typography variant={'caption'} color="text.secondary">
                                                                <ReactTimeAgo
                                                                    date={new Date(comment['subdate'])}/></Typography>
                                                        </Grid>
                                                    ) || null
                                                }

                                            </Grid>
                                        }
                                        secondary={
                                            <Fragment>
                                                {comment['comment']}
                                            </Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                            </Fragment>
                        ))
                    }
                </List>
            </Grid>
            {
                nextPage && (
                    <Grid item xs={12}>
                        <Grid container justifyContent={'flex-end'}>
                            <Grid item>
                                <LoadingButton
                                    onClick={() => dispatch(changePage())}
                                    endIcon={<ReadMoreIcon />}
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                >
                                    {t('more')}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Grid>
                ) || null
            }

        </Grid>
    );
}
