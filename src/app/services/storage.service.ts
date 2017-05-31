import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private isAvailable = true;
  constructor() {
    this.isAvailable = this.isLocalStorageAvailable();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      this.write('test', 1);
      this.remove('test');
      return true;
    } catch (error) {
      return false;
    }
  }

  write(key: string, value: any) {
    if (!this.isAvailable) {
      return;
    }
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  read<T>(key: string): T {
    if (!this.isAvailable) {
      return null;
    }
    const value: string = localStorage.getItem(key);

    if (value && value !== 'undefined' && value !== 'null') {
      return <T>JSON.parse(value);
    }
    return null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

}
