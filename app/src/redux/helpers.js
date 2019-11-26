
// helper f'n to pull out variables from redux-store & pass
// to each React Component (for onChange in any)
export const mapStateToProps = state => ({
  species: state.species,
  usState: state.usState,
  year: state.year,
  aggregateBy: state.aggregateBy,
  data: state.data
});

export default mapStateToProps;
