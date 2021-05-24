import {ICv} from '../ICv';
import {IExperience} from '../IExperience';
import {Profile} from '../profile.model';
import {Experience} from './experience';

export class Cv implements ICv{
  id: string | null;
  experiences: IExperience[];
  profile: Profile | null;

  constructor(id: string | null, experiences: IExperience[], profile: Profile | null) {
    this.id = id;
    this.experiences = experiences;
    this.profile = profile;
  }

  static emptyCv(): Cv{
    const exp: Experience = Experience.emptyExperience();
    return new Cv(null, [exp], null);
  }

  getExperiences(): IExperience[] {
    return this.experiences;
  }

}
