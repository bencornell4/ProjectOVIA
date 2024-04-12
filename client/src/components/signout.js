document.getElementById("signOutButton").addEventListener('click', function() {
    const apiUrl = BASE_URL + '/api/auth/signout';
    fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(body => {
            //reload to reflect changes
            location.reload();
        }).catch(error => {
            console.error("Error signing out: ", error.message);
        });
});