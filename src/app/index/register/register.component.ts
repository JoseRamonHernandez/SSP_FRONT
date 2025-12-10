import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';

interface userBody{
  _id:      string;
  nickname: string;
  password: string;
  name:     string;
  lastname: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nickname: string | null = null;
  password: string | null = null;
  name:     string | null = null;
  lastname: string | null = null;

  bodyRegister: any = {};

  url: any;

    constructor(private router:Router, private http:HttpClient, private title: Title){}

    ngOnInit(): void {
      const service = new ServiceService();
              this.url = service.url();

      this.title.setTitle('SSP - Register');
      
    }


    create(){

      if(!this.name || !this.password || !this.nickname || !this.lastname)
      {
        Swal.fire({
          icon: 'error',
          text: 'Todos los campos son obligatorios!'
        })
      }

      if(this.name && this.password && this.nickname && this.lastname)
      {
      
      this.bodyRegister={
        name:     this.name,
        password: this.password,
        nickname: this.nickname,
        lastname: this.lastname
      }

      console.log(this.bodyRegister);

      this.http.get<userBody>(this.url+'User/name/' + this.nickname).subscribe(data => {
        console.log(data);
        if(!data){
          this.http.post(this.url+'User', this.bodyRegister).subscribe( res => {
            console.log(res);
          Swal.fire({
                icon:"success",
                title:"Usuario Creado correctamente",
                showCancelButton: false,
                showDenyButton: false,
                showConfirmButton: true,
                confirmButtonColor: 'green'
              }).then((response) => {
                if(response.isConfirmed)
                {
                  this.router.navigate(['login']);
                }
              });
            
        });

        return;

        }

        if(data.nickname === this.nickname){
          Swal.fire({
            icon: 'info',
            text: 'Usuario ya existente'
          });
        }

      });

     
    }
  }
}
