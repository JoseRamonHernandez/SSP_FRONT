import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './index/login/login.component';
import { IndexComponent } from './home/index/index.component';
import { InvitedComponent } from './home/invited/invited.component';
import { DetailsComponent } from './home/details/details.component';
import { CreateComponent } from './home/create/create.component';
import { UpdateComponent } from './home/update/update.component';
import { DetailInvitedComponent } from './home/detail-invited/detail-invited.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './index/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    InvitedComponent,
    DetailsComponent,
    CreateComponent,
    UpdateComponent,
    DetailInvitedComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
