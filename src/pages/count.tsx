// import React from 'react';
// import { useDispatch } from 'react-redux';
// import counterSlice from '../ducks/counter/slice';
// import { useCounterState } from '../ducks/counter/selectors';

// const Page: React.VFC = () => {
//   const dispatch = useDispatch();
//   const state = useCounterState().counter;

//   const increment = () => {
//     dispatch(counterSlice.actions.incrementCounter(1));
//   };

//   const decrement = () => {
//     dispatch(counterSlice.actions.decrementCounter(1));
//   };

//   return (
//     <>
//       <button type="button" onClick={increment}>
//         ふやす
//       </button>
//       <button type="button" onClick={decrement}>
//         へらす
//       </button>
//       <p>ねこが{state.count}匹いる</p>
//     </>
//   )
// };

// export default Page;