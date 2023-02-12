import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";

export default function PhotoDetail() {
    const [photo_title, setPhotoTitle] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    
    const param = useParams();

    function fetchPhoto() {
        axios.get('/api/photos/'.concat(param.id)).then(
            res => {
                console.log(res.data);
                setPhotoTitle(res.data['photo_title']);
                setImageUrl(res.data['image']);
            }
        );
    }

    useEffect(() => {
        fetchPhoto();
        setLoading(false);
    },[]);
    
    
    return (
        <div>
        { loading ?
          <div className='grid h-screen place-items-center'>
            <BounceLoader color="#36d7b7" />
          </div>
          :
          <div>
            <p>
              Hi guys welcome to my YouTube channel
              <p> {photo_title} </p>
              <img src={image_url} alt="BigCo Inc. logo" class="object-scale-down h-48 w-96"/>
            </p>
          </div>
        }
        </div>
    );
    
}
