import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { PortfolioItem } from './portfolioItem';
import { UserProfile } from '@pure-and-lazy/api-interfaces';

class User {
  @prop({ unique: true }) username: string;
  @prop() email: string;
  @prop() name?: string;
  @prop() dateJoined: Date;
  @prop() description?: string;
  @prop({ unique: true }) auth0Id: string;
  @prop({ ref: PortfolioItem }) portfolio: Ref<PortfolioItem>[];

  toProfile(): UserProfile {
    return {
      username: this.username,
      email: this.email,
      name: this.name,
      dateJoined: this.dateJoined,
      description: this.description,
    };
  }
}

const UserModel = getModelForClass(User);

export { User, UserModel };
