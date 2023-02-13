import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";

export default function UserDetails() {
    const [userdata, setUserData] = useState([]);
    const [loading, setLoading] =  useState(true);

    const email_param = useParams();
    
    function fetchUserAlbums () {
        axios.get('/api/albums/?user__username='.concat(encodeURI(email_param.username))).then(
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
