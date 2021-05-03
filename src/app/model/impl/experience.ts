import {IExperience} from '../IExperience';
import {IDuty} from '../IDuty';

export class Experience implements IExperience{
  id: number | null;
  companyId: number | null;
  companyLabel: string | null;
  duties: IDuty[];
  from: Date | null;
  to: Date | null;
  jobTitleId: number | null;
  jobTitleLabel: string | null;


  constructor(id: number|null, companyId: number | null, companyLabel: string | null, duties: IDuty[], from: Date | null, to: Date | null, jobTitleId: number | null,
              jobTitleLabel: string | null) {
    this.id = id;
    this.companyId = companyId;
    this.companyLabel = companyLabel;
    this.duties = duties;
    this.from = from;
    this.to = to;
    this.jobTitleId = jobTitleId;
    this.jobTitleLabel = jobTitleLabel;
  }

  static emptyExperience(): Experience{
    return new Experience(null, null, '', new Array(), null, null, null, '');
  }

}
