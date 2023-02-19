import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams, Link, useNavigate} from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import {tokenDel} from './setToken';
import {NotificationManager} from 'react-notifications';


export default function UserDetails() {
    const [userdata, setUserData] = useState([]);
    const [loading, setLoading] =  useState(false);
    
    const dispatch = useDispatch();
    
    const email_param = useParams();
    
    function fetchUserAlbums () {
        setLoading(true);
        // fetches the albums associated with a certain user
        axios.get('/api/albums/?user__username='.concat(encodeURI(email_param.username))).then(
            res => {
                setUserData(res.data);
                setLoading(false);
            }
        ).catch(error => {
            setLoading(false);
            if (error['message'] === 'Network Error') {
                NotificationManager.error('Internal System Error','Server Error', 2000);
            };

            if (error['message'] === 'Request failed with status code 401') {
                setLoading(false);
                tokenDel();
                dispatch(logoutemail());
                dispatch(logoutusername());
                dispatch(logout());
            };            
        });
    }

    useEffect(() => {
        fetchUserAlbums();
        document.title = "User Albums";
    },[]);
    
    return (        
        <div>
          { loading ?
            <div className='grid h-screen place-items-center'>
              <BounceLoader color="#36d7b7" />
            </div>
            :
            userdata.length ? 
            <div>                            
              <p className="flex justify-center text-center text-bold text-2xl mx-8 mt-6"> Albums by {email_param.username} </p>
              {
                  userdata.map(result =>
                      <div className="mt-8">
                        <ul className="list-disc flex justify-center">
                          <li key={result.id} className='w-40 lg:w-52'> <Link to={window.location.pathname.concat('/',result.album_title)}> <p className='inline mt-4 mb-4 text-green-700 hover:text-sky-400 text-lg lg:text-xl'> {result.album_title} </p> </Link> </li>
                        </ul>
                      </div>
                  )
              }
            </div>
            :
            <p className='flex justify-center text-2xl text-bold mt-4'> No albums </p>
          }
        </div>
    );    
}
