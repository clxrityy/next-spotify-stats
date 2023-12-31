import Link from 'next/link';
import React from 'react';
import { BiLogoGithub } from 'react-icons/bi';

const Footer = () => {
    return (
        <div className='fixed top-0 left-0 p-5'>
            <Link href='https://github.com/clxrityy/next-spotify-stats'>
                <BiLogoGithub size={30} color='#fafafa' className='transition-all hover:scale-125 duration-300' />
            </Link>
        </div>
    );
}

export default Footer;