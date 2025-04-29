class LocalStorageService {
    static setItem(key: string, value: string) {
      localStorage.setItem(key, value);
    }
  
    static getItem(key: string): string | null {
      return localStorage.getItem(key);
    }
  
    static removeItem(key: string) {
      localStorage.removeItem(key);
    }
  
    static hasItem(key: string): boolean {
      return localStorage.getItem(key) !== null;
    }
  }
  
  export default LocalStorageService;
  