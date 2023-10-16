declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly BACKEND_URL: string;
        readonly NEXT_PUBLIC_BACKEND_URL: string;
      }
    }
  }
}
