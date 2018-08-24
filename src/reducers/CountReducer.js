export default function countReducer(
  state = {
    count: 0,
    wish_value: 0
  },
  action
) {
  switch (action.type) {
    case 'INCREASE':
      return { count: Number(state.count) + 1 };
    case 'UPDATE':
      return {
        count: action.wish_value
      };
    default:
      return state;
  }
}
