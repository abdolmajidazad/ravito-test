import {useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import {useTranslation} from "react-i18next";
import {Grid, Container, Typography, CssBaseline, Box} from '@mui/material';
import SiteBarComponent from "../../Components/Features/SiteBar";
import SiteMenuComponent from "../../Components/Features/SiteMenu";
import {useSelector} from "react-redux";
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, drawerwidth }) => ({
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
    const {t} = useTranslation('translate');
    const location = useLocation();
    const {DrawerOpen, drawerWidth} = useSelector(state=>state.site.siteLocalGeneral);
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
            {/*<Navbar expand="lg" style={{padding: 0}}>*/}
            {/*<Container fluid={'xxl'}>*/}
            {/*<Navbar.Brand as={Link} to={'/'} style={{padding: 0}}>*/}
            {/*<img className={'siteLogo'} src={Logo} alt={t('siteName')}/>*/}
            {/*</Navbar.Brand>*/}
            {/*</Container>*/}
            {/*</Navbar>*/}
            {/*<AppBar position="static">*/}
            {/*<Container maxWidth="xl">*/}
            {/*<Toolbar disableGutters>*/}
            {/*<Typography*/}
            {/*variant="h6"*/}
            {/*noWrap*/}
            {/*component="div"*/}
            {/*sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}*/}
            {/*>*/}
            {/*<img className={'siteLogo'} src={Logo} alt={t('siteName')}/>*/}
            {/*</Typography>*/}
            {/*</Toolbar>*/}
            {/*</Container>*/}
            {/*</AppBar>*/}

            <SiteBarComponent/>
            {/*<Navbar className={"siteMenu"} expand={true} sticky={'top'} style={{backgroundColor:"#fff"}}>*/}
            {/*<Container fluid={'xxl'}>*/}
            {/*<Nav className="me-auto" variant={'tabs'} style={{width: '100%'}}>*/}
            {/*<Nav.Link as={Link} to={'/'} className={tab==='main' ? "active" : ''}>{t('siteName')}</Nav.Link>*/}
            {/*<Nav.Link as={Link} to={'/category/0'} className={tab==='category' ? "active" : ''}>{t('category')}</Nav.Link>*/}
            {/*<Nav.Link as={Link} to={'/panel/login'}>{t('login')}</Nav.Link>*/}
            {/*</Nav>*/}
            {/*</Container>*/}
            {/*</Navbar>*/}
            <Main open={DrawerOpen} drawerwidth={drawerWidth} style={{width:'100%'}}>
                <SiteMenuComponent/>
                <Grid container style={{marginTop:75}}>
                    <Grid item xs={12}>
                        <Container maxWidth="xl">
                            <Outlet/>
                        </Container>
                    </Grid>
                </Grid>

            </Main>
        </Grid>
    )
}

export default SiteLayout