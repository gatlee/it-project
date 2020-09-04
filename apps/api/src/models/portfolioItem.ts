import {
  prop,
  getModelForClass,
  getDiscriminatorModelForClass,
} from '@typegoose/typegoose';

class PortfolioItem {
  @prop() name: string;
  @prop() description: string;
  @prop() lastModified: Date;
}

const PortfolioItemModel = getModelForClass(PortfolioItem);

// For now, portfolio items are just plain text
// TODO: implement images, document files e.g. PDF, rich text documents with associated images

class TextItem extends PortfolioItem {
  @prop() content: string;
}

const TextItemModel = getDiscriminatorModelForClass(
  PortfolioItemModel,
  TextItem
);

export { PortfolioItem, PortfolioItemModel, TextItem, TextItemModel };
