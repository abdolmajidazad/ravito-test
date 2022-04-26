import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {useTranslation} from "react-i18next";
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
export default function MenuItems() {
    const {t} = useTranslation('translate');
    return (

            <MenuList style={{position: 'sticky', top: 70}}>
                <MenuItem>
                    <ListItemIcon>
                        <HomeOutlinedIcon fontSize="small" color={'primary'}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography component={'h2'} variant="caption">
                            <Box sx={{fontWeight: 'bold'}}>{t('home')}</Box>
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <OndemandVideoOutlinedIcon fontSize="small" color={'primary'}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography component={'h2'} variant="caption">
                            <Box sx={{fontWeight: 'bold'}}>{t('followedVideos')}</Box>
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ThumbUpOutlinedIcon fontSize="small" color={'primary'}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography component={'h2'} variant="caption">
                            <Box sx={{fontWeight: 'bold'}}>{t('favoriteVideos')}</Box>
                        </Typography>
                    </ListItemText>
                </MenuItem>
            </MenuList>
    );
}
