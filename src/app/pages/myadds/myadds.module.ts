import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaddsPageRoutingModule } from './myadds-routing.module';

import { MyaddsPage } from './myadds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyaddsPageRoutingModule
  ],
  declarations: [MyaddsPage]
})
export class MyaddsPageModule {}
