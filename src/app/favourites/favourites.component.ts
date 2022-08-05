import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];
  favouritesPostSub: any;
  constructor(private musicData: MusicDataService) { }

  removeFromFavourites(id: string){
    console.log("Passed id to removeFromServices() is: "+ id);
    this.favouritesPostSub = this.musicData.removeFromFavourites(id).subscribe((returnedFavs: { tracks: any[]; }) =>{
      this.favourites = returnedFavs.tracks;
      console.log("RETURNED TRACKS: "+JSON.stringify(this.favourites));
    })
  }
  ngOnInit(): void {
    this.favouritesPostSub = this.musicData.getFavourites().subscribe((returnedFavs: { tracks: any[]; }) =>{
      this.favourites = returnedFavs.tracks;
      console.log(returnedFavs);
    });
  }

  ngOnDestroy(): void {
    this.favouritesPostSub.unsubscribe();
  }

}
