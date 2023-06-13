export interface Search {
    type: string;
    title: string;
    description: null;
    og_type: string; // type
    _links: {
      self: {
        href: string; // id
      };
      permalink: object;
      thumbnail: {
        href: string; // img
      }
    }
  }