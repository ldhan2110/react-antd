import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Flex, Menu, Image } from 'antd';
import { MENU_ROUTES, ROUTES } from '../utils/routes';
import { observer } from 'mobx-react-lite';
import store from '../stores/AppStore';

const SideBarMenu: React.FC = observer(() => {
  const { openTab } = store;
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  function handleOpenMenu({ key }: { key: string }) {
    const selectedItem = ROUTES.find((item) => item.key === key);
    if (selectedItem) {
      openTab(selectedItem);
    }
  }

  return (
    <div
      className={`h-full ${
        collapsed ? 'w-[80px]' : 'w-64'
      } bg-white shadow-lg transition-width duration-300 float-left`}
    >
      <Flex
        align="center"
        justify={collapsed ? 'center' : 'none'}
        gap={10}
        className="p-4 h-16 w-full text-white"
      >
        <Button type="primary" onClick={toggleCollapsed} className="ml-1">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        {!collapsed && (
          <Image
            className="mt-1"
            width={80}
            preview={false}
            src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNGtvUkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b6891a9acd6631e048ebc560edcf2d9ad1080348/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--1b8988b96ed4a58d3628eb3340c8b231786ccfc0/435564703_825801186235641_1729614210919770326_n.jpg"
          />
        )}
      </Flex>
      <Menu
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={MENU_ROUTES}
        onClick={handleOpenMenu}
      />
    </div>
  );
});

export default SideBarMenu;
