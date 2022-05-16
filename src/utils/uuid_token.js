import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    let token = window.localStorage.getItem('uuid_token')
    if (!token) {
        token = uuidv4()
        window.localStorage.setItem('uuid_token', token)
    }
    return token
}