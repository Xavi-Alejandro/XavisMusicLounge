import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { GuardAuthService } from './guard-auth.service';
import { LoginComponent } from './login/login.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TempFavouritesComponent } from './temp-favourites/temp-favourites.component';

const routes: Routes = [
  {path: "", redirectTo: "/newReleases", pathMatch: "full"},
  {path: "about", component: AboutComponent, canActivate: [GuardAuthService]},
  {path: "album/:id", component: AlbumComponent, canActivate: [GuardAuthService]},
  {path: "artist/:id", component: ArtistDiscographyComponent, canActivate: [GuardAuthService]},
  {path: "newReleases", component: NewReleasesComponent, canActivate: [GuardAuthService]},
  {path: "favourites", component: FavouritesComponent, canActivate: [GuardAuthService]},
  {path: "search", component: SearchResultComponent, canActivate: [GuardAuthService]},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
