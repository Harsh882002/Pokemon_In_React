import { useEffect, useState } from "react"
import { PokemonCards } from "./PokemonCards";
import './pokemon.css'

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [search, setSearch] =  useState("");

    // This is api where we are going to fetch data 
    const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

    // this is a fetchPokemonApi function where we fecth api and print the data in console 
    const fetchPokemonApi = async () => {
        try {
            // here we use aync await 
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data)

            // here we fetch perticular one one element data from apt 
            const detailedPokemonData = data.results.map(async (curPokemon) => {

                const res = await fetch(curPokemon.url);
                const data = await res.json();
                console.log(data)
                return data;
            });

            const detailedResponse = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponse)
            // console.log(detailedResponse)
            setLoading(false);


        }
        catch (error) {
            setLoading(false)
            // console.log(error)
            setError(error)
        }
    }


    // it is useEffect hooks where we fetch side effect data 
    useEffect(() => {
        fetchPokemonApi();
    }, [])

//search Functionality to searh data 
    const searchData = pokemon.filter((curCard)=>
        curCard.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div>
                <h1>Loading.....</h1>
            </div>
        )
    }

    if (error) {
        return (
            <>

                <h1>{error.message}</h1></>
        )
    }

    return (
        <>
            <section className="container">
                <header>
                    <h1>Lets's Catch Pokemon </h1>
                </header>
                <div>
                <input type="text"
                name="search" 
                placeholder="Search....."
                value={search} 
                onChange={(e) => setSearch(e.target.value)   } />
                </div>
                
                <br /><br />
                <div>
                    <ul className="cards">
                        {
                            searchData.map((curElem) => {
                                return <PokemonCards key={curElem.id} pokemonData={curElem} />
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}