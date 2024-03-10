function fetchProfileData(username) {
    return new Promise((resolve, reject) => { fetch(`http://localhost:3000/api/profiles/${username}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            return response.json();
        })
        .then((data) => {
            const profileData = {
                username: username,
                profPic: `https://res.cloudinary.com/dllfvjfoy/image/upload/pfp/${data[0].pfp_key}`,
                userFullName: data[0].full_name,
                userBio: data[0].bio
            };
            resolve(profileData);
        })
        .catch((error) => {
            console.error('Error getting profile data: ', error);
            reject(error);
        })
    });
}

module.exports = { fetchProfileData };