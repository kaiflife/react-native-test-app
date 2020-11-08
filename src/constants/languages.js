const notFound = 'not found';
const instructions = 'instructions';
const invalid = 'invalid';
const alreadyExist = 'already exist';

export const USER_NOT_FOUND = `user ${notFound}`;
export const BOARD_NOT_FOUND = `board ${notFound}`;
export const COLUMN_NOT_FOUND = `column ${notFound}`;
export const TASK_NOT_FOUND = `task ${notFound}`;
export const SOMETHING_WENT_WRONG = 'something went wrong';
export const INVALID_PASSWORD = `${invalid} password`;
export const INVALID_TOKEN = `${invalid} token`;
export const EMAIL_EXISTS = `email ${alreadyExist}`;
export const PASSWORD_INSTRUCTIONS = `password ${instructions}`;
export const FULL_NAME_INSTRUCTIONS = `fullName ${instructions}`;
export const EMAIL_INSTRUCTIONS = `email ${instructions}`;
export const DELETED_BOARD_FROM_LIST = 'board was deleted from your list';
export const DELETED_BOARD = 'board was deleted';
export const EMPTY_DATA = 'empty data';
export const CONNECTION_ERROR = 'Connection error';
export const SERVER_NOT_RESPOND = 'Server is not responding';
const BOARD_TITLE_INSTRUCTIONS = 'title length more then 50';

const languages = {
  ru: {
    logIn: 'Авторизоваться',
    ready: 'Готово',
    cancel: 'Отмена',
    back: 'Назад',
    firstName: 'Введите ваше имя',
    lastName: 'Введите вашу фамилию',
    password: 'Введите ваш пароль',
    email: 'Введите ваш email',
    board: 'Доска',
    task: 'Задача',
    tasks: 'Задачи',
    authorize: 'Страница авторизации',
    signUp: 'Регистрация',
    registration: 'Страница регистрации',
    noBoards: 'Досок нет',
    noColumns: 'Колонки отсуствуют',
    noCards: 'Карточки отсутствуют',
    logout: 'Выйти из аккаунта',
    createBoard: 'Создать доску',
    createCard: 'Создать карточку',
    createColumn: 'Создать колонку',
    create: 'Создать',
    participantsCount: 'Приглашенные',
    ownersCount: 'Владельцы',
    membersCount: 'Всего',

    ['Search by title']: 'Поиск по заголовку',
    [BOARD_TITLE_INSTRUCTIONS]: 'Длина заголовка должны быть меньше 50',
    [CONNECTION_ERROR]: 'Ошибка подключения',
    [SERVER_NOT_RESPOND]: 'Сервер не отвечает',
    [USER_NOT_FOUND]: 'Пользователь не найден',
    [BOARD_NOT_FOUND]: 'Доска не найдена',
    [SOMETHING_WENT_WRONG]: 'Что-то пошло не так',
    [INVALID_PASSWORD]: 'Неверный пароль',
    [PASSWORD_INSTRUCTIONS]: 'Пароль должен состоять не менее чем из 8 символов',
    [FULL_NAME_INSTRUCTIONS]: 'Некооректное имя или фамилия',
    [EMAIL_INSTRUCTIONS]: 'Некорректный email',
    [INVALID_TOKEN]: 'Вы не авторизованы',
    [EMAIL_EXISTS]: 'Email уже занят',
    [DELETED_BOARD_FROM_LIST]: 'Доска удалена из вашего списка',
    [DELETED_BOARD]: 'Доска удалена',
    [EMPTY_DATA]: 'Поля не заполнены',
    [TASK_NOT_FOUND]: 'Задача не найдена',
    [COLUMN_NOT_FOUND]: 'Колонка не найдена',
  },
  eng: {
    participantsCount: 'Participants',
    ownersCount: 'Owners',
    membersCount: 'All Members',
    ['Search by title']: 'Search by title',
    createBoard: 'Create board',
    createCard: 'Create Card',
    createColumn: 'Create column',
    create: 'Create',
    signUp: 'Sign up',
    ready: 'Ready',
    cancel: 'Cancel',
    back: 'Go Back',
    firstName: 'Enter your name',
    lastName: 'Enter your lastname',
    password: 'Enter your password',
    email: 'Enter your email',
    board: 'Board',
    boards: 'Boards',
    task: 'Task',
    tasks: 'Tasks',
    authorize: 'Login page',
    signIn: 'Sign in',
    registration: 'Registration page',
    noBoards: 'You have no boards',
    noColumns: 'You have no columns',
    noCards: 'You have no cards',
    logout: 'Logout',

    [BOARD_TITLE_INSTRUCTIONS]: 'Title should be less then 50 symbols',
    [CONNECTION_ERROR]: 'Connection error',
    [SERVER_NOT_RESPOND]: 'Server is not responding',
    [USER_NOT_FOUND]: 'User not found',
    [BOARD_NOT_FOUND]: 'Board not found',
    [SOMETHING_WENT_WRONG]: 'Something went wrong',
    [INVALID_PASSWORD]: 'Invalid password',
    [PASSWORD_INSTRUCTIONS]: 'Password must be more then 8 characters',
    [FULL_NAME_INSTRUCTIONS]: 'Firstname or lastname is incorrect',
    [EMAIL_INSTRUCTIONS]: 'Email is incorrect',
    [INVALID_TOKEN]: 'Unauthorized',
    [EMAIL_EXISTS]: 'Email already exist',
    [DELETED_BOARD_FROM_LIST]: 'Board was removed from your list',
    [DELETED_BOARD]: 'Board was removed',
    [EMPTY_DATA]: 'Empty fields',
    [TASK_NOT_FOUND]: 'Task not found',
    [COLUMN_NOT_FOUND]: 'Column not found',
  }
}

export const LANGUAGE_STORAGE_KEY = 'language';

export default languages;