/* routers */
export const routers = {
    get: function (url) {
        return fetch(url, {
            method: 'GET'
        }).then(res => res.json());
    },
    post: function (url, body) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    },
    delete: function (url, id) {
        return fetch(url + `/${id}`, {
            method: 'DELETE'
        }).then(res => res.json());
    }
}