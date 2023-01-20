import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'XwFFlOIoYA56if3NAlnYLPUb3o4e0D4E';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];
  

  get historial(){
    //this._historial = this._historial.splice(0,9);
    return [...this._historial]; //Utilizamos el operador ... (spread) para que devuelva un array diferente al original (_historial)
  }

  constructor(private http:HttpClient){
    
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!); //Con el parse de JSON obligamos a que se convierta el historial de string al formato original, es lo 
      //contrario a stringify
    }
    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
      //this._historial[0];
    }

    //También se puede hacer en una línea de esta forma:
    //this._historial = JSON.parse(localStorage.getItem('historial')!) || []
  }

  //Función que almacena el dato en el array
  buscarGifs(query:string = ''){

    query = query.trim().toLocaleLowerCase(); //Eviar duplicados de mayus y minusculas

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial)); //JSON puede transformar cualquier cosa a un string con stringify. Sirve para almacenar en el almacenamiento
      //local la información buscada (_historial)
    }

    //Definimos en una constante los valores de la URL
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params}) //La respuesta del get va aquí
      .subscribe((response)=>{ 
        //console.log(response.data); //Le indicamos que solo devuelva la data, pero hay que indicarle el tipo de dato que es response
        this.resultados = response.data;
        //response.data[0].images.downsized_medium.url; //Con la interfaz de la Data definida VS ya sabe los elementos del array que devuelve
        localStorage.setItem('resultados', JSON.stringify(this.resultados)); //Va aquí, donde ya tiene el resultado de la búsqueda
      }) //Se lanza cuando reciba la respuesta del get
    //console.log(this._historial);
  }
}
