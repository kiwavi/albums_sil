import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import {tokenDel} from './setToken';
import {NotificationManager} from 'react-notifications';

export default function AlbumDetails () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 

    const dispatch = useDispatch();
    
    const album = useParams();
        
    function fetchAlbumPhotos () {
        axios.get('/api/photos/?album__album_title='.concat(album.album)).then(
            res => {
                console.log(res.data);
                setData(res.data);
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
        });
    }

    
    useEffect(() => {
        fetchAlbumPhotos();
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
              <p className='flex justify-center text-2xl text-bold mt-4'> Photos in {album.album} </p>
              {
                  data.map(result =>
                      <div>
                        <ul className="list-none flex justify-center">
                          <li key={result.id} className="flex flex-col mt-5">

                            {/* <Link className='mb-3'  to={window.location.pathname.concat('/',result.id)}> <p className='flex justify-center text-green-700 hover:text-sky-400 lg:w-52 text-lg lg:text-xl'> {result.photo_title} </p> </Link> */}

                            <Link className='mb-3'  to={window.location.pathname.concat('/',result.id)}> <p className='inline flex justify-center text-green-700 hover:text-sky-400 text-lg text-lg lg:text-xl'> {result.photo_title} </p> </Link>
                            
                            <img src={result.image} alt={result.photo_title} className="inline flex justify-center object-scale-down h-96 w-80 lg:w-80 lg:h-96"/>                            
                          </li>
                        </ul>
                      </div>
                  )
              }
            </div>
          }
        </div>
    );    
}
