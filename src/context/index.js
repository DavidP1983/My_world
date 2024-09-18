import { createContext } from 'react';

export const dataContext = createContext({ isAuth: false, setIsAuth: () => { } })
