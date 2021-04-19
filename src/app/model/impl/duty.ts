import {IDuty} from '../IDuty';

export class Duty implements IDuty{
  detail: string;

  constructor( detail: string) {
    this.detail = detail;
  }

}
