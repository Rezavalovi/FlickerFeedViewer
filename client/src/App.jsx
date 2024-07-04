import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 

function App() {
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async (tags = '') => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/photos', {
                params: { tags }
            });
            setPhotos(data.items);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPhotos(search);
    };

    return (
        <div className="App bg-marble-texture bg-cover bg-no-repeat bg-fixed min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Flickr Feed Viewer</h1>
            <form onSubmit={handleSearch} className="flex justify-center mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by tag"
                    className="p-2 border border-gray-300 rounded-l-md w-64"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700">
                    Search
                </button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <div key={photo.link} className="photo-item border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                        <img src={photo.media.m} alt={photo.title} className="w-full h-auto" />
                        <p className="p-2 text-sm text-center text-gray-800">{photo.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

