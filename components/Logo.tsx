import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <div className='backdrop:blur-3xl p-4'>
            <div className='rounded-full bg-blend-color'>
                <div className='rounded-full'>
                    <Image src='/logo.png' alt='logo' width={250} height={250} className='w-[200px] sm:w-[150px] md:w-[250px] lg:w-[300px] hover:scale-110 transition-transform cursor-pointer' />
                </div>
            </div>
        </div>
    );
}

export default Logo;