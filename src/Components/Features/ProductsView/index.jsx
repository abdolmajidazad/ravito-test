import {CategoryRow, CategoryBar} from "./Templates";
import {Grid, Typography} from '@mui/material'
import SliderComponent from "../Slider";

// import SliderComponent from "../Slider";


function ProductsView(props) {
    const {rows = [], type = 'main'} = props;
    const loadTemplate = (rowData, index) => {
        if (type === 'main') {
            // return <SliderComponent key={'ProductsView-'+index.toString()} rowData={rowData}/>
            return <CategoryRow key={'ProductsView-' + index.toString()} rowData={rowData} index={index}/>
        } else if (type === 'bar') {
            return <CategoryBar key={'ProductsView-' + index.toString()} rowData={rowData} index={index}/>
        } else {
            return null
        }

    };
    return rows.map((rowData, index) => (

        <Grid container key={index.toString()}>
            <Grid item xs={12}>
                <Typography variant={'subtitle1'}>{rowData?.categoryRow?.title}</Typography>
                <Typography variant={'subtitle2'}>{rowData?.categoryRow?.desc}</Typography>
            </Grid>
            <Grid item xs={12}>
                <SliderComponent key={'ProductsView-' + index.toString()} rowData={rowData} index={index}/>
                {/*{loadTemplate(rowData, index)}*/}
            </Grid>
        </Grid>
    ))

}

export default ProductsView

