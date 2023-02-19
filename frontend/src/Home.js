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
    
    const [loading, setLoading] = useState(false);
            
    function fetchUsers () {
        // fetch the usernames and the number of albums they have
        setLoading(true);
        axios.get('api/users').then(
            res => {
                const user_album_numbers = [];
                const usernames = [];
                let promises = [];
                for (let i = 0; i < res.data.length; i++){
                    promises.push(
                        axios.get('/api/albums/?user__username='.concat(encodeURI(res.data[i]['username']))).then(response => {
                            user_album_numbers.push(response.data.length);
                            usernames.push(res.data[i]['username']);
                        }).catch(error => {
                            if (error['message'] === 'Network Error') {
                                NotificationManager.error('Internal System Error','Server Error', 2000);
                                setLoading(false);
                            };
                            
                            if (error['message'] === 'Request failed with status code 401') {
                                setLoading(false);
                                tokenDel();
                                dispatch(logoutemail());
                                dispatch(logoutusername());
                                dispatch(logout());
                            };            
                        }),
                    );
                }
                
                Promise.all(promises).then(() => {
                                                  setUsers(usernames);
                                                  setUserAlbums(user_album_numbers);
                });
                setLoading(false);
            }
        ).catch(error => {
            setLoading(false);
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
        document.title = "Home";
        fetchUsers();
    },[]);
    
    return (
        <div>
        { loading  ?
          <div className='grid h-screen place-items-center'>
            <BounceLoader color="#36d7b7" />
          </div>
          :
          users.length ? 
          <div>
            <p className='text-2xl lg:text-3xl text-center text-bold mt-4'> Users and their albums  </p>
            {/* <div className='hidden lg:visible flex justify-center lg:justify-around mb-4 mt-4'> */}
            {/*   <p className='w-24 lg:text-center text-xl mr-3 lg:ml-48'> Username  </p> */}
            {/*   <p className='w-24 lg:text-center text-xl ml-3 lg:mr-48'> Albums </p> */}
            {/* </div> */}
            
            <div className='flex justify-center lg:justify-around mt-12'>
              <div>
                {
                    users.map(result =>
                        <div>
                          <ul className='mb-6 lg:ml-48'>
                            <li key={result.id}> <Link to={"/users/".concat(result)} className="w-36"> <p className='text-start text-lg text-green-700 hover:text-sky-400'> {result} </p> </Link> </li>
                          </ul>
                        </div>                    
                    )
                }
              </div>

              <div>
                {
                    users_albums.map(result =>
                        <div>
                          <ul className='w-24 text-center mb-6 lg:mr-48'>
                            <li key={result}> <p className='text-lg'> {result} </p> </li>
                          </ul>
                        </div>                    
                    )
                }
              </div>              
              
            </div>
            
          </div>
          :          
          <p className='flex justify-center text-2xl lg:text-3xl text-center text-bold mt-4'>  </p>
          }
        </div>
    );
}

