import axios from 'axios'
export const apiURLQuery = process.env.REACT_APP_API_URL;

export const getData = async (URL) => {
    const response = await fetch(apiURLQuery + URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const postData = async (URL, data) => {
    const response = await fetch(apiURLQuery + URL, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const putData = async (URL, data) => {
    try {
        const response = await axios.put(`${apiURLQuery}${URL}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

export const deleteData = async (URL, data) => {
    try {
        const response = await axios.delete(`${apiURLQuery}${URL}`, data);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};