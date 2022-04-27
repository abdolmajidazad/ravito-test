import {Card, CardContent, Grid, Typography, Rating} from "@mui/material";
import {Link} from "react-router-dom";
import {GetAssetUrl, GetDuration} from "../../../../Action/Setting";
import ReactTimeAgo from 'react-time-ago'
import {LazyLoadImage} from "react-lazy-load-image-component";

function ClipItem(props) {
    const {sonItem = {}, columns = {xs: 12, sm: 12, md: 12}, itemAlignment = 'Vertical'} = props;


    const VerticalItem = () => {
        return (
            <Grid component={Link} to={`/content/${sonItem['uuid']}`} item xs={columns['xs']} sm={columns['sm']} md={columns['md']}>
                <Card
                    sx={{height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'unset', borderRadius: 0}}
                >
                    <CardContent sx={{flexGrow: 1}} style={{padding: 0}}>
                        <Grid item style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <LazyLoadImage
                                alt={sonItem.title}
                                src={GetAssetUrl('icon', sonItem['uuid'], 'CLIP', sonItem['versionCode'])} // use normal <img> attributes as props
                            />
                            {
                                (sonItem['runtime'] && (
                                    <div className={'clipTimeOverlay'}>
                                        <div className={'duration'}>{GetDuration(sonItem['runtime'])}</div>
                                    </div>
                                )) || null
                            }

                        </Grid>
                        <Grid item xs={12} style={{padding: 5}}>
                            <Typography variant={'subtitle2'} noWrap={true}> {sonItem.title}</Typography>
                            <Grid item>
                                <Grid container alignItems={'center'} justifyContent={'flex-start'}>
                                    <Grid item>
                                        <Typography variant={'caption'} noWrap={true}
                                                    color="text.secondary"> {sonItem.publisher}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={'caption'} color="text.secondary">  {
                                            (sonItem['time'] && <>&nbsp;,&nbsp;<ReactTimeAgo date={sonItem['time']}/></>) || null
                                        }</Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                                <Grid item>
                                </Grid>
                                <Grid item>
                                    <Rating style={{marginTop: 5}} name="read-only" value={sonItem['rate'] / 2} readOnly
                                            size="small"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    };
    const HorizontalItem = () => {
        return (
            <Grid component={Link} to={`/content/${sonItem['uuid']}`} itemxs={columns['xs']} sm={columns['sm']} md={columns['md']}>
                <Card
                    sx={{height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'unset', borderRadius: 0}}
                >
                    <CardContent sx={{flexGrow: 1}} style={{padding: 0}}>
                        <Grid container alignItems={'flex-start'} justifyContent={'flex-start'}>
                            <Grid item xs={5} style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <LazyLoadImage
                                    alt={sonItem.title}
                                    src={GetAssetUrl('icon', sonItem['uuid'], 'CLIP', sonItem['versionCode'])} // use normal <img> attributes as props
                                    width={'100%'}
                                />
                                {
                                    (sonItem['runtime'] && (
                                        <div className={'clipTimeOverlay'}>
                                            <div className={'duration'}>{GetDuration(sonItem['runtime'])}</div>
                                        </div>
                                    )) || null
                                }

                            </Grid>
                            <Grid item xs={7} style={{padding: 5}}>
                                <Grid container alignItems={'flex-start'} justifyContent={'space-between'}
                                      direction={'column'}>


                                    <Grid item>
                                        <Typography variant={'subtitle2'} noWrap={true}> {sonItem.title}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems={'center'} justifyContent={'flex-start'}>
                                            <Grid item>
                                                <Typography variant={'caption'} noWrap={true}
                                                            color="text.secondary"> {sonItem.publisher}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant={'caption'} color="text.secondary">  {
                                                    (sonItem['time'] && <>&nbsp;,&nbsp;<ReactTimeAgo date={sonItem['time']}/></>) || null
                                                }</Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Rating style={{marginTop: 5}} name="read-only" value={sonItem['rate'] / 2}
                                                readOnly size="small"/>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                    </CardContent>
                </Card>
            </Grid>
        )
    };
    return (itemAlignment === 'Vertical' && VerticalItem()) || HorizontalItem()
}

export default ClipItem