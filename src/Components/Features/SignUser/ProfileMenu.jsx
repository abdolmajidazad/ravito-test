import {useState, useRef, useContext, Fragment} from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from "axios";
import {AuthenticationContext} from "../../../AuthenticationContext";
import {useTranslation} from "react-i18next";

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function ProfileMenuComponent() {
    const {t} = useTranslation('translate');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const {setUserInfo} = useContext(AuthenticationContext);

    const signOut = async () => {
        try {
            const {data} = await axios.post(
                `/ws/account/signout`
                , {});

            setUserInfo({});
        } catch (e) {
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Fragment>

            <IconButton
                size="large"
                ref={anchorRef}
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label="account of current user"
                aria-haspopup="menu"
                onClick={handleToggle}
            >
                <AccountCircle/>
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    <MenuItem
                                        onClick={signOut}
                                    >
                                        {t('signOut')}
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    );
}
