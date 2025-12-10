import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './home/index/index.component';
import { LoginComponent } from './index/login/login.component';
import { DetailsComponent } from './home/details/details.component';
import { CreateComponent } from './home/create/create.component';
import { UpdateComponent } from './home/update/update.component';
import { InvitedComponent } from './home/invited/invited.component';
import { DetailInvitedComponent } from './home/detail-invited/detail-invited.component';
import { RegisterComponent } from './index/register/register.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent },
  { path:'indexHome', component:IndexComponent },
  { path:'details', component:DetailsComponent },
  { path:'create', component:CreateComponent },
  { path:'edit', component:UpdateComponent },
  { path:'home_invited', component: InvitedComponent },
  { path:'detail_invited', component: DetailInvitedComponent },
  { path:'register', component: RegisterComponent }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
