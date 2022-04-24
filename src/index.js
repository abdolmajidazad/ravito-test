import React, {Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import {store} from './Store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import Fa from './i18n/Fa';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { pink} from '@mui/material/colors';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import './index.css';
import SplashScreen from "./Components/Features/SplashScreen";
import TimeAgo from 'javascript-time-ago'
// TimeAgo.addDefaultLocale(Fa);
import {now, long,short,mini} from "./i18n/locales.fa";
console.log("now, long,short,mini", now, long,short,mini)
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
})
const outerTheme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: pink[500],
        },
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
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={outerTheme}>
                <I18nextProvider i18n={i18n}>
                    <BrowserRouter>
                        <Provider store={store}>
                            <SiteRoutes/>
                        </Provider>
                    </BrowserRouter>
                </I18nextProvider>
            </ThemeProvider>
        </CacheProvider>
    </Suspense>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
