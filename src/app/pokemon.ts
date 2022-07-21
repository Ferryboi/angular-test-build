import { Ability } from "./ability";

export class Pokemon {
    abilities : [];
    types : [];
    sprites : {};
    name : string;
    id : number;
    stats : [];
    species : [];
    isDefault : boolean;
    order: number;

    constructor(infoObj : any) {
        this.abilities = infoObj.abilities;
        this.types = infoObj.types;
        this.sprites = infoObj.sprites;
        this.name = infoObj.name;
        this.id = infoObj.id;
        this.stats = infoObj.stats;
        this.species = infoObj.species;
        this.isDefault = infoObj.is_default;
        this.order = infoObj.order;
    }

    getFrontSprite() {
        let sprites = this.sprites as any;
        return sprites.front_default;
    }

    getName() {
        let species = this.species as any;
        let speicesName = this.isDefault ? species.name : this.name;
        return speicesName;
    }

    getNationalDexNum() {
        return this.id;
    }

    getTypes() : string[] {
        let typeList : string[] = [];
        let pTLObj = this.types;
        for(let i = 0; i < pTLObj.length; i++) {
            let typeObj = (pTLObj[i] as any).type as any;
            typeList.push(typeObj.name);
        }
        return typeList;
    }

    getAbilities() {
        let abilityList : Ability[] = [];
        let pALObj = this.abilities;
        for(let i = 0; i < pALObj.length; i++) {
            let abilityWrapperObj = pALObj[i] as any;
            let isHidden = abilityWrapperObj.is_hidden;
            let name = (abilityWrapperObj.ability as any).name;
            console.log(abilityWrapperObj);
            abilityList.push(new Ability(name, isHidden));
        }
        return abilityList;
    }

    getIsDefault() {
        return this.isDefault;
    }

    getOrder() {
        return this.order;
    }
}