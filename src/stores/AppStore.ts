import { makeAutoObservable, runInAction, reaction } from 'mobx';
import type { AppStore as IAppStore, AppState, Tab } from '../types/app';
import { DEFAULT_STATE, getAppState, saveAppState } from '../utils/storage';

export class RootStore implements IAppStore {
  // Default state for the app
  state: AppState = DEFAULT_STATE;

  // Default state & function for store
  initialized = false;
  private saveTimeout: NodeJS.Timeout | null = null;
  private autoSaveInterval: NodeJS.Timeout | null = null;
  private stateReactionDisposer: (() => void) | null = null;

  // Initialize the store with default values
  constructor() {
    makeAutoObservable(
      this,
      {
        state: true,
      },
      { autoBind: true }
    );
    this.initializeStore();
    this.setupAutoSave();
  }

  // ===== INITIALIZATION & PERSISTENCE =====
  private async initializeStore() {
    try {
      const savedState = await getAppState();
      runInAction(() => {
        this.state = {
          ...DEFAULT_STATE,
          ...savedState,
        };
        this.initialized = true;
      });
      await this.saveStateImmediate();
    } catch (error) {
      console.error('❌ Failed to initialize store:', error);
      runInAction(() => {
        this.state = { ...DEFAULT_STATE };
        this.initialized = true;
      });
    }
  }

  private setupAutoSave() {
    // Setup state change reaction
    this.stateReactionDisposer = reaction(
      () => JSON.stringify(this.state),
      () => this.debouncedSave()
    );

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.saveStateImmediate());
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') this.saveStateImmediate();
      });

      // Setup auto-save interval
      this.autoSaveInterval = setInterval(() => this.saveStateImmediate(), 30000);
    }
  }

  private debouncedSave() {
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => this.saveStateImmediate(), 1000);
  }

  private async saveStateImmediate() {
    if (!this.initialized) return;
    try {
      await saveAppState(this.state);
    } catch (e) {
      console.error('❌ Failed to save state:', e);
    }
  }

  public saveState() {
    this.debouncedSave();
  }

  public stopAutoSave() {
    console.log('🛑 Stopping auto-save mechanisms...');

    // Stop debounced save timeout
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }

    // Stop auto-save interval
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }

    // Stop state change reaction
    if (this.stateReactionDisposer) {
      this.stateReactionDisposer();
      this.stateReactionDisposer = null;
    }

    console.log('✅ Auto-save mechanisms stopped');
  }

  // ===== DELEGATED METHODS (for AppStore interface compliance) =====
  toggleDarkMode = () => {};
  setDarkMode = (darkMode: boolean) => {
    runInAction(() => {
      this.state.darkMode = darkMode;
    });
  };
  setLang = (lang: 'en' | 'ko' | 'ja') => {
    runInAction(() => {
      this.state.lang = lang;
    });
    this.saveStateImmediate();
  };
  openTab = (screen: Tab) => {
    runInAction(() => {
      const existingTab = this.state.openedTabs.find((tab) => tab.key === screen.key);
      if (existingTab) {
        this.state.selectedTab = existingTab;
      } else {
        this.state.openedTabs.push(screen);
        this.state.selectedTab = screen;
      }
    });
  };
  closeTab = (screenKey: string) => {
    runInAction(() => {
      this.state.openedTabs = this.state.openedTabs.filter((tab) => tab.key !== screenKey);
      if (this.state.selectedTab.key === screenKey) {
        this.state.selectedTab = this.state.openedTabs[0] || DEFAULT_STATE.selectedTab;
      }
    });
    this.saveStateImmediate();
  };
  setSelectedTab = (screenKey: string) => {
    runInAction(() => {
      const existingTab = this.state.openedTabs.find((tab) => tab.key === screenKey);
      if (existingTab) {
        this.state.selectedTab = existingTab;
      } else {
        console.warn(`Tab with key ${screenKey} not found in opened tabs.`);
      }
    });
  };
  resetToDefault = async () => {
    runInAction(() => {
      this.state = { ...DEFAULT_STATE };
    });
    await this.saveStateImmediate();
  };
}

const appStore = new RootStore();

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).store = appStore;
}

export default appStore;
