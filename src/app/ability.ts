export class Ability {
    name : string = "";
    isHidden : boolean = false;

    constructor(name : string, isHidden : boolean) {
        this.name = name;
        this.isHidden = isHidden;
    }
}