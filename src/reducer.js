export function Increase(value) {
  return {
    type: 'INCREASE',
    value,
  }
}

export function Decrease(value) {
  return {
    type: 'DECREASE',
    value,
  }
}

const previousState = {
  count: 1,
}

export default function Reducer(state = previousState, action) {
  switch (action.type) {
    case 'INCREASE':
      return {
        count: state.count + action.value,
      }
    case 'DECREASE':
      return {
        count: state.count + action.value,
      }
    default:
      return state
  }
}
