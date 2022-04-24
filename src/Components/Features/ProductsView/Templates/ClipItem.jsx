import {Card, CardContent, CardMedia, Grid, Typography, Rating} from "@mui/material";
import {Link} from "react-router-dom";
import {GetAssetUrl} from "../../../../Action/Setting";
import ReactTimeAgo from 'react-time-ago'
function ClipItem(props){
    const {sonItem={}, columns={xs:12,sm:6,md:4}} = props;
    return(
        <Grid component={Link} to={`/content/${sonItem['uuid']}`} item xs={columns['xs']} sm={columns['sm']} md={columns['md']}>
            <Card
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >
                <CardMedia
                    component="img"
                    image={GetAssetUrl('icon', sonItem['uuid'], 'CLIP', sonItem['versionCode'])}
                    alt="random"
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography variant={'subtitle2'} noWrap={true}> {sonItem.title}</Typography>
                    <Grid container alignItems={'center'} justifyContent={'space-between'}>
                        <Grid item>
                            <Typography variant={'caption'} color="text.secondary">  <ReactTimeAgo date={sonItem['time']}/></Typography>
                        </Grid>
                        <Grid item >
                            <Rating style={{marginTop:5}} name="read-only" value={sonItem['rate']/2} readOnly  size="small" />

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}
export default ClipItem