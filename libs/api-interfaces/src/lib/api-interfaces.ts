interface Message {
  message: string;
}

interface PortfolioItem {
  name: string;
  description: string;
  created?: Date;
  lastModified?: Date;
}

interface TextItem extends PortfolioItem {
  type: 'TextItem';
  content: string;
}

type PortfolioItemUnion = PortfolioItem | TextItem;

interface UserProfile {
  username: string;
  email: string;
  name?: string;
  dateJoined: Date;
}

export { Message, PortfolioItem, TextItem, PortfolioItemUnion, UserProfile };
