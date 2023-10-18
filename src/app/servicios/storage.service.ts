import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async set(key: string, value: any) {
    console.log(value);
    await this.storage.set(key, value);
  }

  async get(key:string) {
    return await this.storage.get(key);
  }
}
