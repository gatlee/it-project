interface Message {
  message: string;
}

enum PortfolioCategory {
  PROJECTS = 'projects',
  BLOG = 'blog',
}

interface PortfolioItem {
  _id?: string;
  category: PortfolioCategory;
  name: string;
  description: string;
  content: string;
  created?: Date;
  lastModified?: Date;
  image?: string;
  public?: boolean;
}
type PortfolioItemValue = PortfolioItem[keyof PortfolioItem];

interface UserProfile {
  username: string;
  email: string;
  name?: string;
  dateJoined: Date;
  description?: string;
  profilePicture?: string;
  theme?: UserTheme;
  themeDark?: boolean;
}

enum UserTheme {
  DEFAULT,
  // TODO: add more themes here
}

export {
  Message,
  PortfolioItem,
  PortfolioItemValue,
  PortfolioCategory,
  UserProfile,
  UserTheme,
};
