import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public form:FormGroup;

  public articulos:Articulo[] = [
    { descripcion: 'Papas',    precio: 10.5 },
    { descripcion: 'Manzanas', precio: 12.1 },
    { descripcion: 'Melones',  precio: 52.3 },
    { descripcion: 'Cebollas', precio: 8.75 },
  ];

  constructor( private builder:FormBuilder ) {}

  ngOnInit() {
    this.form = this.builder.group({
      codigo: [ '' ],
      descripcion: [ '', [
        Validators.pattern("[a-zA-Z | áéíóú]*"),
        Validators.required
      ]],
      precio: [ '', [
        Validators.pattern("^[0-9]+\.?[0-9]+$"),
        Validators.required
      ]]
    });    
  }

  deleteArticulo( idx:number ) {
    if (confirm('¿Desea eliminar éste articulo?'))
      this.articulos.splice( idx, 1 )
  }

  getArticulo( idx:number ) {
    let foo = this.articulos[ idx ];
    this.form.patchValue({ codigo: idx + 1, descripcion: foo.descripcion, precio: foo.precio });
  }

  patchArticulo() {
    let art = this.form.value; 
    this.articulos[ art.codigo - 1 ].descripcion = art.descripcion;
    this.articulos[ art.codigo - 1 ].precio = art.precio;
    this.form.reset();
  }

  postArticulo() {
    let art = this.form.value;
    delete art.codigo;
    this.articulos.push( art );
    this.form.reset();
  }

}

interface Articulo {
  descripcion:string,
  precio:number
}
