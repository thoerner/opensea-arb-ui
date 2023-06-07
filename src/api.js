import axios from 'axios'

export const apiUrl = import.meta.env.VITE_API_URL

export const getRequest = async (url, retryCount = 0) => {
    const options = {
        method: 'GET',
        url,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    try {
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        if (retryCount > 3) {
            throw new Error(error)
        } else {
            await new Promise(r => setTimeout(r, 2000))
            return getRequest(url, retryCount + 1)
        }
    }
}
