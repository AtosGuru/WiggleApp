export enum Genders {
    MALE = 'male',
    FEMALE = 'female',
    EVERYONE = 'everyone'
}

export enum GendersPreference {
    MEN = 'men',
    WOMEN = 'women',
    ANYONE = 'anyone'
}

export interface GendersType {
    id: number
    name: Genders
}