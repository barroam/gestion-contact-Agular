/*  import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
}*/
import { Injectable } from  '@angular/core' ;

@Injectable ({
  providedIn : 'root' ,
})
export  class  LocalStorageService {
  constructor ( ) {}

  // Définir une valeur dans le stockage local
  setItem ( key : string , value : string ): void {
    localStorage . setItem (key, value);
  }

  // Obtenir une valeur du stockage local
  getItem ( key : string ): string | null {
    return  localStorage . getItem (key);
  }

  // Supprimer une valeur du stockage local
  removeItem ( key : string ): void {
    localStorage . removeItem (key);
  }

  // Effacer tous les éléments du stockage local
  clear (): void {
    localStorage . clear ();
  }
}
