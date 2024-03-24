import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: any, options?: object) => {
  cookies.set(name, value, options);
};

export const getCookie = (name: string): any => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};
