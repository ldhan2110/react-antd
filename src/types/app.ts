export interface Tab {
  key: string;
  label: string;
}

export interface AppState {
  darkMode: boolean;
  openedTabs: Tab[];
  selectedTab: Tab;
}

export interface AppStore {
  state: AppState;

  // Dark Mode Management
  toggleDarkMode: () => void;
  setDarkMode: (darkMode: boolean) => void;

  // Tabs Managaments
  openTab: (screen: Tab) => void;
  closeTab: (screenKey: string) => void;
  setSelectedTab: (screenKey: string) => void;
}
