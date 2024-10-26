export interface Role {
  roleID: string;
  name: string;
}

export type RoleName = "ADMIN" | "USER";

export type Roles = Role[];
