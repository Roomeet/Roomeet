export type SignUpUserData = {
    name: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export type SignInUserData = {
      email: string;
      password: string;
      remember: boolean | undefined;
  }

export type userContext = {
    id: string;
    name: string;
    lastName: string;
    email: string;
}
