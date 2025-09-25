export type UserType = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  address: {
    address: string;
    city: string;
  };
  role: "admin" | "user" | "moderator";
};
