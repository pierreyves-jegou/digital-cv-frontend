import {ICv} from '../ICv';
import {IExperience} from '../IExperience';
import {Profile} from '../profile.model';

export class Cv implements ICv{
  experiences: IExperience[] | null;
  profile: Profile | null;

  constructor(experiences: IExperience[] | null, profile: Profile | null) {
    this.experiences = experiences;
    this.profile = profile;
  }

}
