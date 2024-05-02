import axios from "axios"

const MUSIC_BRAINZ_URL = 'https://musicbrainz.org/ws/2/'
const HEADERS = { Accept: 'application/json' }
const OPTIONS = { headers: HEADERS }

const simplifyArtists = (artists: any): Artist[] => {
    return (artists || []).map((artist: any) => ({
        id: artist.artist.id,
        name: artist.name,
    }))
}

const simplifyRecordingDetail = (recording: any): Recording => ({
    id: recording.id,
    title: recording.title,
    artists: simplifyArtists(recording['artist-credit'])
})

export const getRecordings = async ({ query, limit, offset }: any): Promise<{ recordings: Recording[], count: number }> => {
    const url = `${MUSIC_BRAINZ_URL}recording?query=${query}&limit=${limit}&offset=${offset}`
    const response: any = await axios(url, OPTIONS);
    return {
        recordings: response.data.recordings.map((recording: any) => simplifyRecordingDetail(recording)),
        count: response.data.count
    };
}

export const getRecordingDetail = async (id: string): Promise<Recording> => {
    const url = `${MUSIC_BRAINZ_URL}recording/${id}?inc=artists+tags`
    const response: any = await axios(url, OPTIONS);
    return simplifyRecordingDetail(response.data);
}