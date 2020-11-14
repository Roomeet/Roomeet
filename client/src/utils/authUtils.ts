import Cookies from 'js-cookie';

export const logout = (): void => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('email');
};
