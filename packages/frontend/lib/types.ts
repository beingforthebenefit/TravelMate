export interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface GetUsersData {
  users: User[];
}

export interface LoginPayload {
  token: string;
  user: User;
}
