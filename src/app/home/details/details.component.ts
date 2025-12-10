import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';

interface taskData{
  _id:              string;
  id_user:          string;
  status:           string;
  titulo:           string;
  descripcion:      string;
  asunto:           string;
  solicitante:      string;
  negocio:          string;
  CCoE:             string;
  sistema:          string;
  programas:        string;
  txns:             string;
  tablas:           string;
  funciones:        string;
  jobs:             string;
  comentarios:      string;
  asignado_por:     string;
  fecha_inicio:     string;
  estimacion:       string;
  fecha_liberacion: string;
  ot:               string;
  crq:              string;
  documentacion:    string;
  ambiente:         string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  userId: string | null = null;
  taskId: string | null = null;
  url: any;

  responseArray: taskData[] = [];
  constructor(private router:Router, private http:HttpClient, private title: Title){}

  ngOnInit(): void {

     const service = new ServiceService();
          this.url = service.url();
    
        this.userId = localStorage.getItem('userId');
        this.taskId = localStorage.getItem('taskId');
        this.title.setTitle('SSP - Detail');

        if(!this.userId){
          this.router.navigate(['login']);
        }

        this.http.get<taskData[]>(this.url+'task/'+this.taskId).subscribe(data => {
          this.responseArray = data;  
        });
    
  }

  logOut(){
    localStorage.removeItem('userId');
    localStorage.removeItem('taskId');
    this.router.navigate(['login']);
  }

  update(){
    this.router.navigate(['edit'])
  }

  delete(){
    Swal.fire({
      icon: 'question',
      title: 'Deseas eliminar la tarea?',
      showCancelButton: true,
      showDenyButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Eliminar',
      denyButtonColor: 'gray',
      denyButtonText: 'Cancelar'
    }).then((response) => {
      if(response.isConfirmed){
        this.http.delete(this.url+'task/'+this.taskId).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Tarea Eliminada',
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonColor: 'green'
          }).then((res) => {
            if(res.isConfirmed)
            {
              this.router.navigate(['index'])
            }
          })
        })
      }
    })
  }

}
