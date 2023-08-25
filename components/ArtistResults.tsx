'use client';
import { Result } from '@/util/types';
import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArtistResultsProps {
    result: Result;
}

const ArtistResults: FC<ArtistResultsProps> = ({ result }) => {

    return (
        <div className='artist-box container'>

            <div className='flex flex-row space-x-6 justify-normal md:justify-center lg:justify-normal'>

                {/* IMAGE */}
                <Link href={result.external_urls.spotify}>
                    <Image src={`${result.images[0].url}`} className='rounded-lg' width={150} height={150} alt={result.name} />
                </Link>
                {/* INFO */}
                <div className='flex flex-col items-start justify-evenly'>
                    {/* TITLE */}
                    <Link href={result.external_urls.spotify} className='link'>
                        <h1 className='font-semibold text-3xl md:text-4xl text-white/95 tracking-wide'>
                            {result.name}
                        </h1>
                    </Link>
                    {/* FOLLOWERS */}
                    <p className='text-sm space-x-1'>
                        <span className='tracking-tightest text-xs font-semibold text-blue-400'>
                            {result.followers.total}
                        </span>
                        <span>
                            followers
                        </span>
                    </p>
                    {/* POPULARITY */}
                    <p className='text-4xl lg:text-5xl space-x-2'>
                        <span className='font-bold text-blue-400'>
                            {result.popularity}
                        </span>
                        <span className='font-bold'>
                            /
                        </span>
                        <span>
                            100
                        </span>
                    </p>
                </div>

            </div>

        </div>
    );
}

export default ArtistResults;