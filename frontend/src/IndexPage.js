import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import AlbumPhoto from './image/albums.webp';
import {useEffect} from 'react';

export default function IndexPage () {
    const logged = useSelector((state) => state.isLogged);

    useEffect(() => {
    	document.title = "Albums";
    });
    
    return (
        <div>
          <p className="mt-6 text-center text-bold text-2xl lg:text-3xl"> All about photos </p>
          <p className="mt-4 mx-4 mb-6 lg:flex lg:justify-center lg:text-lg"> "Each photo is a chapter that tells a story, and each album is a book." </p>          
          <p className="mx-4 mb-6 lg:flex lg:justify-center lg:text-lg"> We have a collection of albums with beautiful photos that have been uploaded by various users. </p>
          { logged ?
            <p className="mx-4 mb-6 lg:flex lg:justify-center lg:text-lg"> <Link to="/home">  <p className='inline text-green-700 hover:text-sky-400'> View </p> </Link>&nbsp;the diversity of albums and pictures </p>
            :
            <p className="mx-4 mb-6 lg:flex lg:justify-center lg:text-lg"> <Link to="/login">  <p className='inline text-green-700 hover:text-sky-400'> Login </p> </Link> &nbsp;now to view the diversity of albums and pictures </p>
          }
          {/* <div className="w-full"> */}
          {/*   <img src={AlbumPhoto} className="max-w-full lg:w-full h-auto lg:h-1/2" alt="..."/> */}
          {/* </div> */}

          <div className="max-w-full">
            <img src={AlbumPhoto} className="object-scale-down w-full h-auto" alt="..."/>
          </div>
          
        </div>
    );
}
