const { jwtDecode } = require('jwt-decode');

function reqUser() {
    const cookies = document.cookie.split('; ');
    const userCookie = cookies.find(row => row.startsWith('user-auth-token'));
    const token = userCookie ? userCookie.split('=')[1] : null;
    const decodeToken = jwtDecode(token);
    return decodeToken.username;
}

module.exports = { reqUser };