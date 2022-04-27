import {Fragment} from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const data = [1, 2, 3, 4, 5, 6, 7];

function SkeletonRow(props) {
    const {rows = 1, type = 'row' ,columns={xs: 12, sm: 12, md: 12}} = props;

    const rowView = () => {
        return Array.from(new Array(rows)).map((item, index) => (
            <Grid key={index.toString()} container spacing={2}
                  style={{height: 255, overflow: 'hidden', marginBottom: 10}}>
                <Grid item xs={12}>
                    <Skeleton width={'30%'}/>
                    <Skeleton width={'40%'}/>
                </Grid>
                {data.map((item, index) => (
                    <Fragment key={'SkeletonRow-' + index}>
                        <Grid item xs={12} sm={4} md={3}>
                            <Skeleton variant="rectangular" height={118}/>
                            <Skeleton/>
                            <Skeleton/>
                        </Grid>
                    </Fragment>
                ))
                }
            </Grid>
        ))
    };
    const listView = () => {
        return (
            <Grid container spacing={2}>
                {Array.from(new Array(rows)).map((item, index) => (
                    <Grid key={index.toString()} item xs={columns['xs']} sm={columns['sm']} md={columns['md']}>
                                <Skeleton variant="rectangular" height={118}/>
                                <Skeleton/>
                                <Skeleton/>
                    </Grid>
                ))
                }
            </Grid>
        )
    };
    return type === 'row' ? rowView() : listView()

}

export default SkeletonRow

