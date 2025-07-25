import { makeAutoObservable, runInAction } from 'mobx';
import type { RootStore } from '../AppStore';

export class HrStore {
  private root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  // ===== HR Store Operation =====
  setSelectedEmployeeId(employeeId: string | null) {
    runInAction(() => {
      this.root.state.hr.selectedEmployeeId = employeeId;
    });
  }

  setEmployeeList(employeeList: Array<{ id: string; name: string }>) {
    runInAction(() => {
      this.root.state.hr.employeeList = employeeList;
    });
  }
}
