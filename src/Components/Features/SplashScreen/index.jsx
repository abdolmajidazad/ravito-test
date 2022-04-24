import {Splash} from "../../../assets";
import {useTranslation} from "react-i18next";

function SplashScreen() {
    const {t} = useTranslation('translate');
    return (
        <div className={'splashScreen'}>
           <img src={Splash} alt={t('siteName')}/>
        </div>
    )

}

export default SplashScreen