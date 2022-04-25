export const GetAssetUrl = (state, id, type, versionCode = 0, index = 0, quality = 'high', realName, imageType = 'png') => {

    let resSite = `${window.location.protocol}//res.charkhoneh.com`;
    // let resSite = settings.marketPort === 2 ? `${$location.protocol()}://127.0.0.1:9000` : `${$location.protocol()}://res.parshub.com`;
    let newDate = new Date().getTime();
    switch (state) {
        case 'icon':
            return `${resSite}/ws/resource/icon/${type}/${id}${versionCode ? '/' + versionCode : ''}`;
        case 'banner':
            return `${resSite}/ws/resource/banner/${quality}/${type}/${id}/${versionCode}`;
        // case 'qr':
        //     return `${resSite}/ws/resource/qr/PURE/PIWB/160/${settings['panelId']}/${id}`;
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

    }

};


export const ApiGeneralParameter ={
    marketPort:2,
    marketVersion:40803
};


export const SnackbarOptions={
    SUCCESS:{
        variant:'success'
    },
    ERROR:{
        variant:'error'
    },
    INFO:{
        variant:'info'
    },
    WARNINNG:{
        variant:'warning'
    }

};


export const GetErrorMessage = (errorCode)=>{
    let errors ={
        101 : 'captchaExpired',
        104 : 'captchaSecurity',
        109 : 'mobileSecurity',
        170 : 'captchaError',
    }

    return errors[errorCode]
}