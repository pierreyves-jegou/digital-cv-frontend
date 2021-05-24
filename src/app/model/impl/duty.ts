import {IDuty} from '../IDuty';

export class Duty implements IDuty{
  id: number | null;
  description: string;

  constructor(id: number | null , detail: string) {
    this.id = id;
    this.description = detail;
  }

  static emptyDuty(): Duty{
    return new Duty(null, '');
  }

}
