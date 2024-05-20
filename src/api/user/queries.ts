import { useMutation, useQuery } from "react-query";
import { makeHttpRequest } from "../../utils/http/make-http-request";
import user from "./query-details";
import { LoginRequest, TokenRequest } from "../../schema/login.schema";

const { doLogin, getAllUsers, setRefreshToken } = user;

export const useLogin = () => {
  return useMutation((requestData: LoginRequest) => {
    return makeHttpRequest(doLogin, {
      requestData,
    });
  });
};

export const useFetchAllUsers = () => {
  return useQuery([getAllUsers.queryKeyName], () => {
    return makeHttpRequest(getAllUsers);
  });
};

export const useSetRefreshToken = () => {
  return useMutation((requestData: TokenRequest) => {
    return makeHttpRequest(setRefreshToken, {
      requestData,
    });
  });
};
