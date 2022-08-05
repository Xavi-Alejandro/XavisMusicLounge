import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service'

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  artistId: any;
  private idPostSubVar: any;

  albums: any;
  private albumsPostSubVar: any;

  artist: any;
  private artistPostSubVar: any;

  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    //Subscribe to query parameter for id
    this.idPostSubVar = this.route.params.subscribe(params => {
      this.artistId = params['id'];
      console.log('idParameter: ' + params['id']);
    });

    //After the id is obtained, subscribe to the artists and album
    //subscibe to albums
    this.albumsPostSubVar = this.musicData.getAlbumsByArtistId(this.artistId).subscribe(albumInfo => {
      console.log("ALBUM INFO"+albumInfo);
      this.albums = albumInfo.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() ===
        curValue.name.toUpperCase()) === index);
    });

    //subscibe to artists
    this.artistPostSubVar = this.musicData.getArtistById(this.artistId).subscribe(artistInfo => {
      this.artist = artistInfo;
    });





    // //Below line is to filter out duplicate album names
    // this.albums = albumData.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() ===
    //   curValue.name.toUpperCase()) === index);

    // this.artist = artistData;
  }

  ngOnDestroy(): void {
    this.albumsPostSubVar.unsubscribe();
    this.artistPostSubVar.unsubscribe();
    this.artistPostSubVar.unsubscribe();
  }

}
