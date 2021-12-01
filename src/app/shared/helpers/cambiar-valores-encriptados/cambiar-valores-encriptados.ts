import { Injectable } from '@angular/core';

@Injectable()
export class CambiarValoresEncriptados {

  constructor() { }

  public values: any = {
    "\\+": "%2B",
    "\\@": "%40",
    "\\$": "%24",
    "\\,": "%2C",
    "\\:": "%3A",
    "\\;": "%3B",
    "\\=": "%3D",
    "\\?": "%3F",
    "\\/": "%2F",
  }

  public replace(str: string): string {
    Object.keys(this.values)
      .forEach(char => str = str.replace(new RegExp(char, 'g'), this.values[char]));
    return str;
  }
}
