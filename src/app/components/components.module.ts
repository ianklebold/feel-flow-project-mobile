import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ProfileHomeComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ProfileHomeComponent
  ]
})
export class ComponentsModule { }
