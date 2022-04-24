import {Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const data = [1, 2, 3, 4, 5, 6, 7];

function SkeletonRow(props) {
    const {rows = 1} = props;

    return Array.from(new Array(rows)).map((item, index)=>(
        <Grid container spacing={2} style={{height: 255,overflow: 'hidden', marginBottom:10}}>
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
}

export default SkeletonRow

