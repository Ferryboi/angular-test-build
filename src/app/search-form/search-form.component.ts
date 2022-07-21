import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { SearchCriteriaService } from '../search-criteria.service';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  searchForm = new FormGroup({
    nameFilter: new FormControl(''),
    type1Filter: new FormControl('any'),
    type2Filter: new FormControl('any'),
    displayNonDefaults: new FormControl(false),
  });

  types : string[] = [];

  constructor(private data : DataService, private searchCriteria : SearchCriteriaService) { 
    this.data.getAllTypes().subscribe((res : any) => {
      let typeArray = res.results as any[];
      typeArray.forEach((element : any) => {
        if(element.name !== "unknown" && element.name !== "shadow") { 
          this.types.push(element.name);
        }
      });
    });
  }

  onSubmit() {
    this.searchCriteria.provideSearchCriteria(this.searchForm.value);
  }
}
