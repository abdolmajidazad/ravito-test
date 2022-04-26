import {useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import { styled } from '@mui/material/styles';
import {Grid, Container, CssBaseline} from '@mui/material';
import SiteBarComponent from "../../Components/Features/SiteBar";
import  {FixedMenu} from "../../Components/Features/SiteMenu";
import {useSelector} from "react-redux";
import {useIsWidthDown, useIsWidthUp} from "../../Action/Setting";
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
function SiteLayout() {
    const location = useLocation();

    const {DrawerOpen, drawerWidth} = useSelector(state=>state.site.siteLocalGeneral);
    const isMdUp = useIsWidthUp("md");
    const isMdDown = useIsWidthDown("md");
    console.log("isMdDown", isMdDown)
    console.log("isMdUp", isMdUp)
    // const [tab, setTab] =  useState('main');
    useEffect(() => {
        if (location.pathname.startsWith('/category')) {
            // setTab('category')
        } else {
            // setTab('main')
        }

    }, [location]);
    return (

        <Grid container>
            <CssBaseline />

            <SiteBarComponent/>
            <Main open={DrawerOpen} drawerwidth={drawerWidth} style={{width:'100%'}}>
                <Grid container >
                    {
                        (!DrawerOpen && location.pathname==='/' && (
                            <Grid item xs={2} style={{marginTop:60}}>
                                <FixedMenu/>
                            </Grid>
                        ))
                    }

                    <Grid item xs={(!DrawerOpen && location.pathname==='/') ? 10 : 12} style={{marginTop:75}}>
                        <Container fluid={'xxl'} maxWidth={(!DrawerOpen && location.pathname==='/') ? "md" : 'l'}>
                            <Outlet/>
                        </Container>
                    </Grid>
                </Grid>

            </Main>
        </Grid>
    )
}

export default SiteLayout