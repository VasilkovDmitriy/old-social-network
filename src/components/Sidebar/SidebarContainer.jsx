import React, {useState, useEffect} from 'react';
import Sidebar from "./Sidebar";
import {withRouter} from "react-router-dom";
import {SolutionOutlined, TeamOutlined} from "@ant-design/icons";

const SidebarContainer = (props) => {

    const currentItem = props.location.pathname.split("/")[1];
    const [selected, setSelected] = useState(currentItem);

    useEffect(() => {
        setSelected(currentItem);
    }, [currentItem]);

    const menuItemsData = [
        {key: "profile", link: "/profile", title: "Profile", icon: <SolutionOutlined/>},
        {key: "users", link: "/users", title: "Users", icon: <TeamOutlined/>}
    ];

    return <Sidebar menuItemsData={menuItemsData} selected={selected} />
}

export default withRouter(SidebarContainer);