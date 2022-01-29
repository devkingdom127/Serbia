import axios from 'axios';

const baseDomain = 'https://auibwd.xyz/api';
export const assetURL = 'https://auibwd.xyz/assets/images';

export const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create( {
    baseUrl,
    headers: customHeaders
} );