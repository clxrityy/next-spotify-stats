export type Image = {
    height: number;
    url: string;
    width: number;
}

export type Result = {
    id: string;
    name: string;
    images: Array<Image>;
}

