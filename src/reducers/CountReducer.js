export default function CountReducer(
  state = {
    count: 0,
    wish_value: 0
  },
  action
) {
  const count = state.count;
  const wish_value = action.wish_value;
  switch (action.type) {
    case 'INCREASE':
      return { count: Number(count) + 1 };
    case 'UPDATE':
      return {
        count: wish_value
      };
    default:
      return state;
  }
}
