import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { PortfolioItem } from './portfolioItem';
import { UserProfile, UserTheme } from '@pure-and-lazy/api-interfaces';

class User {
  @prop({ required: true, unique: true }) username!: string;
  @prop({ required: true }) email!: string;
  @prop() name?: string;
  @prop({ required: true }) dateJoined!: Date;
  @prop() description?: string;
  @prop({ required: true, unique: true }) auth0Id!: string;
  @prop() profilePicture?: string;
  @prop({ ref: PortfolioItem }) portfolio: Ref<PortfolioItem>[];
  @prop({ enum: UserTheme, type: Number, default: UserTheme.DEFAULT })
  theme?: UserTheme;
  @prop({ default: false }) themeDark?: boolean;

  static editableFields = [
    'name',
    'description',
    'profilePicture',
    'theme',
    'themeDark',
  ];

  static editableFields = ['name', 'description', 'profilePicture'];

  toProfile(): UserProfile {
    return {
      username: this.username,
      email: this.email,
      name: this.name,
      dateJoined: this.dateJoined,
      description: this.description,
      profilePicture: this.profilePicture,
      theme: this.theme,
      themeDark: this.themeDark,
    };
  }
}

const UserModel = getModelForClass(User);

export { User, UserModel };
