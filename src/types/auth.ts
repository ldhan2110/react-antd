export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

export interface DecodedToken {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string | string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    [key: string]: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: DecodedToken | null;
  loading: boolean;
  error: string | null;
}

export interface AuthStore {
  isAuthenticated: boolean;
  user: DecodedToken | null;
  loading: boolean;
  error: string | null;

  login: (request: LoginRequest) => Promise<boolean>;
  logout: () => void;
}
