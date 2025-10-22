import { Component, inject, OnInit } from '@angular/core'; 
import { Preloader } from '../../../shared/components/preloader/preloader';
import { Banner } from '../../../core/models/auxiliars';

@Component({
  selector: 'app-home',
  imports: [  Preloader],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  
  /////////////////////////////////////////////////
  nFases:number = 1;
  cargaCompletada:boolean = false;
  fasesCargadas:number = 0;
  /////////////////////////////////////////////////

 
   

  ngOnInit(): void {
    // this.getDatos();
  }


  // getDatos():void{

  //   this._inmuebleService.getInmueblesPortada().subscribe({

  //     next:(data) => { this.datos = data.datos;}

  //     ,

  //     error: (error) => {}

  //     ,

  //     complete: () => {this.faseCarga();}



  //   });

  // }

  
  ///////////////////////////////////////////////////////
  faseCarga():void{

    this.fasesCargadas++;

    if(this.fasesCargadas == this.nFases){

      this.cargaCompletada = true;
    }
  }
  //////////////////////////////////////////////////////

}
