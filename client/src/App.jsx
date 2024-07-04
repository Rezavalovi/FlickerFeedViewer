import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 

function App() {
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

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

    const openModal = (photo) => {
        setSelectedPhoto(photo);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedPhoto(null);
    };

    return (
        <div className="App p-4">
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
                    <div
                        key={photo.link}
                        className="photo-item border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                        onClick={() => openModal(photo)}
                    >
                        <img src={photo.media.m} alt={photo.title} className="w-full h-48 object-cover" />
                        <p className="p-2 text-sm text-center text-gray-800">{photo.title}</p>
                    </div>
                ))}
            </div>
            {selectedPhoto && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 ${modalIsOpen ? '' : 'hidden'}`}>
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="bg-white p-4 rounded-lg shadow-lg z-10 max-w-md w-full mx-2">
                        <img src={selectedPhoto.media.m} alt={selectedPhoto.title} className="w-full h-auto mb-4" />
                        <p className="text-center text-gray-800">{selectedPhoto.title}</p>
                        <button onClick={closeModal} className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
