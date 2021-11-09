import React, { useState, useEffect } from 'react';

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
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let query = [];
            data.map((i) => {
                query.push(i);
                setFinal([query])
            })
        });
        setLoading(false);
    },[url])

    console.log(final)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" value={search} placeholder="Search" 
                onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            <div>
                {loading ? 'Loading' : 
                <div>
                    {final.map((i) => 
                        i.map((r) => (
                            <ul>
                                <li style ={{listStyle:'none'}}>{r.word}</li>
                                <li style ={{listStyle:'none'}}>{r.phonetic}</li>
                                <li style ={{listStyle:'none'}}>{r.origin}</li>
                                <div>{r.meanings.map((c) => 
                                        <div>
                                            <li style ={{listStyle:'none'}}>{c.partOfSpeech}</li>
                                            <li style ={{listStyle:'none'}}>{c.definitions.map((f) => (f.definition))}</li>
                                        </div>
                                        )}</div>
                            </ul>
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
