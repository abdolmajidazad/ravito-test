import {useEffect, memo, useState} from 'react';
// import OpenPlayerJS from 'openplayer';

// import {Helmet} from "react-helmet";
import {useParams} from 'react-router-dom';
import {Stream} from "../../../Store/Slice/Site/download.slice";
import {useDispatch, useSelector} from "react-redux";
import '../../../assets/Resources/openplayer/openplayer.min.css';
// import 'openplayer/dist/openplayer.min.css';
import {GetAssetUrl} from "../../../Action/Setting";

function Player() {
    const {data = {}} = useSelector(state => state.site.siteDownload)
    const [playerObj, setPlayer] = useState();
    const [playerLink, setPlayerLink] = useState();
    let dispatch = useDispatch();
    useEffect(() => {
        if (Object.keys(data).length)
            setPlayerLink(`http://www.raavito.com/ws/dl/movie/${data['downloadTicket']}/${params['uuid']}.mpd`);
    }, [data]);
    useEffect(() => {
        if (playerLink && Object.keys(data).length) {
            scriptLoaded()
        }

    }, [playerLink, data]);

    const params = useParams();
    useEffect(() => {
        setPlayerLink(null)
        dispatch(Stream({
            marketPort: 2,
            marketVersion: 40803,
            uuid: params['uuid'],
            stream: "mpd",
        }));
    }, [dispatch, params]);


    const scriptLoaded = () => {
        let playerMain = new window.OpenPlayerJS(
            "my-player",
            {
                controls: {
                    layers: {
                        left: ['play', 'time', 'volume'],
                        middle: ['progress'],
                        right: ['levels', 'audioLevels', 'captions', 'settings', 'fullscreen'],
                        // right: ['levels', 'captions', 'settings', 'fullscreen'],
                    }
                }
            }
        );
        playerMain.init();
        let player = playerMain.getElement();
        player.addEventListener("timeupdate", function (ev) {
            console.log("----------------timeupdate------------------",player.currentTime)

        });
        player.addEventListener("play", function (e) {
            console.log("----------------play------------------",player.currentTime)

        });
        player.addEventListener("waiting", function (e) {
            console.log("----------------waiting------------------",player.currentTime)

        });
        player.addEventListener("playing", function (e) {
            console.log("----------------playing------------------",player.currentTime)
        });
        player.addEventListener("pause", function (e) {
            console.log("----------------pause------------------",player.currentTime)
        });
        player.addEventListener("seeking", function (e) {
            console.log("----------------seeking------------------",player.currentTime)
        });
        player.addEventListener("seeked", function (e) {
            console.log("----------------seeked------------------",player.currentTime)

        });
        player.addEventListener("ended", function (e) {
            console.log("----------------ended------------------",player.currentTime)

        });


    }
    return playerLink && (
        <div style={{direction: 'ltr', width:'100%'}} >
            <video
                style={{width:'100%'}}
                id="my-player"
                className="op-player__media"
                poster={GetAssetUrl('banner', params['uuid'], 'CLIP')}
                controls
                playsInline
            >
                <source src={playerLink}></source>
            </video>

        </div>
    ) || null

}

export default Player