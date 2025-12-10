import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { ServiceService } from 'src/app/service/service.service';

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
  activo:           string;
  ambiente:         string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  userId: string | null = null;
  userNickname: string | null = null;
  url: any;

  responseArray: taskData[] = [];

  constructor(private router:Router, private http:HttpClient, private title: Title){}

  ngOnInit(): void {
    const service = new ServiceService();
      this.url = service.url();

    this.userId = localStorage.getItem('userId');
    this.userNickname = localStorage.getItem('userNickname');
    this.title.setTitle('SSP - Home');

    console.log(this.userId);

    if(!this.userId){
      this.router.navigate(['login']);
    }

    this.http.get<taskData[]>(this.url+'task/user/'+this.userId).subscribe(data => {
      this.responseArray = data;
    });

    //console.log("ID del usuario: ", this.userId);

    if(!this.userId){
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ocurrio un error durante la carga de datos, inicia sesión nuevamente',
        showDenyButton: false,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Iniciar Sesión',
        confirmButtonColor: 'green'
      }).then((result) => {
        if(result.isConfirmed){
          this.router.navigate(['login']);
        }
      })
    }
  }

  search(){

  }

  logOut(){
    localStorage.removeItem('userId');
    localStorage.removeItem('userNickname');
    this.router.navigate(['login']);
  }

  detail(idTask: string){
    //console.log(idTask)
    localStorage.setItem('taskId', idTask);
    this.router.navigate(['details']);
  }


}
