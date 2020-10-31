const apiUrl = 'http://192.168.0.102:80/api/v1';

const usersRoute = `${apiUrl}/users`;

const authUrl = `${usersRoute}/auth`;
const registrationUrl = `${usersRoute}/registration`;

export {
  authUrl,
  registrationUrl,
};