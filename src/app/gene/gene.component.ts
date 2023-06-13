import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Gene } from '../gene'
import { Artworks } from '../artworks';

@Component({
  selector: 'app-gene',
  templateUrl: './gene.component.html',
  styleUrls: ['./gene.component.css']
})
export class GeneComponent implements OnInit {
  showContent:boolean=false;
  showAlert: boolean = false;
  showLoad: boolean = false;
  genes: Gene[] = [{
    id: '',
    created_at: '',
    updated_at: '',
    name: '',
    display_name: '',
    description: '',
    image_versions: {},
    _links: {
      thumbnail: {href: ''},
      image: {},
      self: {},
      permalink: {},
      artworks: {},
      published_artworks: {},
      artists: {}
    }
  }]

  @Input() selectedArtwork?: Artworks;
  constructor(
    private http: HttpClient
  ) { }
  reset() {
    this.showLoad = true;
    this.showAlert = false;
    this.showContent = false;
  }
  ngOnInit(): void {
    this.reset();
    this.http.get(`https://artistsearchbackend.onrender.com/genes?id=${this.selectedArtwork?.id}`)
    .subscribe((data) => {
      this.genes = data as Gene[];   
      if (this.genes.length == 0) {
        this.showLoad = false;
        this.showAlert = true;
        
      }
      else {
        this.showLoad = false;
        this.showContent = true;
        
      }      
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.reset()
    this.http.get(`https://artistsearchbackend.onrender.com/genes?id=${this.selectedArtwork?.id}`)
    .subscribe((data) => {
      this.genes = data as Gene[];  
      if (this.genes.length == 0) {
        this.showLoad = false;
        this.showAlert = true;
      }
      else {
        this.showLoad = false;
        this.showContent = true;
      }      
    })
  }

}
