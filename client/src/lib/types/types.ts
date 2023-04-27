interface User {
  id: string;
  name: string;
  email: string;
}

interface Post{
  id: string;
  title: string;
  subtitle: string;
  description: string;
  user: User
}
export type {User, Post}