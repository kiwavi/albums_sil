import {useState} from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import { NotificationManager } from 'react-notifications';

export default function Signup () {
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const logged = useSelector((state) => state.isLogged);
    const navigate = useNavigate();
    
    function SubmitSignup (e) {
        e.preventDefault();

        if (logged) {
            alert('You are logged in already');
            return;
        }
        
        if (password.length < 8) {
            alert('Please enter a password with more than 8 characters');
            return;
        }
        
        if (password !== password2) {
            alert('Passwords do not match.');
            return;
        }                

        else {
            setSubmitted(true);
            setLoading(true);
            axios.post('/api/accounts/register/',{
                email,
                password,
                first_name: firstname,
                username,
            }).then(
                response => {
                    console.log(response.data);
                    setSubmitted(false);
                    setLoading(false);
                    NotificationManager.success('Username created successfully','Signup success',2000);
                    navigate('/login');
                }
            ).catch(
                error => {
                    console.log(error['response']);
                    if (error['response']['data']['detail'] === 'Email address already taken.') {
                        NotificationManager.error('Email address exists','Email exists',2000);
                    }
                    if (error['response']['data']['detail'] === 'Username already taken.') {
                        NotificationManager.error('Username already exists','Username unavailable',2000);
                    }
                    setSubmitted(false);
                    setLoading(false);
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
                <p className='text-2xl text-center mt-6'> Signup </p>
                <div class="mt-12">
                  <form className="flex flex-col justify-center items-center" onSubmit={SubmitSignup}>
                    <div class="mb-6">
                      <input
                        type="email" id="email"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Email address" onChange={(e) => setEmail(e.target.value)} required
                      />
                    </div>
                    
                    <div class="mb-6">
                      <input
                        type="text" id="firstname"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required
                      />
                    </div>
                    
                    <div class="mb-6">
                      <input
                        type="text" id="username"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Username" onChange={(e) => setUserName(e.target.value)} required
                      />
                    </div>
                    
                    <div class="mb-6">
                      <input
                        type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Password" onChange={(e) => setPassword(e.target.value)} required
                      />
                    </div>
                    
                    <div class="mb-6">
                      <input
                        type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Password" onChange={(e) => setPassword2(e.target.value)} required
                      />
                    </div>              
                    
                    {
                        submitted ? 
                            <button
                              type="submit"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-52"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light" disabled
                            >
                              Sign Up
                            </button>
                        :
                        <button
                          type="submit"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-52"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          Sign Up
                        </button>
                    }
                  </form>
                </div>
              </div>
          }
        </div>
    );
    
}
