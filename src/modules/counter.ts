// Action
const INCREASE = "demo-02/modules/counter/INCREASE" as const;
const DECREASE = "demo-02/modules/counter/DECREASE" as const;
const INCREASE_BY = "demo-02/modules/counter/INCREASE_BY" as const;

// Action Creator
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff,
});

type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

type CounterState = {
  count: number;
};

/*
interface CounterState = {
    count: number;
}
*/

const intialState: CounterState = {
  count: 0,
};

//Reducer
function counter(state: CounterState = intialState, action: CounterAction) {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default counter;
