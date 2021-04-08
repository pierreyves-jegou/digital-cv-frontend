import {Duty} from './duty';


export class Experience{

  companyId: number | null;
  companyLabel: string;
  jobTitleId: number | null;
  jobTitleLabel: string;
  from: Date;
  to: Date;
  duties: Duty[];

  constructor(companyId: number | null, companyLabel: string, jobTitleId: number | null, jobTitleLabel: string, from: Date, to: Date, duties: Duty[]) {
    this.companyId = companyId;
    this.companyLabel = companyLabel;
    this.jobTitleId = jobTitleId;
    this.jobTitleLabel = jobTitleLabel;
    this.from = from;
    this.to = to;
    this.duties = duties;
  }

}
