import {Outlet} from 'react-router-dom';

function PostLogin() {
    return (
        <>
            <div style={{ padding:50, backgroundColor:'#000', color:"#fff"}}>Post Login</div>
            <Outlet/>
        </>
    )
}

export default PostLogin