import { Component, OnInit } from '@angular/core';
import { Search } from '../search';
import { Artist } from '../artist';
import { Artworks } from '../artworks';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //search
  name:string='';
  selectedCardId:string='';
  search?: Search[];
  selectedSearch?: Search;
  showAlert: boolean = false;
  showSrch: boolean = false;
  showBtn:boolean = false;
  showLoadArt:boolean = false;
  showArtist:boolean = false;
  showArtworks: boolean = false;
  showLoad: boolean = false;
  //artist
  showArtistContent:boolean=false;
  // artworks
  showArtworksContent:boolean=false;
  showAlertArtworks: boolean = false;
  selectedArtwork?: Artworks;
  // API request
  artistId: string = '';
  artist: Artist = {id: '',
    slug: '',
    created_at: '',
    updated_at: '',
    name: '',
    sortable_name: '',
    gender: '',
    biography: '',
    birthday: '',
    deathday: '',
    hometown: '',
    location: '',
    nationality: '',
    target_supply: false,
    image_versions: {},
    _links: {
      thumbnail: {},
      image: {},
      self: {},
      permalink: {},
      artworks: {},
      published_artworks: {},
      similar_artists: {},
      similar_contemporary_artists: {},
      genes: {
        href: ''
      }
    }
  };
  artworks: Artworks[] = [{  
    id: '',
    slug: '',
    created_at: '',
    updated_at: '',
    title: '',
    category: '',
    medium: '',
    date: '',
    dimensions: {},
    published: false,
    website: '',
    signature: '',
    series: '',
    provenance: '',
    literature: '',
    exhibition_history: '',
    collecting_institution: '',
    additional_information: '',
    image_rights: '',
    blurb: '',
    unique: false,
    cultural_maker: null, //?? null
    iconicity: 0,
    can_inquire: true,
    can_acquire: true,
    can_share: true,
    sale_message: null, // null
    sold: true,
    image_versions: {},
    _links: {
      thumbnail: {href: ''},
      image: {},
      partner: {},
      self: {},
      permalink: {},
      genes: {href: ''},
      artists: {},
      similar_artworks: {},
      collection_users: {},
      sale_artworks: {}
    },
    _embedded: {}
  }];
  constructor(
    private http: HttpClient
  ) { }
  
  ngOnInit(): void {
    this.resetBtn();
  }
  searchArtsy(input:string) {
    if (!input) {
      return;
    }
    this.reset();
    this.resetBtn();
    this.showLoad = true;
    this.http.get(`https://artistsearchbackend.onrender.com/search?name=${input}`)
    .subscribe((data) => {
      for (let entry of data as Search[]) {
          if (entry.og_type == "artist") {
            this.search?.push(entry)
          }
      }        
      this.showLoad = false;
      if (this.search?.length == 0) {
        this.showAlert = true;
      }
      else {
        this.showSrch = true;
      }      
    })
  }
  clearArtsy() {
    this.name = '';
    this.reset();
  }
  reset() {
    this.search = [];
    this.showBtn = false;
    this.showArtist = false;
    this.showArtworks = false;
    this.showSrch = false;
    this.showAlert = false;
    this.selectedCardId = '';
    
  }
  resetBtn(){
    document.getElementById("artworksBtn")?.setAttribute("style", "background-color: white; color: #205375;");
    document.getElementById("artistBtn")?.setAttribute("style", "background-color: #205375; color: white;");
  }
  artistArtsy(search: Search) {
      this.selectedSearch = search;
      if (this.selectedCardId) {
        document.getElementById(this.selectedCardId)?.setAttribute("style", "background-color:#205375");
      }
      this.selectedCardId = this.selectedSearch?._links.self.href as string;
      document.getElementById(this.selectedCardId)?.setAttribute("style", "background-color:#112B3C;");

      this.showLoadArt = true;
      this.showBtn = false;
      const href = this.selectedSearch?._links.self.href;
      const id = href.substring(href.lastIndexOf( "/" )+1, );
      this.showArtist = true;
      this.showArtworks = false; 
      this.artistId = id;
      this.showArtistContent = false;
      this.showArtworksContent = false;
      this.showAlertArtworks = false;
      // load artist
      this.http.get(`https://artistsearchbackend.onrender.com/artist?id=${this.artistId}`)
      .subscribe((data) => {
        this.artist = data as Artist;
        this.showArtistContent = true;
        this.resetBtn();
        this.showLoadArt = false;
        this.showBtn = true; 
      }) 
      // load artworks
      this.http.get(`https://artistsearchbackend.onrender.com/artworks?id=${this.artistId}`)
      .subscribe((data) => {
        this.artworks = data as Artworks[];
        this.showArtworksContent = true;
        if (this.artworks.length == 0) {
          this.showAlertArtworks = true;
        }
        else {
          this.showArtworksContent = true;
        } 
           
      })   
         
  }
  artistDisplay() {
      this.showArtist = true;
      this.showArtworks = false; 
      this.resetBtn();
  }
  artworksDisplay() {
    this.showArtist = false;
    this.showArtworks = true; 
    document.getElementById("artistBtn")?.setAttribute("style", "background-color: white; color: #205375;");
    document.getElementById("artworksBtn")?.setAttribute("style", "background-color: #205375; color: white;");
  }
  geneArtsy(artwork: Artworks) {
    this.selectedArtwork = artwork;
  }
}
