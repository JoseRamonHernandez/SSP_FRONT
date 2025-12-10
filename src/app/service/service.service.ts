import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  url(){
    const URL = 'https://ssp-back-naeg.onrender.com/api/';
    //const URL = 'http://localhost:9000/api/';
    return URL;
  }
}
