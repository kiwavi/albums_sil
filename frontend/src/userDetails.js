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
    const [loading, setLoading] =  useState(true);
    
    const dispatch = useDispatch();
    
    const email_param = useParams();
    
    function fetchUserAlbums () {
        axios.get('/api/albums/?user__username='.concat(encodeURI(email_param.username))).then(
            res => {
                console.log(res.data);
                setUserData(res.data);
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
        fetchUserAlbums();
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
              <p> {email_param.email} albums </p>
              {
                  userdata.map(result =>
                      <div>
                        <ul>
                          <li key={result.id}> <Link to={window.location.pathname.concat('/',result.album_title)}> {result.album_title} </Link> </li>
                        </ul>
                      </div>
                  )
              }
            </div>
          }
        </div>
    );    
}
