import React, { useCallback, useEffect, useState } from 'react'

const Google = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState()
    const [query, setQuery] = useState("")
    const [searchItem, setSearchItem] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const options = {
        method: 'GET',
        headers: {
            'X-User-Agent': 'desktop',
            'X-Proxy-Location': 'EU',
            'X-RapidAPI-Key': 'e9a048529amsh7b42a9c837cf0bcp13231djsn17b6f6a60dce',
            'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
        }
    };

    const handleFetch = useCallback(async () => {
        setLoading(true)
        setError(false)

        try {
          const response = await fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${search}`, options)
          const jsonResponse = await response.json()
          setData(jsonResponse.results)
          console.log(jsonResponse.results);  
        } catch (err) {
            console.log(err);
            setError(true)
        }
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    useEffect(() => {
        handleFetch()
    }, [handleFetch])
    

    const handleChange = (e) => {
        setQuery(e.target.value);
    };    
        
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(query);
        setSearchItem(false)
    };

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>An error occured! Try again...</h1>

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="search" onChange={handleChange} value={query} />
        </form>

        {searchItem ? <h1>No searched items</h1> : 

            data && data.map((item, index) => (
                <div key={index}>
                    <h3> {item.title} </h3>
                    <p> {item.description} </p>
                    <p><a href='/'>{item.link}</a>  </p>
                </div>
            ))
        }
    </div>
  )
}

export default Google