import { appConfig } from "@config/config";
import routePath from "@config/paths";
import LocalStorageService from "@store/LocalStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthGuardController=({children}:{children: React.ReactNode;})=>{
      const navigate = useNavigate();
    useEffect(() => {
        const jwt_token = LocalStorageService.getItem(appConfig.auth_token);
        console.log({jwt_token})
        if (jwt_token == null || jwt_token == undefined) {
          navigate(routePath.LOGIN_FORM_PAGE);
        }
      }, []);

    return <>{children}</>
}