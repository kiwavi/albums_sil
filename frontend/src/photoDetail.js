import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";


export default function PhotoDetail() {
    const [photo_title, setPhotoTitle] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [album, setAlbum] = useState('');
    const [loading, setLoading] = useState(true);
    
    const [new_photo_title, setNewPhotoTitle] = useState('');
    
    const param = useParams();

    function fetchPhoto() {
        axios.get('/api/photos/'.concat(param.id)).then(
            res => {
                console.log(res.data);
                setPhotoTitle(res.data['photo_title']);
                setImageUrl(res.data['image']);
                setAlbum(res.data['album']);
            }
        );
    }

    function editPhotoTitle(e) {
        e.preventDefault();
        let url = '/api/photos/';
        
        axios.patch(url.concat(param.id,'/'),{
            photo_title: new_photo_title
        }).then(
            res => {
                setPhotoTitle(res.data['photo_title']);
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
            <p> {photo_title} </p>
            <img src={image_url} alt={photo_title} class="object-scale-down h-48 w-96"/>
            <form onSubmit={editPhotoTitle}>
              <div class="mb-6 w-96">
		<label for="name" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300"> Edit title </label>
	        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="required" onChange={(e) => setNewPhotoTitle(e.target.value)} required/>
	      </div>
          
              <input type="submit" value="Submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>             
            </form>
          </div>
        }
        </div>
    );    
}
