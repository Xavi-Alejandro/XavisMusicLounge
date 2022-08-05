import { NumberSymbol } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {


  results: any;
  postSubResults: any;

  searchQuery: any;
  postSubSearchQuery: any;

  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.postSubSearchQuery = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || 0;
      console.log("Query is: " + this.searchQuery);

      this.postSubResults = this.musicData.searchArtists(this.searchQuery).subscribe(returnedArtists => {
        console.log("searchArtists spotify query called. Returned array is: " + returnedArtists.artists.items);
        console.log("returned artists" + returnedArtists.artists.items);
        this.results = returnedArtists.artists.items.filter(artist => artist.images.length > 0);
      });

    });
  }

  ngOnDestroy(): void {
    this.postSubSearchQuery.unsubscribe();
    this.postSubResults.unsubscribe();
  }

}
