import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  vistaTemplate: Subject<string> = new Subject();

  constructor() { }

  broadcastTemplateChange(text: string) {
    this.vistaTemplate.next(text);
  }
}
