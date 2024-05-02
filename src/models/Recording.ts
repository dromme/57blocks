interface Artist {
    id: string
    name: string
}

interface Recording {
    id: string
    title: string
    artists: Artist[]
    isFavorite?: boolean;
}