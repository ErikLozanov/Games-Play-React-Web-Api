
 const request = async (method,url) => {
    const response = await fetch(url, {
        method,
    })

    const result = await response.json();

    return result;
};

export const get = request.bind(null,'GET');
export const post = request.bind(null,'POST');
export const put = request.bind(null,'PUT');
export const del = request.bind(null,'DELETE');