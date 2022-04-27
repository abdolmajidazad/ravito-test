import {Fragment, useState} from 'react';
import List from '@mui/material/List';
import {ListItem,InputAdornment} from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
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
import SendIcon from '@mui/icons-material/Send';

export default function Comments() {
    const {data = {}, loading = false, nextPage=false, pageNumber=0} = useSelector(state => state.site.siteComment);
    const [siteParams, setSiteParams] = useState({});
    const {t} = useTranslation('translate');
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
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
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params, pageNumber]);
    return (
        <Grid container>

            <Grid item xs={12}>
                <Grid container alignItems={'center'} justifyContent={"space-between"} >
                    <Grid item xs={1} >
                        <Grid container alignItems={'center'} justifyContent={"center"}>
                            <Grid item><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/></Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={11}>

                        <TextField
                            className={'commentInput'}
                            type="text"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <SendIcon />
                                    </InputAdornment>
                                ),
                            }}
                            // variant="standard"
                        />

                    </Grid>
                </Grid>
            </Grid>
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
                                                    (comment['subdate'] && (
                                                        <Grid item>
                                                            <Typography variant={'caption'} color="text.secondary">
                                                                <ReactTimeAgo
                                                                    date={new Date(comment['subdate'])}/></Typography>
                                                        </Grid>
                                                    )) || null
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
                (nextPage && (
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
                )) || null
            }

        </Grid>
    );
}
