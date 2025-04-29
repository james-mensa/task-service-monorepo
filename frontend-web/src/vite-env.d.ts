interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_URL: string
    readonly VITE_APP_VERSION: string
  }
interface ImportMeta {
    readonly env: ImportMetaEnv
}