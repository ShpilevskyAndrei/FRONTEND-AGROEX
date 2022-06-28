import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementTitleAdPageComponent } from './advertisement-title-ad-page.component';
import { MatIconModule } from '@angular/material/icon';
import { AdvertisementPriceModule } from '../../../shared/components/advertisements-list/advertisement/advertisement-price/advertisement-price.module';

@NgModule({
  declarations: [AdvertisementTitleAdPageComponent],
  imports: [
    CommonModule,
    MatIconModule,
    AdvertisementPriceModule,
    AdvertisementPriceModule,
  ],
  exports: [AdvertisementTitleAdPageComponent],
})
export class AdvertisementTitleAdPageModule {}
