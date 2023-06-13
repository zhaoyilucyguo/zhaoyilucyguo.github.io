export interface Artist {
    id: string;
    slug: string;
    created_at: string;
    updated_at: string;
    name: string;
    sortable_name: string;
    gender: string;
    biography: string;
    birthday: string;
    deathday: string;
    hometown: string,
    location: string,
    nationality: string,
    target_supply: boolean,
    image_versions: object,
    _links: {
      thumbnail: object,
      image: object,
      self: object,
      permalink: object,
      artworks: object,
      published_artworks: object,
      similar_artists: object,
      similar_contemporary_artists: object,
      genes: {
        href: string
      }
    }
  }