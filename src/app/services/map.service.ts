import { Injectable } from '@angular/core';
import * as L from 'leaflet';



@Injectable({
  providedIn: 'root'
})
export class MapService {

  public map: L.Map | undefined;
  constructor() { 
    
  }
}
