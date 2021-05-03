import {IDuty} from '../IDuty';

export class Duty implements IDuty{
  id: number | null;
  detail: string;

  constructor(id: number | null , detail: string) {
    this.id = id;
    this.detail = detail;
  }

  static emptyDuty(): Duty{
    return new Duty(null, '');
  }

}
