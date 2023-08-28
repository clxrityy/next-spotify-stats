'use client';
import { Result } from '@/util/types';
import React, { useCallback, useRef, useState } from 'react';
import ArtistResults from './ArtistResults';
import { searchArtistEndpoint } from '@/util/search';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const SearchArtist = () => {

    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [result, setResult] = useState<Result>();
    const [popLevel, setPopLevel] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    async function getData(query: string) {
        const res = await fetch(searchArtistEndpoint(query));

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
                setLoading(true);
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
                        setPopLevel(res.popularity);
                    }).finally(() => {
                        if (popLevel != result!.popularity) {
                            setPopLevel(result!.popularity);
                            setLoading(false);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            // console.log(result)
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

                    {/* {
                        active && result?.name != null && (
                            <ArtistResults result={result} />
                        ) 
                    } */}
                    {
                        active && result?.name.length != null ? (
                            <ArtistResults result={result} />
                        ) : loading && query.length > 0 && <AiOutlineLoading3Quarters className='text-6xl animate-spin text-blue-400 font-semibold' />
                    }

                </div>
            </div>
        </div>
    );
}

export default SearchArtist;