import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  userId: string | null = null;
  url: any;

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

  bodyTaskCRT: any = {};

  constructor(private router:Router, private http:HttpClient, private title: Title){}
  
    ngOnInit(): void {

      const service = new ServiceService();
        this.url = service.url();
          
              this.userId = localStorage.getItem('userId');
              this.title.setTitle('SSP - CREATE');
      
              if(!this.userId){
                this.router.navigate(['login']);
              }
      
    }
  
    logOut(){
      localStorage.removeItem('userId');
      localStorage.removeItem('taskId');
      this.router.navigate(['login']);
    }

    submitForm(){

   this.bodyTaskCRT =
  {
    id_user:          this.userId,
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

  this.http.post(this.url+'task', this.bodyTaskCRT).subscribe( res => {
    Swal.fire({
          icon:"success",
          title:"Tarea Creada!",
          text: 'Regresando a la pantalla principal...',
          showCancelButton: false,
          showDenyButton: false,
          showConfirmButton: true,
          confirmButtonColor: 'green'
        }).then((response) => {
          if(response.isConfirmed)
          {
            this.router.navigate(['index']);
          }
        });
      
  });

}

}
