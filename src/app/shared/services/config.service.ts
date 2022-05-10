import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  get hostName(): string {
    return this._hostName;
  }

  set hostName(value: string) {
    this._hostName = value;
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  private _baseUrl!: string;
  private _hostName!: string;

  constructor() {
    this.baseUrl = 'https://61ee5f30d593d20017dbad98.mockapi.io/pinguin';
    this.hostName = window.location.origin;
  }
}
