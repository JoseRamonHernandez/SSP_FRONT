import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  selector: 'app-detail-invited',
  templateUrl: './detail-invited.component.html',
  styleUrls: ['./detail-invited.component.css']
})
export class DetailInvitedComponent implements OnInit {

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

        this.http.get<taskData[]>(this.url+'task/'+this.taskId).subscribe(data => {
          this.responseArray = data;  
        });
    
  }


    logOut(){
    localStorage.removeItem('userId');
    localStorage.removeItem('taskId');
    this.router.navigate(['login']);
  }

}
