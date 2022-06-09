import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

import { AdvertisementPriceComponent } from './advertisement-price.component';
import { AvailableDateFormatPipe } from '../../../shared/pipes/available-date-format.pipe';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';

@NgModule({
  declarations: [
    AdvertisementPriceComponent,
    AvailableDateFormatPipe,
    TimeFormatPipe,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [AdvertisementPriceComponent],
})
export class AdvertisementPriceModule {}
