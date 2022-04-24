import {Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const data = [1, 2, 3, 4, 5, 6, 7];

function SkeletonRow(props) {
    const {loading = false} = props;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Skeleton width={'40%'}/>
                <Skeleton width={'60%'}/>
            </Grid>
            {data.map((item, index) => (
                <Fragment key={'SkeletonRow-' + index}>

                    <Grid item  xs={12} sm={4} md={3}>

                        <Skeleton variant="rectangular" height={118}/>
                        <Skeleton/>
                        <Skeleton/>
                    </Grid>
                </Fragment>
                ))
                }
                </Grid>
            );
            }

            SkeletonRow.propTypes = {
            loading: PropTypes.bool,
        };


            export default SkeletonRow

