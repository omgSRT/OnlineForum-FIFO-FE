import type { Role } from '../role';

export type Locale = 'zh_CN' | 'en_US';

export interface GetAccountRequest {
  username: string
}

export type AccountStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'SUSPENDED';

export interface Account {
  accountId: string;
  username: string;
  email: string;
  password: string;
  handle?: string;
  avatar?: string;
  coverImage?: string;
  createdDate: string;  // Date in ISO 8601 format
  status: AccountStatus;  // Enum for status
  role: Role;
  wallet?: Wallet
}

export interface Wallet {
  walletId: string;
  balance: number; 
}