import { Component, OnDestroy, OnInit } from '@angular/core';
// import albumData from '../data/album.json';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';



@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  id: any;
  idPostSub: any

  album: any;
  albumPostSub: any;

  addToFavsPostSub: any;

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private musicData: MusicDataService) { }

  addToFavourites(trackId: string) {
    this.addToFavsPostSub = this.musicData.addToFavourites(trackId).subscribe(
      (result) => {
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 })
      },
      (err) => {
        this.snackBar.open("Unable to add song to Favourites", "", { duration: 1500 })
      })
    

  }

  ngOnInit(): void {
    this.idPostSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("id is: " + this.id);
    });

    this.albumPostSub = this.musicData.getAlbumById(this.id).subscribe(albumInfo => {
      this.album = albumInfo;
      console.log("album info is: " + JSON.stringify(this.album));
    });
  }

  ngOnDestroy(): void {
    this.idPostSub?.unsubscribe();
    this.addToFavsPostSub?.unsubscribe();
  }

}
