import { Genders, GendersType , GendersPreference } from "../dating_preferences/interface";

export const screenTabs = [
    {
      id: 1,
      name: 'At the clubs'
    },
    {
      id: 2,
      name: 'Nearby'
    },
    {
      id: 3,
      name: 'Matches'
    }
  ]

export const genders: GendersType[] = [
    {
        id: 1,
        name: Genders.MALE,
    },
    {
        id: 2,
        name: Genders.FEMALE,
    },
    {
        id: 3,
        name: Genders.EVERYONE,
    },
]
export const GendersPreferenceUpdateNames: GendersType[] = [
    {
        id: 1,
        name: GendersPreference.MEN,
    },
    {
        id: 2,
        name: GendersPreference.WOMEN,
    },
    {
        id: 3,
        name: GendersPreference.ANYONE,
    },
]