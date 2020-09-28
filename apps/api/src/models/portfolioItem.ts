import { prop, getModelForClass } from '@typegoose/typegoose';
import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';

class PortfolioItem {
  @prop() category: PortfolioCategory;
  @prop() name: string;
  @prop() description: string;
  @prop() content: string;
  @prop() created: Date;
  @prop() lastModified: Date;
}

const PortfolioItemModel = getModelForClass(PortfolioItem);

export { PortfolioItem, PortfolioItemModel };
