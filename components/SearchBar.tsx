'use client';
import { Result } from '@/util/types';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';

const SearchBar = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [result, setResult] = useState<Result>();

    const searchEndpoint = (query: string) => `http://127.0.0.1:5328/api/search/${query}`;

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
                            name: res.name
                        });
                        console.log(res.name);
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
                <div ref={searchRef}>

                    <input
                        className='w-full'
                        onChange={onChange}
                        onFocus={onFocus}
                        placeholder='Search artists...'
                        type='text'
                        value={query}
                    />

                    {
                        active && result?.name != null && (
                            <ul className=''>
                                <li>
                                    {result.name}
                                </li>
                            </ul>
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default SearchBar;