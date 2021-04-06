import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GifsSearchResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey:string ='CniCCENu3NpjsbvF1urwxcEvtBSeTvVs';
  
  //TODO: cambiar any por su tipo correspondiente 
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http:HttpClient ){
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    // if (localStorage.getItem('historial')){
      // this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }
    
    
  }

  buscarGifs( query: string) {

    query = query.trim().toLocaleLowerCase();

    if( query.trim().length === 0)
    {
      return;
    }


    if(!this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial)) 
    }

    this.http.get<GifsSearchResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10` )
      .subscribe( (response) => {
        console.log(response.data);
        this.resultados = response.data; 
        
      });

  }

}
