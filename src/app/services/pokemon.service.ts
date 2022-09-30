import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _endpoint = 'https://pokeapi.co/api/v2'

  constructor(
    private http: HttpClient
  ) { }

  pokemons(
    params: { offset?: number, limit?: number } = {
      offset: 0,
      limit: 20
    }
  ) {
    return this.http.get(`${this._endpoint}/pokemon`, {
      params
    });
  }

}
