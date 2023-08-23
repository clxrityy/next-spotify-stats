export type Image = {
    height: number;
    url: string;
    width: number;
}

export type Followers = {
    href: string | null;
    total: number;
}

export type Url = {
    spotify: string;
}

export type Result = {
    id: string;
    name: string;
    images: Array<Image>;
    popularity: number;
    followers: Followers;
    genres: Array<string>;
    external_urls: Url;
}

