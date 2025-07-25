export interface Tab {
  key: string;
  label: string;
}

export interface AppState {
  darkMode: boolean;
  lang: 'en' | 'ko' | 'ja';
  openedTabs: Tab[];
  selectedTab: Tab;
  hr: {
    selectedEmployeeId: string | null;
    employeeList: Array<{ id: string; name: string }>;
  };
}

export interface AppStore {
  state: AppState;

  // Dark Mode Management
  toggleDarkMode: () => void;
  setDarkMode: (darkMode: boolean) => void;

  // Language Management
  setLang: (lang: 'en' | 'ko' | 'ja') => void;

  // Tabs Managaments
  openTab: (screen: Tab) => void;
  closeTab: (screenKey: string) => void;
  setSelectedTab: (screenKey: string) => void;
}
