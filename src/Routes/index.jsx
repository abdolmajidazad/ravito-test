import {Routes, Route} from 'react-router-dom'
import SiteLayout from "../Layouts/Site";




import Dashboard from "../Screens/Site/Dashboard";
import Category from "../Screens/Site/Category";
import SearchPage from "../Screens/Site/Search";
import CategoryList from "../Screens/Site/Category/list";
import ContentPage from "../Screens/Site/Content";




import {PostLogin} from "../Layouts/Panel";
import PreLogin from "../Layouts/Panel/PreLogin";
import PanelDashboard from "../Screens/Panel/PostLogin/Dashboard";
import PanelLogin from "../Screens/Panel/PreLogin/Login";



function  SiteRoutes(){

    return(
        <Routes>
            <Route element={<SiteLayout/>}>
                <Route path="/" element={<Dashboard/>} />
                <Route element={<Category/>}>
                    <Route path="/category/:pageNumber" element={<CategoryList/>} />
                    <Route path="/category/:pageNumber/:categoryId" element={<CategoryList/>} />
                </Route>
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
        </Routes>
    )

}
export default SiteRoutes