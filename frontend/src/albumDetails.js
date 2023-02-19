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
    const [loading, setLoading] = useState(false); 

    const dispatch = useDispatch();
    
    const album = useParams();
        
    function fetchAlbumPhotos () {
        setLoading(true);
        axios.get('/api/photos/?album__album_title='.concat(album.album)).then(
            res => {
                setData(res.data);
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
        document.title = "Album Details";
        fetchAlbumPhotos();
    },[]);
    
    return (
        <div>
          { loading ?
            <div className='grid h-screen place-items-center'>
              <BounceLoader color="#36d7b7" />
            </div>
            :
            /* if there are any pictures in the album */
            data.length ? 
            <div>
              <p className='flex justify-center text-2xl text-bold mt-4'> Photos in {album.album} </p>

              <div className='lg:hidden mb-12'>
                { data.length ? <div>
                                  {
                                      data.map(result =>
                                          <div>
                                            <ul className="list-none flex justify-center">
                                              <li key={result.id} className="flex flex-col mt-5">
                                                
                                                <Link className='mb-3'  to={window.location.pathname.concat('/',result.id)}> <p className='inline flex justify-center text-green-700 hover:text-sky-400 text-lg text-lg lg:text-xl'> {result.photo_title} </p> </Link>
                                                
                                                <img src={result.image} alt={result.photo_title} className="inline flex justify-center object-scale-down h-96 w-80 lg:w-80 lg:h-96"/>                            
                                              </li>
                                            </ul>
                                          </div>
                                      )
                                  }
                                </div>
                  :
                  <p className='flex justify-center text-xl text-bold mt-4'> None </p>
                }
              </div>

              {/* visible for large screens  */}
              <div className='hidden lg:block mb-12'>
                {/* photos are 2 or a number divisible by 2 */}
                { data.length % 2 === 0 ? 
                  <div class="container grid grid-cols-2 gap-1 mx-auto">
                    {
                        data.map(result =>
                            <div>
                              <ul className="list-none flex justify-center">
                                <li key={result.id} className="flex flex-col mt-5">
                                  
                                  <Link className='mb-3'  to={window.location.pathname.concat('/',result.id)}> <p className='inline flex justify-center text-green-700 hover:text-sky-400 text-lg text-lg lg:text-xl'> {result.photo_title} </p> </Link>
                                  
                                  <img src={result.image} alt={result.photo_title} className="inline flex justify-center object-scale-down h-96 w-80 lg:w-80 lg:h-96"/>                            
                                </li>
                              </ul>
                            </div>
                        )
                    }
                  </div>
                  :
                  // photos are 3 or divisible by 3
                  data.length % 3 === 0 ? 
                  
                  <div class="container grid grid-cols-3 gap-2 mx-auto">
                    {
                        data.map(result =>
                            <div>
                              <ul className="list-none flex justify-center">
                                <li key={result.id} className="flex flex-col mt-5">
                                  
                                  <Link className='mb-3'  to={window.location.pathname.concat('/',result.id)}> <p className='inline flex justify-center text-green-700 hover:text-sky-400 text-lg text-lg lg:text-xl'> {result.photo_title} </p> </Link>
                                  
                                  <img src={result.image} alt={result.photo_title} className="inline flex justify-center object-scale-down h-96 w-80 lg:w-80 lg:h-96"/>                            
                                </li>
                              </ul>
                            </div>
                        )
                    }
                  </div>
                  
                  :

                  /* photos are an even number */
                  data.length % 2 === 1 ?
                  <div>
                    {
                        /* if it is just one photo */
                        data.length === 1 ?
                            <div>
                              <div class="container grid grid-cols-1 gap-0 mx-auto">
                                {
                                    data.map(result =>
                                        <div>
                                          <ul className="list-none flex justify-center">
                                            <li key={result.id} className="flex flex-col mt-5">
                                              
                                              <Link className='mb-3'  to={window.location.pathname.concat('/',result.id)}> <p className='inline flex justify-center text-green-700 hover:text-sky-400 text-lg text-lg lg:text-xl'> {result.photo_title} </p> </Link>
                                              
                                              <img src={result.image} alt={result.photo_title} className="inline flex justify-center object-scale-down h-96 w-80 lg:w-80 lg:h-96"/>                            
                                            </li>
                                          </ul>
                                        </div>
                                    )
                                }
                              </div>
                            </div>
                        :
                        /* if photos are not 1 and are an even number */
                        <div class="container grid grid-cols-3 gap-0 mx-auto">
                          {
                              data.map(result =>
                                  <div>
                                    <ul className="list-none flex justify-center">
                                      <li key={result.id} className="flex flex-col mt-5">
                                        
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
                  :
                  /* in case the album has no photos */
                  data.length === 0
                  ?
                  <p> This album has no pictures </p>
                  :
                  <p> None </p>              
                } 
              </div>
            </div>
            :
            <div>
              <p className='flex justify-center text-2xl text-bold mt-4'> Photos in {album.album} </p>
              <p className='flex justify-center text-xl text-bold mt-4'> None </p>
            </div>
          }
        </div>
    );    
}
