import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";

export default function UserDetails() {
    const [userdata, setUserData] = useState([]);
    const [loading, setLoading] =  useState(true);

    const email_param = useParams();
    
    function fetchUserAlbums () {
        axios.get('/api/albums/?user__username='.concat(encodeURI(email_param.email))).then(
            res => {
                console.log(res.data);
                setUserData(res.data);
            }
        );
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
                          <li key={result.id}> {result.album_title} </li>
                        </ul>
                      </div>
                  )
              }
            </div>
          }
        </div>
    );    
}
