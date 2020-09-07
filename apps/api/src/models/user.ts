import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { PortfolioItem } from './portfolioItem';

class User {
  @prop({ unique: true }) username: string;
  @prop() email: string;
  @prop() passwordHash: string;
  @prop() name: string;
  @prop() dateJoined: Date;
  @prop({ ref: PortfolioItem }) portfolio: Ref<PortfolioItem>[];
}

const UserModel = getModelForClass(User);

export { User, UserModel };
