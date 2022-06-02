import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'availableDateFormat',
})
export class AvailableDateFormatPipe implements PipeTransform {
  public transform(
    creatDate: string,
    type: 'days' | 'hours' = 'days',
    term: number = 3
  ): string {
    const nowDateFormat = moment(new Date()).format('YYYY-MM-DD HH:mm'),
      availabilityFormat = moment(creatDate)
        .add(term, type)
        .format('YYYY-MM-DD HH:mm'),
      duration = moment.duration(
        moment(availabilityFormat).diff(moment(nowDateFormat))
      ),
      days = Math.floor(duration.asDays()),
      daysFormat = days >= 0 ? `${days}d ` : '0d ',
      hoursFormat = duration.hours() >= 0 ? `${duration.hours()}h ` : '0h ',
      minutesFormat = `${duration.minutes()}m`;

    return [daysFormat, hoursFormat].join('');
  }
}
