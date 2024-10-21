import { useEffect } from "react"

export const Pokemon = () => {

    // This is api where we are going to fetch data 
    const API = "https://pokeapi.co/api/v2/pokemon?limit=34";

    // this is a fetchPokemonApi function where we fecth api and print the data in console 
    const fetchPokemonApi = async () => {
        try {
            // here we use aync await 
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data)

            // here we fetch perticular one one element data from apt 
            const detailedPokemonData = data.results.map((curPokemon) =>{
                console.log(curPokemon.url)
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    // it is useEffect hooks where we fetch side effect data 
    useEffect(() => {
        fetchPokemonApi();
    }, [])

    return (
        <>
            <h1>Lets Search About APi</h1>
        </>
    )
}