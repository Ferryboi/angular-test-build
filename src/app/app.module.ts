import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { PokemonDisplayComponent } from './pokemon-display/pokemon-display.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultsListComponent,
    PokemonDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
