import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export const getRequest = async (endPoint, retryCount = 0) => {
    console.log('getRequest', endPoint)
    const options = {
        method: 'GET',
        url: apiUrl + endPoint,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    try {
        console.log(`Making request to ${apiUrl + endPoint}`)
        const { data } = await axios.request(options)
        console.log('data', data)
        return data
    } catch (error) {
        if (retryCount > 3) {
            throw new Error(error)
        } else {
            await new Promise(r => setTimeout(r, 2000))
            return getRequest(endPoint, retryCount + 1)
        }
    }
}

export const postRequest = async (endPoint, payload, retryCount = 0) => {
    const options = {
        method: 'POST',
        url: apiUrl + endPoint,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: payload
    }
    try {
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        if (retryCount > 3) {
            return {
                error: error.response.data
            }
        } else {
            await new Promise(r => setTimeout(r, 2000))
            return postRequest(endPoint, payload, retryCount + 1)
        }
    }
}