export interface Gene {
    id: string,
    created_at: string,
    updated_at: string,
    name: string,
    display_name: string,
    description: string,
    image_versions: Object,
    _links: {
      thumbnail: { href: ''},
      image: Object,
      self: Object,
      permalink: Object,
      artworks: Object,
      published_artworks: Object,
      artists: Object
    }
  }