const routePath = {
  HOME_PATH: "/",
  LOGIN_FORM_PAGE:"/auth/login",
  REGISTER_FORM_PAGE:"/auth/register",
  ADD_TASK_PAGE:"/tasks/new",
  UpPDATE_TASK_PAGE:"/tasks/:id/update"
} as const;
export type AppRoutePathTy = (typeof routePath)[keyof typeof routePath];
export default routePath;
