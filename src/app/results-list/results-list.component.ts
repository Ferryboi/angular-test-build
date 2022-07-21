import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Pokemon } from '../pokemon';
import { SearchCriteriaService } from '../search-criteria.service';

@Component({
  selector: 'results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
})

export class ResultsListComponent implements OnInit, OnDestroy {

  pokemonList : Pokemon[] = [];
  private searchSubscriber : Subject<any>;

  constructor(private dataService : DataService, private searchCriteria : SearchCriteriaService) {
    this.searchSubscriber = this.searchCriteria.recieveSearchCritera();
    this.searchSubscriber.subscribe((searchRes : any) => {

      //If looking for a specific type
      if(searchRes.type1Filter !== 'any') {
        dataService.getType(searchRes.type1Filter).subscribe((dataRes : any) => {
          this.fillPokemonList(dataRes.pokemon, searchRes);
        })
      }

      //If there are no search criteria that can interact with the api
      else {
        dataService.getList().subscribe((dataRes : any) => {
          this.fillPokemonList(dataRes.results, searchRes);
        })
      }
    });
  }

  fillPokemonList(results : any[], criteria : any) {
    this.pokemonList = [];

    for(let i = 0; i < results.length; i++) {
      let pokemonData = results[i] as any;

      //in case pokemon info is stored in a pokemon property
      if(pokemonData.pokemon) pokemonData = pokemonData.pokemon as any;

      this.dataService.getSpecificUrl(pokemonData.url).subscribe({
        next: (uniqueRes : any) => {
          let newPokemon = new Pokemon(uniqueRes);

          //Make sure the name filter is included in the criteria
          if(criteria.nameFilter !== "" && !newPokemon.getName().toLowerCase().includes(criteria.nameFilter.toLowerCase())) return;

          //If you should not be displaying non-defaults and the pokemon is non-default
          if(!criteria.displayNonDefaults && !newPokemon.getIsDefault()) return;

          //If both types need to meet the criteria
          if(criteria.type2Filter !== "any") {
            let pokemonTypes = newPokemon.getTypes();
            //If the pokemon does not have a second type or their second type is not equal to the criteria
            if(!pokemonTypes.includes(criteria.type2Filter)) return;
          }

          this.pokemonList.push(new Pokemon(uniqueRes)); 
        }, 
        complete: () => { this.pokemonList.sort((p1,p2) => p1.getNationalDexNum() - p2.getNationalDexNum()); },
    })}
  }

  ngOnInit(): void {
    //this.searchCriteria.sendCurrentSearchCriteria();
  }
  
  ngOnDestroy(): void {
    this.searchSubscriber.unsubscribe();
  }
}
