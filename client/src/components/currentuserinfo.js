const username = 'ben';

fetch(`/api/profiles/${username}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Profile data:', data);
        //update handlebars
    })
    .catch((error) => {
        console.error('Error getting profile data: ', error);
        //display that user doesn't exist? Don't allow redirect?
    });
