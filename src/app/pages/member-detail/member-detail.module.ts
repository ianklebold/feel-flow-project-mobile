import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MemberDetailPageRoutingModule } from './member-detail-routing.module';

import { MemberDetailPage } from './member-detail.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberDetailPageRoutingModule
  ],
  declarations: [MemberDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MemberDetailPageModule {}
