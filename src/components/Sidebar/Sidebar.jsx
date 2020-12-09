import React from 'react';
import {Layout} from 'antd';
import {Menu} from "antd";
import {Link} from "react-router-dom";

const {Sider} = Layout;

const Sidebar = ({menuItemsData, selected, handleMenuItemClick}) => {

    const menuItems = menuItemsData.map(itemData => {
        return <Menu.Item key={itemData.key} icon={itemData.icon}>
            <Link to={itemData.link}>{itemData.title}</Link>
        </Menu.Item>
    });

    return <Sider className="site-layout-background" breakpoint={"sm"}>
        <Menu onClick={handleMenuItemClick} selectedKeys={[selected]}>
            {menuItems}
        </Menu>
    </Sider>
}

export default Sidebar;