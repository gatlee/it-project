import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { PortfolioItem } from './portfolioItem';
import { UserProfile } from '@pure-and-lazy/api-interfaces';

class User {
  @prop({ required: true, unique: true }) username!: string;
  @prop({ required: true }) email!: string;
  @prop() name?: string;
  @prop({ required: true }) dateJoined!: Date;
  @prop() description?: string;
  @prop({ required: true, unique: true }) auth0Id!: string;
  @prop() profilePicture?: string;
  @prop({ ref: PortfolioItem }) portfolio: Ref<PortfolioItem>[];

  static editableFields = ['name', 'description', 'profilePicture'];

  toProfile(): UserProfile {
    return {
      username: this.username,
      email: this.email,
      name: this.name,
      dateJoined: this.dateJoined,
      description: this.description,
      profilePicture: this.profilePicture,
    };
  }
}

const UserModel = getModelForClass(User);

export { User, UserModel };
