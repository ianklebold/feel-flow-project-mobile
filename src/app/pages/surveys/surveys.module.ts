import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveysPageRoutingModule } from './surveys-routing.module';

import { SurveysPage } from './surveys.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveysPageRoutingModule,
    ComponentsModule
],
  declarations: [SurveysPage]
})
export class SurveysPageModule {}
