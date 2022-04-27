import { useState} from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuItems from "./MenuItems";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function SwipeableTemporaryDrawer() {
    const [state, setState] = useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };



    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <MenuItems/>
        </Box>
    );

    return (
        <>
            {/*<Button onClick={toggleDrawer('left', true)}>*/}

                <IconButton
                    size="large"
                    onClick={toggleDrawer('left', true)}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
            {/*</Button>*/}
            {/*<IconButton*/}
                {/*size="large"*/}
                {/*edge="start"*/}
                {/*onClick={toggleDrawer('left', true)}*/}
                {/*aria-label="open drawer"*/}
                {/*sx={{ mr: 2 }}*/}
            {/*>*/}
                {/*<MenuIcon />*/}
            {/*</IconButton>*/}
            <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
        </>
    );
}
