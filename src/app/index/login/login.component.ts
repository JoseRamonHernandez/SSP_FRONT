import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { Title } from '@angular/platform-browser';

interface userData{
    _id: string;
    nickname: string;
    lastname: string;
    password: string;
  }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  user: string = '';
  pass: string = '';

  url: any;


  constructor(private router: Router, private http: HttpClient, private title: Title) {}

  ngOnInit(): void {
    const servicie = new ServiceService;
    this.url = servicie.url();

    this.title.setTitle('SSP - Home');

  }

 
  login(){

    let timerInterval=0;

    if(this.user === '' || this.pass === '' || !this.user || !this.pass){
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia!',
        text: 'Usuario o Contraseña vacios, ingresa todos los datos...'
      })
    }
    
    if(this.user && this.pass){
     // console.log('Usuario: ', this.user);
     // console.log('Contraseña: ', this.pass);

      this.http.get<userData>(this.url+'User/name/'+this.user).subscribe(data => {
        if(!data){
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Usuario o Contraseña incorrectos!'
          });

          return;
        }
        if(this.pass === data.password){
          Swal.fire({
            icon: 'success',
            title: 'Acceso correcto!',
            text: 'Bienvenid@ 👍',
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false,

            willClose: () => {
              clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) 
            {
              localStorage.setItem('userId', data._id);
              localStorage.setItem('userNickname', data.nickname);
              this.router.navigate(['indexHome']);
            }
          })
        }
        if(this.pass !== data.password){
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Usuario o Contraseña incorrectos!'
          });
        }
        
      })

    }
    
  }

  register(){
    this.router.navigate(['register']);
  }

  signIn(){
    this.router.navigate(['home_invited']);
  }

}
