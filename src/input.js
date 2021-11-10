import React, { useState, useEffect } from 'react';
import './input.scss';

const Input = () => {
    const [ search, setSearch ] = useState('Banana');
    const [ final, setFinal ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ url, setUrl ] = useState('Banana');

    function handleChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;
        setUrl(apiURL);
    }

    useEffect(() => {
        setLoading(true)
        fetch(url).then((response) => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error('Bad response from server');
            }
            return response;
        })
        .then((res) => res.json())
        .then((data) => {
            let query = [];
            data.map((i) => {
                query.push(i);
                setFinal([query])
            })
        }).catch((error) => {
            console.log(error)
        });
        setLoading(false);
    },[url])

    console.log(final)

    return (
        <div>
            <div className="searchForm">
                <form onSubmit={handleSubmit}>
                    <input className="searchBar" type="text" name="search" value={search} placeholder="Search" 
                    onChange={handleChange} />
                    <button className="searchButton" type="submit">Submit</button>
                </form>
            </div>
            <div>
                {loading ? 'Loading' : 
                <div className="resultsCard">
                    {final.map((i) => 
                        i.map((r) => (
                            <div className="resultsSubSection">
                                <ul>
                                    {r.word && (<p><strong>{r.word}</strong>{` - ${r.phonetic}`}</p>)}
                                    {r.origin && (<p>{r.origin}</p>)}
                                    {r.meanings && (<div>{r.meanings.map((c) => 
                                            <div className="individualDefinition">
                                                <li style ={{listStyle:'none'}}>{c.partOfSpeech}</li>
                                                <li style ={{listStyle:'none'}}>{c.definitions.map((f) => (f.definition))}</li>
                                            </div>
                                            )}</div>)}
                                </ul>
                            </div>
                        )
                        )
                    )}
                </div>
                }
            </div>
        </div>
    )
}

export default Input
