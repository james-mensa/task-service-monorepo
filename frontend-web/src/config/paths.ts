const routePath = {
  HOME_PATH: "/",
  LOGIN_FORM_PAGE:"/auth/login",
  REGISTER_FORM_PAGE:"/auth/register"
} as const;
export type AppRoutePathTy = (typeof routePath)[keyof typeof routePath];
export default routePath;
