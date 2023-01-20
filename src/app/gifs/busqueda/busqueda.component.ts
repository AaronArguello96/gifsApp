import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['../../app.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //!: operador que asegura que el valor de esa variable nunca va a ser nulo. Como recibe un tipo genérico en este caso hay que indicarle quelo que se le va a pasar es un input

  //De esta manera se importa la función que añade el elemento al array
  constructor(private gifsService: GifsService){ 

  }

  buscar(){

      const valor = this.txtBuscar.nativeElement.value;
      if(valor != ''){
        this.gifsService.buscarGifs(valor);
        this.txtBuscar.nativeElement.value='';
      }
    

  }
}
