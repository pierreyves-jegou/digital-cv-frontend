import {IExperience} from './IExperience';
import {Profile} from './profile.model';

export interface ICv {
  experiences: IExperience[] | null;
  profile: Profile | null;
}
