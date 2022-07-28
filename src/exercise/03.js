// useContext: simple Counter
// http://localhost:3000/isolated/final/03.js

import * as React from 'react'

//Context can be used to avoid passing a lot of props between components. To avoid this we can share a context
// in the closest common parent 

//Created a context - It can have a default value with a number inside ()
const CountContext = React.createContext()
function App() {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return (
    <div>
      <CountContext.Provider value={value}>
        {/* All components inside the provider can access to the shared value */}
        <CountDisplay />
        <Counter />
      </CountContext.Provider>
    </div>
  )
}
function CountDisplay() {
  //Every time that the context changes the child component will be re-rendered
  console.log("I was re-rendered")
  const [count] = React.useContext(CountContext)
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = React.useContext(CountContext)
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}
export default App
