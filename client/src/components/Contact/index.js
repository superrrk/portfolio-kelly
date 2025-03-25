import './index.scss'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const form = useRef()
    const [sending, setSending] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                return setLetterClass('text-animate-hover')
            }, 3000)
        }, [])

    const sendEmail = (e) => {
        e.preventDefault()
        if (sending) return;

        setSending(true);
        emailjs.sendForm(
            'service_4ett30f',
            'template_840pcyv',
            form.current,
            'J3gvU42uIYaCZmTu_' 
        )
        .then(() => {
            alert('message successfully sent!');
            setSending(false);
            window.location.reload(false);
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            alert('failed to send message, please try again.');
            setSending(false);
        });
    }

    return ( 
    <>
        <div className='container contact-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters 
                    letterClass={letterClass}
                    strArray={['c','o','n','t','a','c','t',' ','m','e']}
                    idx={15}
                     />
                </h1>
                <p>
                    BOOM EMAIL
                </p>
                <div className='contact-form'>
                    <form ref={form} onSubmit={sendEmail}>
                        <ul>
                            <li className='half'>
                                <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                required />
                            </li>
                            <li className='half'>
                                <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required />
                            </li>
                            <li>
                                <input
                                placeholder="Subject"
                                type="text"
                                name="subject"
                                required />
                            </li>
                            <li>
                                <textarea
                                    placeholder="Message"
                                    name="message"
                                    required
                                ></textarea>
                            </li>
                            <li>
                                <input type="submit"
                                className="flat-button"
                                value="SEND" />
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
        <Loader type="pacman" />
    </>)
}


export default Contact