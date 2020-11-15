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
