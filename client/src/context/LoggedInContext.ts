import { createContext } from 'react';
import { userContext } from '../interfaces/authentication';

export const Logged = createContext<boolean | userContext>(false);
