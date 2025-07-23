import Header from '../components/Header';
import SidebarMenu from '../components/SidebarMenu';
import MainScreen from '../components/MainScreen';

export const App = () => {
  return (
    <div className="h-screen">
      <SidebarMenu />
      <Header />
      <MainScreen />
    </div>
  );
};
