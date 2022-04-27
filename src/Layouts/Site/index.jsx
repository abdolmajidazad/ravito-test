import {useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import { styled } from '@mui/material/styles';
import {Grid, Container, CssBaseline} from '@mui/material';
import SiteBarComponent from "../../Components/Features/SiteBar";
import  {FixedMenu} from "../../Components/Features/SiteMenu";
import {useSelector} from "react-redux";
import StickyFooter from "./StickyFooter";
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        // flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);
function SiteLayout(props) {
    const {menuType='fixed'} =props;
    const location = useLocation();

    const {DrawerOpen, drawerWidth} = useSelector(state=>state.site.siteLocalGeneral);
    // const isMdUp = useIsWidthUp("md");
    // const isMdDown = useIsWidthDown("md");

    useEffect(()=>{
    },[location]);
    return (

        <Grid container>
            <CssBaseline />

            <SiteBarComponent menuType={menuType}/>
            <Main open={DrawerOpen} drawerwidth={drawerWidth} style={{width:'100%'}}>
                <Grid container >
                    {
                        ((!DrawerOpen && menuType==='fixed')  && (
                            <Grid item xs={2} style={{marginTop:60}}>
                                <FixedMenu/>
                            </Grid>
                        ))
                    }

                    <Grid item xs={(!DrawerOpen && menuType==='fixed') ? 10 : 12} style={{marginTop:75}}>
                        <Container fluid={'xxl'} maxWidth={(!DrawerOpen && menuType==='fixed')  ? "md" : 'l'}>
                            <Outlet/>
                        </Container>
                    </Grid>
                </Grid>

            </Main>
           <Grid item xs={12}>
               <StickyFooter/>
           </Grid>
        </Grid>
    )
}

export default SiteLayout