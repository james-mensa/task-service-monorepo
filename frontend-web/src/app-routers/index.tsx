import routePath from "@config/paths";
import {AddTaskPage, HomePage,LoginPage,RegisterPage} from "@pages/index";

import { createBrowserRouter } from "react-router-dom";

const RootRouter = createBrowserRouter(
  [
    {
      path: routePath.HOME_PATH,
      element:<HomePage/>,
    },
    {
      path: routePath.REGISTER_FORM_PAGE,
      element:<RegisterPage/>,
    },
    {
      path: routePath.LOGIN_FORM_PAGE,
      element:<LoginPage/>,
    },
    {
      path: routePath.ADD_TASK_PAGE,
      element:<AddTaskPage/>,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default RootRouter;
