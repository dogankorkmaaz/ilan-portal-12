const API_BASE_URL = 'http://157.173.204.194:3001/api';

const defaultHeaders: Record<string, string> = {
    'Accept': 'application/json',
};

// This function will set the auth token for all subsequent requests.
export const setAuthToken = (token: string | null) => {
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
        delete defaultHeaders['Authorization'];
    }
};

const request = async (method: string, endpoint: string, body?: any, customHeaders?: Record<string, string>) => {
    const isFormData = body instanceof FormData;
    
    // Create headers for this specific request
    const headers = { ...defaultHeaders, ...customHeaders };
    
    // For FormData, browser sets Content-Type automatically with the correct boundary
    // So we must remove it from our headers if it was added by mistake.
    if (isFormData) {
        delete headers['Content-Type'];
    } else if (body) {
        headers['Content-Type'] = 'application/json';
    }

    const config: RequestInit = {
        method,
        headers,
    };
    
    // Only add body for relevant methods
    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        // Try to parse JSON from the response, regardless of status, to get error messages
        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
            // Create an error object that mimics axios for compatibility with existing components
            const error: any = new Error(responseData?.message || response.statusText || 'An unknown error occurred');
            error.response = { data: responseData || { message: response.statusText } };
            throw error;
        }

        return responseData;

    } catch (error) {
        console.error(`API Error on ${method} ${endpoint}:`, error);
        throw error;
    }
};

// This mimics the axios-like interface the other components expect
export const api = {
    get: (endpoint: string) => request('GET', endpoint),
    post: (endpoint: string, body: any, config?: { headers?: Record<string, string> }) => request('POST', endpoint, body, config?.headers),
};