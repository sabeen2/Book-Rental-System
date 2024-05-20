import { RequestAuthType, RequestMethodEnum } from "../../schema/http.schema";

const user = {
  doLogin: {
    queryKeyName: "LOGIN",
    controllerName: "admin/user/login",
    requestMethod: RequestMethodEnum.POST,
    requestAuthType: RequestAuthType.NOAUTH,
  },

  getAllUsers: {
    queryKeyName: "GET_USERS",
    controllerName: "admin/user/get-all-users",
    requestMethod: RequestMethodEnum.GET,
    requestAuthType: RequestAuthType.AUTH,
  },

  setRefreshToken: {
    queryKeyName: "GET_TOKEN",
    controllerName: "admin/user/refreshToken",
    requestMethod: RequestMethodEnum.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
};

export default user;
