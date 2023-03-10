import {useState} from 'react';
import axios from 'axios';
import { tokenSet } from './setToken';
import {useDispatch, useSelector} from 'react-redux';
import { login,logusername,logemail } from './redux/logged';
import { useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router-dom';

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const logged = useSelector((state) => state.isLogged);

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function SubmitLogin (e) {
        e.preventDefault();

        if (logged) {
            NotificationManager.warning('An account is already logged in.','You are logged in',2000);
            return;
        }

        else {
            setSubmitted(true);
            setLoading(true);
            axios.post('/api/accounts/login/',
                       {
                           email,
                           password
                       }
                      ).then(
                          response => {
                              const token = response.data["token"];
                              tokenSet(token);
                              axios.get('/api/accounts/profile').then(
                                  response => {
                                      dispatch(login());
                                      dispatch(logusername(response.data['username']));
                                      dispatch(logemail(response.data['email']));
                                      setSubmitted(false);
                                      NotificationManager.success('Successful login','Login success',2000);
                                      setLoading(false);
                                      if (window.location.href.includes('next')) {
                                          const curr_url = new URL(window.location.href);
                                          const next_url = curr_url.searchParams.get('next');
                                          navigate(next_url);
                                      }
                                      else {
                                          navigate('/home');
                                      }
                                  }
                              );
                          }
                      ).catch(
                          error => {
                              if (error['message'] === 'Network Error') {
                                  NotificationManager.error('Internal System Error','Server Error', 2000);
                                  setLoading(false);
                                  setSubmitted(false);
                              };
                              
                              if (error['response']['data']['detail'] === 'Unable to login with provided credentials.') {
                                  NotificationManager.error('Incorrect details','Incorrect',2000);
                                  setLoading(false);
                                  setSubmitted(false);
                              }                              
                          }
                      );
        }
    }
    
    return (
        <div>
          {
              loading ?
                  <div className='grid h-screen place-items-center'>
                    <BounceLoader color="#36d7b7" />
                  </div>
                  :
                  <div>
                    <p className="text-2xl text-bold text-center mt-5"> Login </p>
                    <div className="mt-12">
                      <form className="flex flex-col justify-center items-center" onSubmit={SubmitLogin}>
                        <div className="mb-6">
                          <input
                            type="email" id="email"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Email address" onChange={(e) => setEmail(e.target.value)} required
                          />
                        </div>
                        
                        <div className="mb-6">
                          <input
                            type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Password" onChange={(e) => setPassword(e.target.value)} required
                          />
                        </div>
                        
                        <div className="flex justify-between items-center mb-6">
                          <Link to="/signup"> <p className='text-blue-400 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out'> I have no account </p> </Link>
                        </div>
                        {
                            submitted ? 
                                <button
                                  type="submit"
                            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-52"
                                  data-mdb-ripple="true"
                                  data-mdb-ripple-color="light" disabled
                                >
                                  Sign in
                                </button>
                            :
                            <button
                              type="submit"
                            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-52"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                            >
                              Sign in
                            </button>                            
                        }
                      </form>
                    </div>
                  </div>
          }
        </div>
    );
}
