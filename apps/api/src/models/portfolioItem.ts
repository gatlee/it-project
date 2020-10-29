import { prop, getModelForClass } from '@typegoose/typegoose';
import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';

class PortfolioItem {
  @prop({ required: true, type: String, enum: PortfolioCategory })
  category!: PortfolioCategory;
  @prop({ required: true }) name!: string;
  @prop({ required: true }) description!: string;
  @prop() content?: string;
  @prop({ required: true }) created!: Date;
  @prop({ required: true }) lastModified!: Date;
  @prop() image?: string;
  @prop({ default: true }) public?: boolean;
}

const PortfolioItemModel = getModelForClass(PortfolioItem);

export { PortfolioItem, PortfolioItemModel };
