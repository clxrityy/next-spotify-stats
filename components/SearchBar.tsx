'use client';
import { Result } from '@/util/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';

const SearchBar = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [result, setResult] = useState<Result>();

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
                        });
                        console.log(res);
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
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
                            <Link href='/'>
                                <div className='flex items-center space-x-4'>
                                    <Image src={`${result.images[0].url}`} alt={result.name} height={100} width={100} className='rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all' />
                                    <p className='text-2xl md:text-3xl lg:text-4xl font-semibold text-[#eee]/90 tracking-wider hover:underline underline-offset-4 transition-all duration-300 ease-linear hover:text-blue-400'>
                                        {result.name}
                                    </p>
                                </div>
                            </Link>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default SearchBar;