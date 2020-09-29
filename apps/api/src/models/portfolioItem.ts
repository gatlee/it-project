import { prop, getModelForClass } from '@typegoose/typegoose';
import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';

class PortfolioItem {
  @prop({ required: true }) category!: PortfolioCategory;
  @prop({ required: true }) name!: string;
  @prop({ required: true }) description!: string;
  @prop({ required: true }) content!: string;
  @prop({ required: true }) created!: Date;
  @prop({ required: true }) lastModified!: Date;
}

const PortfolioItemModel = getModelForClass(PortfolioItem);

export { PortfolioItem, PortfolioItemModel };
