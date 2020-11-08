const apiUrl = 'http://192.168.0.102:80/api/v1';

const usersRoute = `${apiUrl}/users`;

const authUrl = `${usersRoute}/auth`;
const registrationUrl = `${usersRoute}/registration`;
const tasksUrl = `${apiUrl}/tasks`;
const boardsUrl = `${apiUrl}/boards`;
const columnsUrl = `${apiUrl}/columns`;
const cardsUrl = `${apiUrl}/cards`;

const logoutUrl = `${usersRoute}/logout`;

const refreshTokenUrl = `${usersRoute}/refreshToken`;

export {
  authUrl,
  registrationUrl,
  columnsUrl,
  tasksUrl,
  boardsUrl,
  usersRoute,
  refreshTokenUrl,
  logoutUrl,
  cardsUrl,
};