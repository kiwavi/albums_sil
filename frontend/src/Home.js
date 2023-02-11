import {useState, useEffect} from 'react';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";

export default function Home () {
    const [users, setUsers] = useState([]);
    const [users_albums, setUserAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
            
    function fetchUsers () {        
        axios.get('api/users').then(
            res => {                   
                const users = [];
                const emails = [];
                let promises = [];
                for (let i = 0; i < res.data.length; i++){
                    promises.push(
                        axios.get('/api/albums/?user__email='.concat(encodeURI(res.data[i]['email']))).then(response => {
                            users.push(response.data.length);
                            emails.push(res.data[i]['email']);
                        }),
                    );
                }
                
                Promise.all(promises).then(() => {
                                                  setUsers(emails);
                                                  setUserAlbums(users);
                                                 });                
            }
        );
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
                            <li key={result.id}> {result}  </li>
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
                            <li key={result.id}> {result}  </li>
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

