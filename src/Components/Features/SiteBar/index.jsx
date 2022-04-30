import {useState, memo} from 'react';
import {useDispatch} from "react-redux";
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Logo} from "../../../assets";
import {useTranslation} from "react-i18next";
import {DrawerChangeStatus} from '../../../Store/Slice/Site/Local/general.slice'
import {Link} from "react-router-dom";
import {DrawerMenu} from '../SiteMenu'
import SignUserComponent from "../SignUser";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function SiteBarComponent(props) {
    const {menuType = 'fixed'} = props;
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const {t} = useTranslation('translate');
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleOpenDrawer = () => {
        dispatch(DrawerChangeStatus());
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
        >
            <MenuItem component={Link} to={'/panel/login'}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                >
                    <AccountCircle/>
                </IconButton>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" color={"secondary"}>
                <Toolbar>
                    {
                        (menuType === 'fixed' && (
                            <IconButton
                                size="large"
                                edge="start"
                                onClick={handleOpenDrawer}
                                aria-label="open drawer"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                        )) || <DrawerMenu/>
                    }


                    <Link to={'/'}>
                        <img className={'siteLogo'} src={Logo} alt={t('siteName')}/>
                    </Link>

                    <Box sx={{flexGrow: 1}}>
                        <Search className={'searchBox'}>
                            <SearchIconWrapper>
                                <SearchIcon color={'disabled'}/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                className={'searchInput'}
                                placeholder={t('searchPlaceholder')}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </Search>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>

                        <SignUserComponent menuId={menuId}/>

                    </Box>

                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
export default  memo(SiteBarComponent)