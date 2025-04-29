export const appConfig = {
  backendUrl: import.meta.env.VITE_APP_BACKEND_URL,
  app_version:import.meta.env.VITE_APP_VERSION,
  auth_token:import.meta.env.VITE_APP_AUTH_TOKEN_NAME

} as const;

export type AppConfig = (typeof appConfig)[keyof typeof appConfig];
