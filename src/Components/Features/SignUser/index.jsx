import { useContext} from 'react';
import {AuthenticationContext} from "../../../AuthenticationContext";
import {useDispatch} from "react-redux";
import ProfileMenuComponent from "./ProfileMenu";
import SignDialogComponent from "./SignDialog";


export default function SignUser(props) {
    const {userInfo} = useContext(AuthenticationContext);

    return (
        <>
            {
                (userInfo['userName'] && (
                   <ProfileMenuComponent/>
                )) || (
                    <SignDialogComponent/>
                )
            }

        </>
    );
}
