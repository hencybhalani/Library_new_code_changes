import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbSource = new BehaviorSubject<string>('Dashboard');
  currentBreadcrumb = this.breadcrumbSource.asObservable();

  constructor() { }

  setBreadcrumb(breadcrumb: string) {
    this.breadcrumbSource.next(breadcrumb);
  }
}
