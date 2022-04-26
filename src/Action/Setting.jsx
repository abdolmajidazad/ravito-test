import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from "@emotion/react";

export const GetAssetUrl = (state, id, type, versionCode = 0, index = 0, quality = 'high', realName, imageType = 'png') => {

    let resSite = `${window.location.protocol}//res.charkhoneh.com`;
    switch (state) {
        case 'icon':
            return `${resSite}/ws/resource/icon/${type}/${id}${versionCode ? '/' + versionCode : ''}`;
        case 'banner':
            return `${resSite}/ws/resource/banner/${quality}/${type}/${id}/${versionCode}`;
        case 'screen':
            return `${resSite}/ws/resource/sc/${type}/${quality}/${id}/${index}/${versionCode}`;
        case 'ads':
            return `${resSite}/ws/resource/adv/image/${id}`;
        case 'avatar':
            return `${resSite}/ws/resource/avatar/${id}`;
        case 'proAvatar':
            return `${resSite}/ws/resource/proAvatar/${id}`;
        case 'author':
            return `${resSite}/ws/resource/icon/AUTHOR/${id}`;
        case 'static':
            return `views/resource/images.2/${realName}.${imageType}`;
        case 'asset':
            return `${resSite}/ws/resource/asset/${id}`;
        default:
            return ''

    }

};


export const ApiGeneralParameter = {
    marketPort: 2,
    marketVersion: 40803
};


export const SnackbarOptions = {
    SUCCESS: {
        variant: 'success'
    },
    ERROR: {
        variant: 'error'
    },
    INFO: {
        variant: 'info'
    },
    WARNINNG: {
        variant: 'warning'
    }

};


export const GetErrorMessage = (errorCode) => {
    let errors = {
        101: 'captchaExpired',
        104: 'captchaSecurity',
        109: 'mobileSecurity',
        170: 'captchaError',
    };

    return errors[errorCode]
};


export const GetDuration = (sec) => {

    /**
     * check entrance parameter is integer number
     * @type {Number}
     */
    let sec_num = parseInt(sec, 10); // don't forget the second param

    /**
     * get hours number of entrance parameter
     * @type {number}
     */
    let hours = Math.floor(sec_num / 3600);

    /**
     * get minutes number of entrance parameter from hours number
     * @type {number}
     */
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);

    /**
     * get seconds number of entrance parameter from minutes and hours
     * @type {number}
     */
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    /**
     * generate tile format of entrance parameter with hours , minutes and second
     * and return it
     */


    // if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (hours) {
        return hours + ':' + minutes + ':' + seconds;
    } else {
        return minutes + ':' + seconds;
    }

};



export const useIsWidthUp = (breakpoint) => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}
export const  useIsWidthDown=(breakpoint) =>{
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(breakpoint));
}