const API_BASE_URL = '/api';

export const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            let mensajeFinal = errorText;

            try {
                const errorJson = JSON.parse(errorText);
                mensajeFinal = errorJson.mensaje || errorJson.message || errorJson.error || errorText;
            } catch {
                mensajeFinal = errorText;
            }

            throw new Error(mensajeFinal || `Error HTTP: ${response.status}`);
        }

        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en la petición a ${endpoint}:`, error);
        throw error;
    }
};
