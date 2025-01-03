import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([])

    const urlBase = 'https://api.themoviedb.org/3/search/movie?'
    const API_KEY = 'YOUR_API_KEY'

    const handleInputChange = ({ target }) => {
        setSearch(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            console.log('Buscando películas para:', search);
            const response = await fetch(`${urlBase}query=${search}&api_key=${API_KEY}&language=es-ES`);
            console.log('Estado de la respuesta:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Datos recibidos de la API:', data);

            if (data.results) {
                setMovieList(data.results);
                console.log('Películas encontradas:', data.results);
            } else {
                console.log('No se encontraron películas.');
            }
        } catch (error) {
            console.error('Error al buscar películas:', error);
        }
    };



    return (
        <div className='container'>
            <h1>Buscador de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder='Escribí una película'
                    value={search}
                    onChange={handleInputChange}
                />

                <button>Buscar</button>
            </form>

            {movieList &&
                <div className='movie-list'>
                    {movieList.map(movie => (
                        <div key={movie.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
