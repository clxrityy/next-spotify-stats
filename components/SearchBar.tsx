'use client';
import { Result } from '@/util/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import{ popularity } from '@/util/popularity';

const SearchBar = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [result, setResult] = useState<Result>();
    const [scale, setScale] = useState<number>();

    const searchEndpoint = (query: string) => process.env.NODE_ENV === 'development' ? `http://127.0.0.1:5328/api/search/${query}` : `https://next-spotify-stats.vercel.app/api/search/${query}`;

    async function getData(query: string) {
        const res = await fetch(searchEndpoint(query));

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    }

    const onChange = useCallback(async (event: any) => {
        const query = event.target.value;

        setQuery(query);
        if (query.length) {
            try {
                await getData(query)
                    .then(res => {
                        setResult({
                            id: res.id,
                            name: res.name,
                            images: res.images,
                            popularity: res.popularity,
                            followers: res.followers,
                            genres: res.genres,
                            external_urls: res.external_urls,
                        });
                        setScale(res.popularity);
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log(result)
            setResult(result);
        }

    }, []);

    const onFocus = useCallback(() => {
        setActive(true);
        window.addEventListener('click', onClick);
    }, []);

    const onClick = useCallback((event: any) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false);
            window.removeEventListener('click', onClick);
        }
    }, []);


    const color = popularity(scale!);
    console.log(color!);

    return (
        <div className='flex items-center justify-center'>
            <div className='container'>
                <div ref={searchRef} className='flex flex-col space-y-10 items-center justify-center'>

                    <input
                        className='input'
                        onChange={onChange}
                        onFocus={onFocus}
                        placeholder='Search artists...'
                        type='text'
                        value={query}
                        required
                    />

                    {
                        active && result?.name != null && (
                            <div className='artist-box container'>

                                <div className='flex flex-row space-x-6'>

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
                                        <p className='text-xl space-x-2'>
                                            <span className={`font-semibold text-[${color}]`}>
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
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default SearchBar;