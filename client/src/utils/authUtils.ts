import network from './network';
import Cookies from 'js-cookie'

export const logout = (): void => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('email');
};

// export const isLoggedIn = async (): Promise<boolean> => {
//   if (localStorage.getItem('token')) {
//     try {
//       const { data } = await network.get('api/v1/auth/validateToken');
//       console.log(data);
//       return data;
//     } catch (e) {
//       return false;
//     }
//   } else {
//     return false;
//   }
// };
