import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey:string ='CniCCENu3NpjsbvF1urwxcEvtBSeTvVs';

  get historial() {
    return [...this._historial];
  }

  constructor( private http:HttpClient ){}

  buscarGifs( query: string) {

    query = query.trim().toLocaleLowerCase();

    if( query.trim().length === 0)
    {
      return;
    }


    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=' + this.apiKey + '&q=Flowers&limit=10' )
      .subscribe( (response: any) => {
        console.log(response.data);
      });

  }

}
