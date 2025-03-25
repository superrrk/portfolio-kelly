import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import LogoK from '../../assets/images/logo-k.png'
import Logo from './Logo'
import './index.scss';
import Loader from 'react-loaders'

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['e', 'l', 'l', 'y']
    const jobArray = ['a',' ','s','t','u','d','e','n','t',' ','d','e','v','e','l','o','p','e','r','.']

    useEffect(() => {
        setTimeout(() => {
          return setLetterClass('text-animate-hover')
        }, 4000)
      }, [])
      

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                    <span className={letterClass}>h</span>
                    <span className={`${letterClass} _12`}>i,</span>
                    <br />
                    <span className={`${letterClass} _13`}>i</span>
                    <span className={`${letterClass} _14`}>'m</span>
                    <img src={LogoK} alt="K" />
                    <AnimatedLetters letterClass={letterClass}
                    strArray={nameArray}
                    idx={15}/>
                    <br />
                    <AnimatedLetters letterClass={letterClass}
                    strArray={jobArray}
                    idx={22}/>
                    </h1>
                    <h2> Student / Developer </h2>
                    <Link to="/contact" className='flat-button'>
                        CONTACT ME
                    </Link>
                </div>
                <Logo />
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Home