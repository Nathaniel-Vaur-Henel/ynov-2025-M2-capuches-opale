const BASE_URL = "http://localhost:8080/capuches-opale";

export const fetchData = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return response.json();
};

export const postData = async <TRequest, TResponse>(
    endpoint: string,
    data: TRequest
): Promise<TResponse> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return response.json();
};

export const putData = async <T>(endpoint: string, data: T): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    return response.json();
};

export const deleteData = async (endpoint: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
};


