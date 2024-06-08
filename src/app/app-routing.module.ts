import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './page/basket/basket.component';
import { LogInComponent } from './page/log-in/log-in.component';
import { MainComponent } from './page/main/main.component';
import { SingUpComponent } from './page/sing-up/sing-up.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'SingUp', component: SingUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
