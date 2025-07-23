import { ApartmentOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import AccountingPage from '../pages/app/accounting/AccountingPage';
import AdminPage from '../pages/app/admin/AdminPage';
import DefaultPage from '../pages/app/DefaultPage';
import HrPage from '../pages/app/hr/HrPage';

// Constants for UI Registration
export const ROUTES = [
  {
    key: 'ADM_0001',
    label: 'Main',
    content: <DefaultPage />,
  },
  {
    key: 'ADM_0002',
    label: 'Adminitration Registration',
    content: <AdminPage />,
  },
  {
    key: 'ACC_0001',
    label: 'Account Receivables',
    content: <AccountingPage />,
  },
  {
    key: 'HRM_0001',
    label: 'Employee Management',
    content: <HrPage />,
  },
];

// Constants for menu sidebar
export const MENU_ROUTES = [
  {
    key: 'ACC',
    label: 'Accounting',
    icon: <ApartmentOutlined />,
    children: [
      {
        key: 'ACC_0001',
        label: 'Account Receivables',
      },
    ],
  },
  {
    key: 'HRM',
    label: 'Human Resources',
    icon: <TeamOutlined />,
    children: [
      {
        key: 'HRM_0001',
        label: 'Employee Management',
      },
    ],
  },
  {
    key: 'ADM',
    label: 'Admin',
    icon: <UserOutlined />,
    children: [
      {
        key: 'ADM_0002',
        label: 'Adminitration Registration',
      },
    ],
  },
];
