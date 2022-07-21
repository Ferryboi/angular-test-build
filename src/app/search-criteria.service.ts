import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {
  
  private displayNonDefaults : boolean = false;
  private nameFilter : string = "";
  private type1Filter : string = "any";
  private type2Filter : string = "any";

  provideSearchCriteria(criteria : any) {
    this.displayNonDefaults = criteria.displayNonDefaults;
    this.nameFilter = criteria.nameFilter;
    this.type1Filter = criteria.type1Filter;
    if(this.type1Filter == "any") {
      this.type2Filter = 'any';
    } else  {
      this.type2Filter = criteria.type2Filter;
    }

    this.sendCurrentSearchCriteria();
  }

  sendCurrentSearchCriteria() {
    let returnObj = {
      displayNonDefaults: this.displayNonDefaults,
      nameFilter: this.nameFilter,
      type1Filter: this.type1Filter,
      type2Filter: this.type2Filter,
    }

    this.seachCriteria.next(returnObj);
  }

  recieveSearchCritera() : Subject<any> {
    return this.seachCriteria;
  }

  seachCriteria = new Subject<any>()
}
