import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <div className='backdrop:blur-3xl bg-gradient-to-b from-blue-300/50 bg-blend-screen rounded-3xl shadow-blue-300/50 shadow-md lg:shadow-xl p-4'>
            <div className='rounded-full bg-blend-color'>
                <div className='rounded-full'>
                    <Image src='/logo.png' alt='logo' width={250} height={250} className='w-[100px] sm:w-[150px] md:w-[250px] lg:w-[300px] xl:w-[375px]' />
                </div>
            </div>
        </div>
    );
}

export default Logo;