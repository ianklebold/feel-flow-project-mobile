import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { IonicModule } from '@ionic/angular';
import { NotifyButtonComponent } from './notify-button/notify-button.component';



@NgModule({
  declarations: [ProfileHomeComponent,NotifyButtonComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ProfileHomeComponent,
    NotifyButtonComponent
  ]
})
export class ComponentsModule { }
