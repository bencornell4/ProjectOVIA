async function reqUser() {
    const apiUrl = BASE_URL + '/api/profiles/getusername';
    return fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((body) => {
            return body;
        }).catch((error) => {
            //not logged in
        });
}

module.exports = { reqUser };