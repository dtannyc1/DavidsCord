import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './ServerList.css'

const ServerList = ({activeServer}) => {
    const servers = useSelector(state => Object.values(state.servers));
    const unreadServers = useSelector(state => state.unread.servers);

    if (!servers) return null;

    return (
        <>
            {servers.map(server => {
                let unreadStatus = (unreadServers[server.id]) ? " unread" : "";

                if (server.photoUrl) {
                    return <div className={`server-item${unreadStatus}`} key={server.id} >
                        <Link to={`/channels/${server.id}`} className={(parseInt(activeServer) === server.id) ? "selected" : null}>
                            <img src={server.photoUrl} alt={server.serverName}/>
                            <div className="channels-left-selector"></div>
                        </Link>
                        <span className="tooltip">{server.serverName}</span>
                    </div>
                } else{
                    return <div className={`server-item${unreadStatus}`} key={server.id} >
                        <Link to={`/channels/${server.id}`} className={(parseInt(activeServer) === server.id) ? "selected" : null}>
                            <div className="server-image">
                                {server.serverName.toUpperCase().charAt(0)}
                            </div>
                            <div className="channels-left-selector"></div>
                        </Link>
                        <span className="tooltip">{server.serverName}</span>
                    </div>
                }
            })}
        </>
    )
}

export default ServerList;
