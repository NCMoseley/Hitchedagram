import { connect } from 'react-redux';
import Profile2 from '../components/Profile2';
import * as actions from '../actions';

function mapStateToProps(state) {
  return {
    count: state.C
  };
}
