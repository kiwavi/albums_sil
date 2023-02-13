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
              <p> Albums and its photos </p>
              {
                  data.map(result =>
                      <div>
                        <ul>
                          <li key={result.id}>
                            <Link to={window.location.pathname.concat('/',result.id)}> {result.photo_title}  </Link>
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
