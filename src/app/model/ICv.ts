import {IExperience} from './IExperience';
import {Profile} from './profile.model';

export interface ICv {
  id: string | null;
  experiences: IExperience[] | null;
  profile: Profile | null;
}
