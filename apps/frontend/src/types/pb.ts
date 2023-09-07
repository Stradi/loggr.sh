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

  extend?: {
    admin_user?: Account;
  };
};

export type Changelog = Base & {
  name: string;
  slug: string;
  short_description: string;
  content: string;
  featured_image: string;
  tags: ('FIX' | 'ANNOUNCEMENT' | 'COMING_SOON' | 'IMPROVEMENT')[];

  extend?: {
    product?: Product;
  };
};
