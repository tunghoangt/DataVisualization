
// helper f'n to pull out variables from redux-store & pass
// to each React Component (for onChange in any)
const mapStateToProps = (state) => {
  return {
    species: state.species,
    usState: state.usState,
    year: state.year,
    unit: state.unit,
    data: state.data
  }
};

export default mapStateToProps;
