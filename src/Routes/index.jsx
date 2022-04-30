import {Routes, Route} from 'react-router-dom'
import SiteLayout from "../Layouts/Site";


import Dashboard from "../Screens/Site/Dashboard";
import Category from "../Screens/Site/Category";
import CategoryList from "../Screens/Site/Category/CategoryList";
import SearchPage from "../Screens/Site/Search";
import List from "../Screens/Site/List";
import ContentPage from "../Screens/Site/Content";




import {PostLogin} from "../Layouts/Panel";
import PreLogin from "../Layouts/Panel/PreLogin";
import PanelDashboard from "../Screens/Panel/PostLogin/Dashboard";
import PanelLogin from "../Screens/Panel/PreLogin/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {GetErrorMessage, SnackbarOptions} from "../Action/Setting";
import {SiteSnackbarDispatcher} from "../Store/Slice/Site/Local/general.slice";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {UserData} from "../Store/Slice/Panel/account.slice";
import NotFound from "../Screens/NotFound";



function  SiteRoutes(){
    const { enqueueSnackbar } = useSnackbar();
    const {t} = useTranslation('translate');
    const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(UserData())
    // },[dispatch]);
    const { siteError} = useSelector(state=>state.site.siteLocalGeneral);
    useEffect(()=>{
        if(siteError){
            enqueueSnackbar(siteError?.data?.errorMessage || t(GetErrorMessage(siteError?.data?.errorCode)),SnackbarOptions[siteError['type'] || 'ERROR']);
            dispatch(SiteSnackbarDispatcher(null))
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[siteError]);
    return(
        <Routes>
            <Route element={<SiteLayout menuType={'fixed'}/>}>
                <Route path="/" element={<Dashboard/>} />
            </Route>
            <Route element={<SiteLayout menuType={'drawer'}/>}>
                <Route element={<Category/>}>
                    <Route path="/category/:pageNumber" element={<CategoryList/>} />
                    <Route path="/category/:pageNumber/:catId" element={<CategoryList/>} />
                </Route>
                <Route path="/list/:catId/:sort/:nationality/:payment/:boundary/:pvideo/:filterMask/:pageNumber" element={<List/>} />
                <Route path="/search/:text/:pageNumber" element={<SearchPage/>} />
                <Route path="/content/:uuid" element={<ContentPage/>} />

            </Route>
            <Route path="/panel">
                <Route element={<PreLogin/>}>
                    <Route path="/panel/login" element={<PanelLogin/>} />
                </Route>
                <Route element={<PostLogin/>}>
                    <Route path="/panel/dashboard" element={<PanelDashboard/>} />
                    {/*<Route element={<Category/>}>*/}
                        {/*<Route path="/panel/category/:pageNumber(/:categoryId)" element={<CategoryList/>} />*/}
                    {/*</Route>*/}
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )

}
export default SiteRoutes