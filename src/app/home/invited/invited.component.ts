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

interface userData{
  _id:        string,
  nickname:   string,
  password:   string,
  name:       string,
  lastname:   string
}

@Component({
  selector: 'app-invited',
  templateUrl: './invited.component.html',
  styleUrls: ['./invited.component.css']
})
export class InvitedComponent implements OnInit{

  url: any;

  responseArray: taskData[] = [];
  responseArrayUser: userData[] = [];

  tareasConUsuario: any[] = [];

  constructor(private router:Router, private http:HttpClient, private title: Title){}

  ngOnInit(): void {
    const service = new ServiceService();
      this.url = service.url();

      this.title.setTitle('SSP - Invitado');

      this.http.get<userData[]>(this.url + 'Users').subscribe(users => {
      this.responseArrayUser = users;

      // 2️⃣ Luego obtener tareas
      this.http.get<taskData[]>(this.url + 'task').subscribe(tasks => {
        this.responseArray = tasks;

        // 3️⃣ Combinar datos
        this.tareasConUsuario = this.responseArray.map(task => {

          const usuario = this.responseArrayUser.find(
            u => u._id === task.id_user
          );

          return {
            usuario: usuario ? `${usuario.name} ${usuario.lastname}` : 'Sin usuario',
            ...task
          };

        });

      });

    });
    
  }




  logOut(){
    this.router.navigate(['login']);
  }

  detail(idTask: string){
    localStorage.setItem('taskId', idTask);
    this.router.navigate(['detail_invited']);
  }

}
