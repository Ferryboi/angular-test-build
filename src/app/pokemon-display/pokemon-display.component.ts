import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: '[pokemon-display]',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.css']
})
export class PokemonDisplayComponent {

  @Input() pokemon : Pokemon | undefined;

  getFrontSprite() {
    if(this.pokemon) {
      return this.pokemon.getFrontSprite();
    }
  }

  getName() {
    if(this.pokemon) {
      return this.pokemon.getName();
    }
    return "";
  }

  getNationalDexNum() {
    if(this.pokemon) {
      return this.pokemon.getNationalDexNum();
    }
    return "";
  }

  getTypes() {
    if(this.pokemon) {
      return this.pokemon.getTypes();
    }
    return [];
  }

  getAbilities() {
    if(this.pokemon) {
      return this.pokemon.getAbilities();
    }
    return [];
  }

  getIsDefault() {
    if(this.pokemon) {
      return this.pokemon.getIsDefault();
    }
    return false;
  }
}
