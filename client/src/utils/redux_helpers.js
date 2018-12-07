import { bindActionCreators } from 'redux';

export const mapStateToProps = variables => state => {
  let result = {};
  for (let variable in variables) {
    result[variable] = variables[variable](state);
  }
  return result;
};

export const mapDispatchToProps = actions => dispatch =>
  bindActionCreators(actions, dispatch);
