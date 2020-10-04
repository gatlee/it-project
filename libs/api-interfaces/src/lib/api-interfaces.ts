interface Message {
  message: string;
}

enum PortfolioCategory {
  PROJECTS = 'projects',
  BLOG = 'blog',
}

interface PortfolioItem {
  category: PortfolioCategory;
  name: string;
  description: string;
  content: string;
  created?: Date;
  lastModified?: Date;
  image?: string;
}

interface UserProfile {
  username: string;
  email: string;
  name?: string;
  dateJoined: Date;
  description?: string;
  profilePicture?: string;
}

export { Message, PortfolioItem, PortfolioCategory, UserProfile };
