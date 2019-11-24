// https://redux-docs.netlify.com/basics/actions
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const CHANGE_SPECIES = 'CHANGE_SPECIES';
export const CHANGE_US_STATE = 'CHANGE_US_STATE';

// we can extend this to include multiple values for each
export function changeYear(year) {
  return {type: CHANGE_YEAR, year}
};

export function changeSpecies(species) {
  return {type: CHANGE_SPECIES, species}
};

export function changeUsState(usState) {
  return {type: CHANGE_US_STATE, usState}
};
