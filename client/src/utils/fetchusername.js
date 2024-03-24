async function reqUser() {
    return fetch('http://localhost:3000/api/profiles/getusername', {
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