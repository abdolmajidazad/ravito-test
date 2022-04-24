import {useState} from 'react';
import Divider from '@mui/material/Divider';
import {Drawer, IconButton, List, ListItem, ListItemText} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useDispatch, useSelector} from "react-redux";
import {DrawerChangeStatus} from "../../../Store/Slice/Site/Local/general.slice";
import HomeIcon from '@mui/icons-material/Home';
import {useTranslation} from "react-i18next";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
export default function SiteMenuComponent() {
    const {DrawerOpen, drawerWidth} = useSelector(state=>state.site.siteLocalGeneral);
    const dispatch = useDispatch();
    const theme = useTheme();
    const {t} = useTranslation('translate');
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="left"
            open={DrawerOpen}
        >
            <DrawerHeader>
                <IconButton onClick={ ()=>dispatch(DrawerChangeStatus())}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>

                    <ListItem button component={Link} to={'/'}>
                        <ListItemIcon>
                            {<HomeIcon />}
                        </ListItemIcon>
                        <ListItemText primary={t('home')} />
                    </ListItem>
            </List>
            <Divider />

        </Drawer>
    );
}
