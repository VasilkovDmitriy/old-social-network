import React, {useState} from 'react';
import {Layout} from 'antd';
import {Menu} from "antd";
import {SolutionOutlined, TeamOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const {Sider} = Layout;

const Sidebar = (props) => {
    const [selected, setSelected] = useState("profile");

    const menuItemsData = [
        {key: "profile", link: "profile", title: "Profile", icon: <SolutionOutlined/>},
        {key: "users", link: "users", title: "Users", icon: <TeamOutlined/>}
    ];

    const menuItems = menuItemsData.map(itemData => {
        return <Menu.Item key={itemData.key} icon={itemData.icon}>
            <Link to={itemData.link}>{itemData.title}</Link>
        </Menu.Item>
    });

    const handleClick = (e) => {
        setSelected(e.key);
    };

    return <Sider className="site-layout-background" breakpoint={"sm"}>
        <Menu onClick={handleClick} selectedKeys={[selected]}>
            {menuItems}
        </Menu>
    </Sider>
}

export default Sidebar;