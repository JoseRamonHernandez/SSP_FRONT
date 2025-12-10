import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nickname: string = '';
  password: string = '';
  name:     string = '';
  lastname: string = '';

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

      

     this.http.post(this.url+'User', this.bodyRegister).subscribe( res => {
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
    }
  }
}
