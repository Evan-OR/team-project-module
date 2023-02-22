export type LoginResponse = {
  message: string;
  userInfo: UserInfo;
};

export type UserInfo = {
  userID: number;
  username: string;
  password: string;
};
