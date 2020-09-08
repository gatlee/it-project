import {
  prop,
  getModelForClass,
  getDiscriminatorModelForClass,
  modelOptions,
} from '@typegoose/typegoose';
import { PortfolioItemUnion } from '@pure-and-lazy/api-interfaces';

@modelOptions({
  schemaOptions: {
    discriminatorKey: 'type',
  },
})
class PortfolioItem {
  @prop() name: string;
  @prop() description: string;
  @prop() created: Date;
  @prop() lastModified: Date;

  toUnion(): PortfolioItemUnion {
    if (this.constructor.name == 'PortfolioItem') {
      throw new Error(
        'PortfolioItem should be treated as abstract, but an instance of it was created'
      );
    }
    return (this as unknown) as PortfolioItemUnion;
  }
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
