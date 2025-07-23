import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Avatar,
  Button,
  Divider,
  Dropdown,
  Flex,
  Input,
  Menu,
  type AutoCompleteProps,
} from 'antd';
import { useState } from 'react';
import { authStore } from '../stores';

const Header: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

  const searchResult = (query: string) =>
    Array.from({ length: getRandomInt(5) })
      .join('.')
      .split('.')
      .map((_, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                Found {query} on{' '}
                <a
                  href={`https://s.taobao.com/search?q=${query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {category}
                </a>
              </span>
              <span>{getRandomInt(200, 100)} results</span>
            </div>
          ),
        };
      });

  const menu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>

      <Menu.SubMenu key="sub1" title="More Options">
        <Menu.Item key="3">Option 1</Menu.Item>
        <Menu.Item key="4">Option 2</Menu.Item>
      </Menu.SubMenu>

      <Menu.Divider />
      <Menu.Item
        key="5"
        onClick={() => {
          authStore.logout();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white shadow-md h-16 px-4 flex items-center justify-between ">
      <AutoComplete
        popupMatchSelectWidth={252}
        style={{ width: 250 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search size="middle" placeholder="Search Program No" enterButton />
      </AutoComplete>
      <Flex justify="end" gap={4}>
        <Flex gap={8}>
          <Button shape="circle" icon={<BellOutlined />} />
          <Dropdown overlay={menu} trigger={['click']}>
            <Button shape="circle" icon={<SettingOutlined />} />
          </Dropdown>
        </Flex>
        <Flex justify="center" align="center" gap={2}>
          <Divider type="vertical" size="middle" />
        </Flex>
        <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
      </Flex>
    </div>
  );
};

export default Header;
