async function fetchProfileData(username) {
    try {
        //fetch profile data
        const apiUrlData = BASE_URL + `/api/profiles/${username}`;
        const profileResponse = await fetch(apiUrlData);
        if (!profileResponse.ok) {
            throw new Error('Network response not ok');
        }
        const data = await profileResponse.json();
        var pfpKey = data[0].pfp_key;
        var assetKey = `pfp/${pfpKey}`;
        //if key doesn't exist supply default key
        if(!pfpKey) {
            assetKey = 'pfp/0';
        }
        //check for pfp
        const apiUrlExists = BASE_URL + `/api/assets/exists/${encodeURIComponent(assetKey)}`;
        const assetResponse = await fetch(apiUrlExists);
        if (!assetResponse.ok) {
            throw new Error('Network response not ok');
        }
        var assetURL = await assetResponse.json();
        //if asset doesn't exist supply default
        if (!assetURL) {
            assetURL = `https://res.cloudinary.com/dllfvjfoy/image/upload/pfp/0`;
        }
        const profileData = {
            username: username,
            profPic: assetURL,
            userFullName: data[0].full_name,
            userBio: data[0].bio
        };
        return profileData;
    } catch (error) {
        console.error('Error getting profile data:', error);
        throw error;
    }
}

async function fetchProfileKey(username) {
    try {
        //fetch profile data
        const apiUrl = BASE_URL + `/api/profiles/${username}`;
        const profileResponse = await fetch(apiUrl);
        if (!profileResponse.ok) {
            throw new Error('Network response not ok');
        }
        const data = await profileResponse.json();
        return data[0].pfp_key;
    } catch (error) {
        console.error('Error getting profile data:', error);
        throw error;
    }
}

module.exports = { fetchProfileData, fetchProfileKey };