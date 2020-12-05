import React, {useState} from 'react';
import {Layout} from 'antd';
import {Menu} from "antd";
import {SolutionOutlined, TeamOutlined} from "@ant-design/icons";
import {Link, withRouter} from "react-router-dom";

const {Sider} = Layout;

const Sidebar = (props) => {

    const currentItems = props.location.pathname.split("/")[1];

    const [selected, setSelected] = useState(currentItems);

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

export default withRouter(Sidebar);