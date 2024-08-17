// import axios from 'axios'
// import { _TEMP_API, apiURLQuery } from 'config/app'

export const apiURLQuery = 'https://json-quickmessage.vercel.app'

export const getData = async (URL) => {
    const response = await fetch(apiURLQuery + URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// export const getData = async (URL, config) => {
//     const respond = config
//         ? await axios
//             .post(apiURLQuery + URL, config)
//             .then((res) => res)
//             .catch((error) => error.response)
//         : await axios
//             .get(apiURLQuery + URL)
//             .then((res) => res)
//             .catch((error) => error.response)
//     return respond.data
// }

// export const putData = async (URL, config) => {
//     const respond = await axios
//         .put(apiURLQuery + URL, config)
//         .then((res) => res)
//         .catch((error) => error.response)
//     return respond.data
// }

// export const deleteData = async (URL, config) => {
//     const respond = config
//         ? await axios
//             .delete(apiURLQuery + URL, config)
//             .then((res) => res)
//             .catch((error) => error.response)
//         : await axios
//             .delete(apiURLQuery + URL)
//             .then((res) => res)
//             .catch((error) => error.response)
//     return respond.data
// }

// export const patchData = async (URL, config) => {
//     const respond = await axios
//         .patch(apiURLQuery + URL, config)
//         .then((res) => res)
//         .catch((error) => error.response)

//     return respond.data
// }

// export const putformData = async (URL, formData) => {
//     const respond = await axios
//         .put(apiURLQuery + URL, formData)
//         .then((res) => res)
//         .catch((error) => error.response)

//     return respond.data
// }

// export const _tempGetData = async (URL, config) => {
//     const respond = config
//         ? await axios
//             .post(_TEMP_API + URL, config)
//             .then((res) => res)
//             .catch((error) => error.response)
//         : await axios
//             .get(_TEMP_API + URL)
//             .then((res) => res)
//             .catch((error) => error.response)
//     return respond.data
// }
