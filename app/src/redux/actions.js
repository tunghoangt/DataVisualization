export const CHANGE_YEAR = 'CHANGE_YEAR'
export const CHANGE_US_STATE = 'CHANGE_US_STATE'
export const CHANGE_SPECIES = 'CHANGE_SPECIES'
export const CHANGE_UNIT = 'CHANGE_UNIT'

export function changeYear(year) {
  return {
    type: CHANGE_YEAR,
    year: year
  }
};

export function changeUsState(usState) {
  return {
    type: CHANGE_US_STATE,
    usState: usState
  }
}

export function changeSpecies(species) {
  return {
    type: CHANGE_SPECIES,
    species: species
  }
}

export function changeUnit(unit) {
  return {
    type: CHANGE_UNIT,
    unit: unit
  }
}
