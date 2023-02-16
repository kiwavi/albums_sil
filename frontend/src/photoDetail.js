import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import {tokenDel} from './setToken';
import {NotificationManager} from 'react-notifications';

export default function PhotoDetail() {
    const [photo_title, setPhotoTitle] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [new_photo_title, setNewPhotoTitle] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    const dispatch = useDispatch();
    
    const param = useParams();
    
    function fetchPhoto() {
        axios.get('/api/photos/'.concat(param.id)).then(
            res => {
                setPhotoTitle(res.data['photo_title']);
                setImageUrl(res.data['image']);
                setSubmitted(false);
            }
        ).catch(error => {
            if (error['message'] === 'Network Error') {
                NotificationManager.error('Internal System Error','Server Error', 2000);
            };

            if (error['message'] === 'Request failed with status code 401') {
                tokenDel();
                dispatch(logoutemail());
                dispatch(logoutusername());
                dispatch(logout());
            };
            setSubmitted(false);
        });
    }

    function editPhotoTitle(e) {
        e.preventDefault();
        let url = '/api/photos/';
        
        axios.patch(url.concat(param.id,'/'),{
            photo_title: new_photo_title
        }).then(
            res => {
                setPhotoTitle(res.data['photo_title']);
                NotificationManager.success('Updated Successfully','Update success', 2000);
            }
        ).catch(error => {
            if (error['message'] === 'Request failed with status code 401') {
                tokenDel();
                dispatch(logoutemail());
                dispatch(logoutusername());
                dispatch(logout());
            };            
        });       
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
          <div className='mb-12'>
            <p className="flex justify-center text-center text-bold text-2xl mx-8 mt-6"> {photo_title} </p>
            <div className='flex flex-col items-center justify-center'>
              <img src={image_url} alt={photo_title} className="flex justify-center object-scale-down h-96 w-80 lg:w-1/4 lg:h-1/4 mt-5"/>
              
              <form class="flex flex-col items-center justify-center mt-6" onSubmit={editPhotoTitle}>
                <div class="mb-6">
                  <input className='w-52 lg:w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" name="title" placeholder='Edit title'  onChange={(e) => setNewPhotoTitle(e.target.value)} required/>
                </div>
                { submitted ?
                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-24" disabled> Edit </button>
                  :
                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-24 lg:w-44"> Edit </button>
                }
              </form>
              
            </div>

          </div>
        }
        </div>
    );    
}
