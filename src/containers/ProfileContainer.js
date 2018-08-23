import { connect } from 'react-redux';
import Profile2 from '../components/Profile2';
import * as actions from '../actions';

// Map redux state to component props
function mapStateToProps(state) {
  return {
    count: state.CountReducer.count,
    wish_value: state.CountReducer.wish_value
  };
}

// Map redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(actions.increaseTodo()),
    onUpdateClick: event => dispatch(actions.updateTodo(event.target.value))
  };
}

// Connected Component
const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile2);

export default ProfileContainer;
