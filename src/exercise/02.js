import * as React from 'react'
// import {
//   fetchPokemon,
//   PokemonForm,
//   PokemonDataView,
//   PokemonInfoFallback,
//   PokemonErrorBoundary,
// } from '../pokemon'


// // 🐨 this is going to be our generic asyncReducer
// function asyncReducer(state, action) {
//   switch (action.type) {
//     case 'pending': {
//       // 🐨 replace "pokemon" with "data"
//       return {status: 'pending', data: null, error: null}
//     }
//     case 'resolved': {
//       // 🐨 replace "pokemon" with "data" (in the action too!)
//       return {status: 'resolved', data: action.pokemon, error: null}
//     }
//     case 'rejected': {
//       // 🐨 replace "pokemon" with "data"
//       return {status: 'rejected', data: null, error: action.error}
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }
// function useAsync() {
//   const [state, dispatch] = React.useReducer(asyncReducer, {
//     status: pokemonName ? 'pending' : 'idle',
//     // 🐨 this will need to be "data" instead of "pokemon"
//     pokemon: null,
//     error: null,
//   })
// }
// function PokemonInfo({pokemonName}) {
//   // 🐨 move all the code between the lines into a new useAsync function.
//   // 💰 look below to see how the useAsync hook is supposed to be called
//   // 💰 If you want some help, here's the function signature (or delete this
//   // comment really quick if you don't want the spoiler)!
//   // function useAsync(asyncCallback, initialState, dependencies) {/* code in here */}

//   // -------------------------- start --------------------------



//   React.useEffect(() => {
//     // 💰 this first early-exit bit is a little tricky, so let me give you a hint:
//     // const promise = asyncCallback()
//     // if (!promise) {
//     //   return
//     // }
//     // then you can dispatch and handle the promise etc...
//     if (!pokemonName) {
//       return
//     }
//     dispatch({type: 'pending'})
//     fetchPokemon(pokemonName).then(
//       pokemon => {
//         dispatch({type: 'resolved', pokemon})
//       },
//       error => {
//         dispatch({type: 'rejected', error})
//       },
//     )
//     // 🐨 you'll accept dependencies as an array and pass that here.
//     // 🐨 because of limitations with ESLint, you'll need to ignore
//     // the react-hooks/exhaustive-deps rule. We'll fix this in an extra credit.
//   }, [pokemonName])
//   // --------------------------- end ---------------------------

//   // 🐨 here's how you'll use the new useAsync hook you're writing:
//   // const state = useAsync(() => {
//   //   if (!pokemonName) {
//   //     return
//   //   }
//   //   return fetchPokemon(pokemonName)
//   // }, {/* initial state */}, [pokemonName])
//   // 🐨 this will change from "pokemon" to "data"
//   const {pokemon, status, error} = state

//   switch (status) {
//     case 'idle':
//       return <span>Submit a pokemon</span>
//     case 'pending':
//       return <PokemonInfoFallback name={pokemonName} />
//     case 'rejected':
//       throw error
//     case 'resolved':
//       return <PokemonDataView pokemon={pokemon} />
//     default:
//       throw new Error('This should be impossible')
//   }
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   function handleReset() {
//     setPokemonName('')
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
//           <PokemonInfo pokemonName={pokemonName} />
//         </PokemonErrorBoundary>
//       </div>
//     </div>
//   )
// }

// function AppWithUnmountCheckbox() {
//   const [mountApp, setMountApp] = React.useState(true)
//   return (
//     <div>
//       <label>
//         <input
//           type="checkbox"
//           checked={mountApp}
//           onChange={e => setMountApp(e.target.checked)}
//         />{' '}
//         Mount Component
//       </label>
//       <hr />
//       {mountApp ? <App /> : null}
//     </div>
//   )
// }



//Usecallback return the whole function and help to avoid re-renders
function List({getItems}) {
    const [items,setItems]=React.useState([])
    React.useEffect(() => {
        setItems(getItems())
        console.log('Updating Items')
    }, [getItems]);
    return items.map(item=><div key={item}>{item}</div>)
}

function AppWithUnmountCheckbox() {
    const [number,setNumber]= React.useState(1)
    const [dark,setDark]= React.useState(false)
    ////We can see that without use callback when the theme is changed the function is re-rendered
    // const getItems = () =>{
    //     return [number +1,number +2]
    // }


    // //With use Callback
    // const getItems=React.useCallback(()=>{
    //         return [number +1,number +2]
    // },[number])

    // //With useEffect: You can't access this function inside useEffect
    // React.useEffect(()=>{
    //     const getItems = () =>{
    //         return [number +1,number +2]
    //     }
    // },[number])

    const getItems = React.useMemo(()=>{
        
            return [number +1,number +2]
        
    },[number])
    const theme = {
        backgroundColor: dark ? '#333' : '#FFF',
        color:dark ? '#FFF' : '#333'
    }
     return(
        <>
            <div style={theme}>
                <input type="number" value={number} onChange={e=>setNumber(parseInt(e.target.value))}/>
                <button onClick={()=>setDark(prevDark=>!prevDark)}>Toggle theme</button>
                <List getItems={getItems}/>
            </div>
        </>
    )
}
export default AppWithUnmountCheckbox