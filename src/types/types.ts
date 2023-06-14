export interface Comic {
    id: number,
    title: string,
    description: string | null,
    thumbnail: {
        path: string,
        extension: string
    }
    creators: Array<{
        name: string,
        role: string
    }>
}