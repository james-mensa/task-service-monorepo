export const appConfig = {
  backendUrl: import.meta.env.VITE_APP_BACKEND_URL,
  app_version:import.meta.env.VITE_APP_VERSION

} as const;

export type AppConfig = (typeof appConfig)[keyof typeof appConfig];
