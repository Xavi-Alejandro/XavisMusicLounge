import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import {MusicDataService} from "../music-data.service";

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  //Subscription variable
  postSubMusicVar: any;

  constructor(private musicData: MusicDataService) { }

  releases:any = undefined;

  ngOnInit(): void {
    this.postSubMusicVar = this.musicData.getNewReleases().subscribe(musicInfo =>{
      this.releases = musicInfo.albums.items;
      console.log(this.releases);
    })
    //this.releases = data.albums.items;
  }


  ngOnDestroy(): void {
    this.postSubMusicVar.unsubscribe();
  }

}
