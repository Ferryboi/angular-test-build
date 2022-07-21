import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataService {
    private baseUrl = "https://pokeapi.co/api/v2/";

    constructor(private httpClient : HttpClient) {

    }

    getList(limit : number = 100000) {
        return this.httpClient.get(this.baseUrl + "pokemon?limit=" + limit);
    }

    getPokemon(name : string) {
        return this.httpClient.get(this.baseUrl + "pokemon/" + name);
    }

    getSpecificUrl(url : string) {
        return this.httpClient.get(url);
    }

    getType(type : string) {
        return this.httpClient.get(this.baseUrl + "type/" + type);
    }

    getAllTypes() {
        return this.httpClient.get(this.baseUrl + "type");
    }
}