import {Grid} from "@mui/material";
import {ClipItem} from "./index";
import * as React from "react";

function RelatedRows(props) {
    const {relatedRows = [], columns = {xs: 6, sm: 4, md: 3}} = props;
    console.log("relatedRows", relatedRows)
    return (
        <Grid container spacing={1}>
            {relatedRows?.map((related, index) => (
                <Grid item key={"related-" + index.toString()} xs={12}>

                    <Grid container spacing={1}>
                        {related?.items?.map((relatedItem, indexItem) => (
                            <ClipItem key={'relative-row-' + indexItem.toString()}
                                      sonItem={relatedItem}
                                      itemAlignment={'Horizontal'}
                                      columns={columns}/>
                        ))}
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

export default RelatedRows