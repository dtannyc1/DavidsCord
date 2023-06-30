import { useDispatch, useSelector } from "react-redux";
import './ChannelsPage.css';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import icon from '../../assets/Davescord-icon.svg'
import ServerList from "../ServerList";
import CurrentUserProfile from "../CurrentUserProfile";
import CreateServerModal from "./CreateServerModal";
import ServerNameHeader from "./ServerNameHeader";
import Searchbar from "./Searchbar";
import ChannelsList from "./ChannelsList";
import ServerDetailsMenu from "../ServerDetailsMenu";
import ChannelNameHeader from "./ChannelNameHeader";
import CreateChannelModal from "./CreateChannelModal";
import ChannelDetailsMenu from "./ChannelDetailMenu";
import MessageList from "./MessageList";
import SubscriberList from "./SubscriberList";
import FriendsNameHeader from "./FriendsNameHeader";
import { useRef } from "react";
import { fetchServers} from "../../store/server";
import { fetchUser } from "../../store/user";

const ChannelsPage = ({setWebsocketRestart}) => {
    const {serverId, channelId} = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.currentUserId);
    const servers = useSelector(state => state.servers);

    // const currentServer = useSelector(state => state.servers[serverId]);
    // const currentChannels = useSelector(state => state.channels);

    const [showServerModal, setShowServerModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState(false);
    const [showServerDetail, setShowServerDetail] = useState(false);
    const [showChannelDetail, setShowChannelDetail] = useState(false);

    const categoryName = useRef();

    // if ((serverId !== "@me" && channelId === undefined &&
    //     currentServer && currentServer.channels &&
    //     currentServer.channels.length > 0) ||
    //     (serverId !== "@me" && currentChannels && currentChannels[channelId] === undefined &&
    //     Object.keys(currentChannels).length > 0)) {

    //         if (Object.values(currentChannels).length > 0){
    //             let firstChannelId = Object.values(currentChannels)[0].id;
    //             return (
    //                 <Redirect to={`/channels/${serverId}/${firstChannelId}`}/>
    //             )
    //         }
    // }

    useEffect(() => {
        dispatch(fetchServers())
        dispatch(fetchUser(currentUserId))
    }, [dispatch, currentUserId])

    return (
        <div className="channels-page">
            <CreateServerModal visible={showServerModal} setVisible={setShowServerModal} setWebsocketRestart={setWebsocketRestart}/>
            <CreateChannelModal visible={showChannelModal} setVisible={setShowChannelModal} categoryName={categoryName} setWebsocketRestart={setWebsocketRestart}/>
            <ServerDetailsMenu visible={showServerDetail} setVisible={setShowServerDetail} />
            <ChannelDetailsMenu visible={showChannelDetail} setVisible={setShowChannelDetail} />
            <div className="channels-column1-holder">
                <div className="channels-column1">

                    <Link to='/channels/@me' className={(serverId === "@me") ? "icon selected" : "icon"}>
                        <img src={icon} alt="davescord-icon"/>
                        <div className="channels-left-selector"></div>
                    </Link>
                    <span className="tooltip">Direct Messages</span>
                    <hr className="channels-divider"/>

                    <ServerList/>

                    <div className="channels-add-server-button" onClick={() => setShowServerModal(true)}>
                        <div>+</div>
                        <span className="tooltip">Add a Server</span>
                    </div>

                </div>
            </div>
            <div className="channels-column2-holder">
                <div className="channels-column2">
                    {(serverId !== "@me") ? <ServerNameHeader setDetailVisibility={setShowServerDetail}/> : <Searchbar/>}

                    {(serverId === "@me") ? <div></div>: <ChannelsList showCreateChannel={setShowChannelModal} categoryName={categoryName} setShowChannelDetail={setShowChannelDetail}/>}

                    <CurrentUserProfile/>
                </div>
            </div>
            <div className="channels-column3-holder">
                <div className="channels-column3">
                    {(serverId === "@me") ? <FriendsNameHeader/> : <ChannelNameHeader/>}
                    <div className="channels-column3-main-content">
                        {(serverId === "@me") ? <div></div> : <MessageList/>}
                        {(serverId === "@me") ? null : <SubscriberList/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChannelsPage;
