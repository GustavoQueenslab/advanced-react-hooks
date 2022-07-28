// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js



import * as React from 'react'

//useReducer is very similar to useState. It usually preferable to use when we have complex state of logic
//that the next state depends on the previous one

function reducer(state,action){
  // the first value is the state and action is what we pass inside the dispatch function.
  console.log(action)

  switch (action.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state -1
    case "double":
      return state *2
    default:
      return state;
  }
}
function sayMyName(){
  return 'Gustavo Ferreira'
}
function Counter() {
  // The first value it's the state and the second is the function that we'll call later. 
  const [state,dispatch] = React.useReducer(reducer,0)
  //Inside useReducer the first parameter is the reducer function and the second it's the initial state
  // When the state when the state changes the component will be re-rendered 
  return(
  <>
    <button onClick={()=>dispatch({type:'increment',name:sayMyName()})}>Increment</button>
    <button onClick={()=>dispatch({type:'decrement'})}>Decrement</button>
    <button onClick={()=>dispatch({type:'double'})}>Double</button>
    <p>{state}</p>
  </>
  )
}
function App() {
  return <Counter />
}

export default App
