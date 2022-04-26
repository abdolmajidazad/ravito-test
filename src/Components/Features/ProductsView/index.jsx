import { RowSlider} from "./Templates";
import {Grid, Typography} from '@mui/material'
import {useTranslation} from "react-i18next";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
function ProductsView(props) {
    const {rows = []} = props;
    const {t} = useTranslation('translate');
    // const loadTemplate = (rowData, index) => {
    //     if (type === 'main') {
    //         // return <SliderComponent key={'ProductsView-'+index.toString()} rowData={rowData}/>
    //         return <CategoryRow key={'ProductsView-' + index.toString()} rowData={rowData} index={index}/>
    //     } else if (type === 'bar') {
    //         return <CategoryBar key={'ProductsView-' + index.toString()} rowData={rowData} index={index}/>
    //     } else {
    //         return null
    //     }
    //
    // };
    return rows.map((rowData, index) => (
        <Grid container key={index.toString()}>
            <Grid item xs={12}>
               <Grid container alignItems={'center'} justifyContent={'space-between'}>
                   <Grid item>
                       <Typography variant={'subtitle1'}>{rowData?.categoryRow?.title}</Typography>
                       <Typography variant={'subtitle2'}  color="text.secondary">{rowData?.categoryRow?.desc}</Typography>
                   </Grid>
                   <Grid item >
                       <Typography variant={'caption'}  color="primary"> {t('showAll')} <ArrowBackIosIcon style={{fontSize:10}} color="primary"/> </Typography>
                   </Grid>

               </Grid>
            </Grid>
            <Grid item xs={12}>
                <RowSlider key={'ProductsView-' + index.toString()} rowData={rowData} index={index}/>
            </Grid>
        </Grid>
    ))

}

export default ProductsView

