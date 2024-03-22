const { jwtDecode } = require('jwt-decode');

function reqUser() {
    const cookies = document.cookie.split('; ');
    const userCookie = cookies.find(row => row.startsWith('user-auth-token'));
    const token = userCookie ? userCookie.split('=')[1] : null;
    if (token) {
        return jwtDecode(token).username;
    }
    return false;
}

module.exports = { reqUser };