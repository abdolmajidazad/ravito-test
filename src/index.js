import React, {Suspense, lazy, useContext} from 'react';
import {createRoot} from 'react-dom/client';
import {store} from './Store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import './index.css';
import SplashScreen from "./Components/Features/SplashScreen";
import TimeAgo from 'javascript-time-ago'
import {now, long, short, mini} from "./i18n/locales.fa";
import {SnackbarProvider} from 'notistack';
import {Slide} from "@mui/material";
import {AuthenticationContext, AuthenticationProvider} from './AuthenticationContext'
const SiteRoutes = lazy(() => import('./Routes'));
const container = document.getElementById('root');
const root = createRoot(container);
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


TimeAgo.addDefaultLocale({
    locale: 'fa',
    now: now,
    long: long,
    short: short,
    mini: mini,
});
const outerTheme = createTheme({
    direction: 'rtl',
    palette: {
        // mode: 'dark',
        primary: {
            main: '#EF306F',
        },
        secondary: {
            main: '#FFFFFF',
        }
    },
    typography: {
        fontFamily: [
            "IRANSans",
            "Tahoma",
            "Helvetica Neue",
            "Arial",
            "sans-serif"
        ].join(",")
    }
});

root.render(
    <Suspense fallback={<SplashScreen/>}>
        <AuthenticationProvider >
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                TransitionComponent={Slide}
                // iconVariant={{
                //     success: '???',
                //     error: '??????',
                //     warning: '??????',
                //     info: '??????',
                // }}
                // preventDuplicate
            >
                <ThemeProvider theme={outerTheme}>
                    <CacheProvider value={cacheRtl}>
                        <I18nextProvider i18n={i18n}>
                            <BrowserRouter>
                                <Provider store={store}>
                                    <SiteRoutes/>
                                </Provider>
                            </BrowserRouter>
                        </I18nextProvider>
                    </CacheProvider>
                </ThemeProvider>
            </SnackbarProvider>


            {/*<UserNameInput />*/}
            {/*<UserInfoFun />*/}
        </AuthenticationProvider>
    </Suspense>,
);


// function UserNameInput() {
//     const { userInfo, setUserInfo } = useContext(AuthenticationContext);
//     console.log("userName, setUserName ", userInfo, setUserInfo )
//     const changeHandler = (event) => setUserInfo({
//         name:event.target.value
//     });
//
//     return <input type="text" value={userInfo['name']} onChange={changeHandler} />;
// }
//
// function UserInfoFun() {
//     const { userInfo } = useContext(AuthenticationContext);
//     return <span>{userInfo['name']}</span>;
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
