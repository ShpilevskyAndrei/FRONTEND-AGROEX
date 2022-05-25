import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from './model/category.model';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class CategoriesService extends BaseService {
  public getCategories(): Observable<Category[]> {
    return this.get<Category[]>('categories');
  }
}
