/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, runInAction } from 'mobx';
import { authService } from '../services/authService';
import type { DecodedToken, AuthStore as IAuthStore, LoginRequest } from '../types/auth';

export class AuthStore implements IAuthStore {
  isAuthenticated: boolean = false;
  user: DecodedToken | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
  }

  /**
   * Khởi tạo trạng thái xác thực
   * Kiểm tra xem người dùng đã đăng nhập hay chưa
   * Nếu đã đăng nhập, lấy thông tin người dùng từ token
   */
  async initializeAuth() {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const isAuthenticated = await authService.isAuthenticated();

      if (isAuthenticated) {
        const user = authService.getCurrentUser();
        runInAction(() => {
          this.isAuthenticated = true;
          this.user = user;
        });

        // ✅ Trigger load system state sau khi authenticated với progress tracking
        try {
          //   await appStore.systemStore.loadSystemStateIfAuthenticated();
        } catch (error) {
          console.error('Failed to load system state after auth:', error);
        }
      }
    } catch (error: any) {
      console.error('Auth initialization failed:', error);
      runInAction(() => {
        this.error = '❌ Error initializing authentication: ' + error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  /**
   * Đăng nhập người dùng
   * @param credentials Thông tin đăng nhập
   * @returns Trả về true nếu đăng nhập thành công, ngược lại false
   */
  login = async (credentials: LoginRequest): Promise<boolean> => {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      await authService.login(credentials);
      const user = authService.getDecodedToken();

      runInAction(() => {
        this.isAuthenticated = true;
        this.user = user;
        this.loading = false;
      });

      // ✅ Trigger load system state sau khi login thành công với progress tracking
      try {
        // await appStore.systemStore.loadInitialState();
      } catch (error) {
        console.error('Failed to load system state after login:', error);
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message || 'Login failed';
        this.loading = false;
      });
      return false;
    }
  };

  /**
   * Đăng xuất người dùng
   */
  logout = () => {
    authService.logout();
    runInAction(() => {
      this.isAuthenticated = false;
      this.user = null;
      this.loading = false;
      this.error = null;
    });
  };

  /**
   * Refresh token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const tokenData = await authService.refreshToken();
      if (tokenData) {
        const user = authService.getDecodedToken();
        runInAction(() => {
          this.user = user;
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
      return false;
    }
  }

  /**
   * Clear error
   */
  clearError() {
    runInAction(() => {
      this.error = null;
    });
  }
}

export const authStore = new AuthStore();
