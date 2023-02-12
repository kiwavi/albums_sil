import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function AlbumDetails () {
    const [data, setData] = useState([]);

    const album = useParams();

    function fetchAlbumPhotos () {
        axios.get('/api/photos/?album__album_title='.concat(album.album)).then(
            res => {
                console.log(res.data);
            }
        );
    }

    useEffect(() => {
        fetchAlbumPhotos();
    },[]);
    
    return (
        <div>
          <p> Albums and its photos </p>
        </div>
    );    
}
