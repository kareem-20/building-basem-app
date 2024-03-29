import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildsPageRoutingModule } from './builds-routing.module';

import { BuildsPage } from './builds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImageModule,
    BuildsPageRoutingModule
  ],
  declarations: [BuildsPage]
})
export class BuildsPageModule { }
