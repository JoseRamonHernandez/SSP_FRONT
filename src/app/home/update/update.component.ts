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
  activo:           string;
  ambiente:         string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  userId: string | null = null;
  taskId: string | null = null;
  url: any;

  responseArray: taskData[] = [];

  status!:            string;
  titulo!:            string;
  descripcion!:       string;
  asunto!:            string;
  solicitante!:       string;
  negocio!:           string;
  CCoE!:              string;
  sistema!:           string;
  programas!:         string;
  txns!:              string;
  tablas!:            string;
  funciones!:         string;
  jobs!:              string;
  comentarios!:       string;
  asignado_por!:      string;
  fecha_inicio!:      string;
  estimacion!:        string;
  fecha_liberacion!:  string;
  ot!:                string;
  crq!:               string;
  documentacion!:     string;
  activo!:            string;
  ambiente!:          string;

  bodyTaskUPD: any = {};


  constructor(private router:Router, private http:HttpClient, private title: Title){}

  ngOnInit(): void {

    const service = new ServiceService();
          this.url = service.url();
    
        this.userId = localStorage.getItem('userId');
        this.taskId = localStorage.getItem('taskId');
        this.title.setTitle('SSP - UPD');

        if(!this.userId){
          this.router.navigate(['login']);
        }

        this.http.get<taskData[]>(this.url+'task/'+this.taskId).subscribe(data => {
          this.responseArray = data;  

          const item = this.responseArray[0];

          this.titulo           = item.titulo;
          this.descripcion      = item.descripcion;
          this.status           = item.status;
          this.asunto           = item.asunto;
          this.negocio          = item.negocio;
          this.solicitante      = item.solicitante;
          this.sistema          = item.sistema;
          this.CCoE             = item.CCoE;
          this.txns             = item.txns;
          this.programas        = item.programas;
          this.funciones        = item.funciones;
          this.tablas           = item.tablas;
          this.jobs             = item.jobs;
          this.comentarios      = item.comentarios;
          this.asignado_por     = item.asignado_por;
          this.fecha_inicio     = item.fecha_inicio;
          this.fecha_liberacion = item.fecha_liberacion;
          this.estimacion       = item.estimacion;
          this.ot               = item.ot;
          this.crq              = item.crq;
          this.documentacion    = item.documentacion;
          this.ambiente         = item.ambiente;

          if(item.activo === '***' || item.activo === 'SI'){
            this.activo = 'SI';
          }
        });
    
  }

logOut(){
    localStorage.removeItem('userId');
    localStorage.removeItem('taskId');
    this.router.navigate(['login']);
  }


  submitForm(){

   this.bodyTaskUPD =
  {
    status:           this.status,
    titulo:           this.titulo,
    descripcion:      this.descripcion,
    asunto:           this.asunto,
    solicitante:      this.solicitante,
    negocio:          this.negocio,
    CCoE:             this.CCoE,
    sistema:          this.sistema,
    programas:        this.programas,
    txns:             this.txns,
    tablas:           this.tablas,
    funciones:        this.funciones,
    jobs:             this.jobs,
    comentarios:      this.comentarios,
    asignado_por:     this.asignado_por,
    fecha_inicio:     this.fecha_inicio,
    estimacion:       this.estimacion,
    fecha_liberacion: this.fecha_liberacion,
    ot:               this.ot,
    crq:              this.crq,
    documentacion:    this.documentacion,
    activo:           this.activo,
    ambiente:         this.ambiente
  };

  this.http.patch(this.url+'task/'+this.taskId, this.bodyTaskUPD).subscribe(res => {
    Swal.fire({
      icon:"success",
      title:"Actualización Exitosa!",
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: true,
      confirmButtonColor: 'green'
    }).then((response) => {
      if(response.isConfirmed)
      {
        this.router.navigate(['details']);
      }
    });
  });

  }

}
