import { App, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import store from '../stores/AppStore';
import { ROUTES } from '../utils/routes';

const MainScreen: React.FC = observer(() => {
  const { modal } = App.useApp();
  const { state: appState, setSelectedTab, closeTab } = store;

  return (
    <Tabs
      style={{ padding: 8 }}
      type="editable-card"
      hideAdd
      tabBarGutter={8}
      activeKey={appState.selectedTab.key}
      onChange={setSelectedTab.bind(store)}
      onEdit={(key, action) => {
        if (action === 'remove') {
          const tabsRemain = appState.openedTabs.filter((tab) => tab.key !== key);
          if (tabsRemain.length == 0) {
            modal.warning({
              title: 'Warning',
              content: 'You cannot close the last tab.',
              okText: 'Confirm',
              centered: true,
            });
            return;
          }
          closeTab(key as string);
        }
      }}
      items={appState.openedTabs.map((tab) => ({
        key: tab.key,
        label:
          appState.selectedTab.key != tab.key ? (
            <span
              className="w-[50px] text-center overflow-hidden text-ellipsis whitespace-nowrap inline-block align-middle"
              title={tab.label}
            >
              {tab.label}
            </span>
          ) : (
            <span>{tab.label}</span>
          ),
        children: ROUTES.find((route) => route.key === tab.key)?.content || null,
        closable: true,
      }))}
    />
  );
});

export default MainScreen;
