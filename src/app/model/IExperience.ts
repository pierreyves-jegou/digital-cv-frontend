import {IDuty} from './IDuty';


export interface IExperience {

  id: number | null;
  companyId: number | null;
  companyLabel: string | null;
  jobTitleId: number | null;
  jobTitleLabel: string | null;
  from: Date | null;
  to: Date | null;
  duties: IDuty[];
}
