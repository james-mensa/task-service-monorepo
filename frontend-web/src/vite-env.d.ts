interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_URL: string
    readonly VITE_APP_VERSION: string
    readonly VITE_APP_AUTH_TOKEN_NAME:string
  }
interface ImportMeta {
    readonly env: ImportMetaEnv
}