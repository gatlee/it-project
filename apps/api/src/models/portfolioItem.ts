import * as mongoose from 'mongoose';

// For now, portfolio items are just plain text
// TODO: implement images, document files e.g. PDF, rich text documents with associated images
const portfolioItemSchema = new mongoose.Schema({
  content: String,
});

export default mongoose.model('PortfolioItem', portfolioItemSchema);
