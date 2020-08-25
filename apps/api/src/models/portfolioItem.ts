import * as mongoose from 'mongoose';

const options = { discriminatorKey: 'itemType' };

const PortfolioItem = mongoose.model(
  'PortfolioItem',
  new mongoose.Schema(
    {
      id: {
        type: mongoose.Types.ObjectId,
        index: true,
      },
      name: String,
      lastModified: Date,
    },
    options
  )
);

// For now, portfolio items are just plain text
// TODO: implement images, document files e.g. PDF, rich text documents with associated images
const TextPortfolioItem = PortfolioItem.discriminator(
  'TextPortfolioItem',
  new mongoose.Schema({ content: String }, options)
);

export { PortfolioItem, TextPortfolioItem };
