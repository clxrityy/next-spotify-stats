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

            <div className='flex flex-row space-x-6 justify-normal md:justify-evenly lg:justify-normal'>
                <div className='flex flex-col justify-center items-center space-y-3'>
                    {/* IMAGE */}
                    <Link href={result.external_urls.spotify}>
                        <Image src={`${result.images[0].url}`} className='rounded-lg image' width={125} height={150} alt={result.name} />
                    </Link>
                    {/* GENRES */}
                    <p className='text-blue-300 text-center'>
                        <ul className='grid grid-cols-1 gap-x-4'>

                            {
                                result.genres.map((genre: string) => (
                                    <li className='text-xs tracking-wide font-sub uppercase'>
                                        {genre}
                                    </li>
                                ))
                            }
                        </ul>
                    </p>
                </div>
                {/* INFO */}
                <div className='flex flex-col items-start justify-evenly space-y-2'>
                    {/* TITLE */}
                    <Link href={result.external_urls.spotify} className='link'>
                        <h1 className=''>
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
                        <span className='font-semibold opacity-90'>
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