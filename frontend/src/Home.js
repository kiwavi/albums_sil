import {useState, useEffect} from 'react';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import {logout,logoutemail, logoutusername} from './redux/logged';
import {useDispatch} from 'react-redux';
import {tokenDel} from './setToken';

export default function Home () {
    const [users, setUsers] = useState([]);
    const [users_albums, setUserAlbums] = useState([]);

    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(true);
            
    function fetchUsers () {        
        axios.get('api/users').then(
            res => {
                const users = [];
                const emails = [];
                let promises = [];
                for (let i = 0; i < res.data.length; i++){
                    promises.push(
                        axios.get('/api/albums/?user__username='.concat(encodeURI(res.data[i]['username']))).then(response => {
                            users.push(response.data.length);
                            emails.push(res.data[i]['username']);
                        }),
                    );
                }
                
                Promise.all(promises).then(() => {
                                                  setUsers(emails);
                                                  setUserAlbums(users);
                                                 });                
            }
        ).catch(error => {
            console.log(error);
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
        fetchUsers();
        setLoading(false);
    },[]);
    
    return (
        <div>
        { loading  ?
          <div className='grid h-screen place-items-center'>
            <BounceLoader color="#36d7b7" />
          </div>
          :
          <div className=''>
            <div className='flex'>
              <div>
                {
                    users.map(result =>
                        <div>
                          <ul>
                            <li key={result.id}> <Link to={"/users/".concat(result)}> {result} </Link> </li>
                          </ul>
                        </div>                    
                    )
                }
              </div>

              <div>
                {
                    users_albums.map(result =>
                        <div>
                          <ul>
                            <li key={result}> {result}  </li>
                          </ul>
                        </div>                    
                    )
                }
              </div>              
              
            </div>
            
          </div>
          }
        </div>
    );
}

