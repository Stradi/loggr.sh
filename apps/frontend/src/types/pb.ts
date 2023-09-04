type Base = {
  id: string;
  created: string;
  updated: string;
};

export type Account = Base & {
  email: string;
  emailVisibility: boolean;
  verified: boolean;
};

export type Product = Base & {
  name: string;
  slug: string;
  icon: string;
  short_description: string;
  website_url: string;
  admin_user: Account;
};
