const notFound = 'not found';
const instructions = 'instructions';
const invalid = 'invalid';
const alreadyExist = 'already exist';

const USER_NOT_FOUND = `user ${notFound}`;
const BOARD_NOT_FOUND = `board ${notFound}`;
const COLUMN_NOT_FOUND = `column ${notFound}`;
const TASK_NOT_FOUND = `task ${notFound}`;
const SOMETHING_WENT_WRONG = 'something went wrong';
const INVALID_PASSWORD = `${invalid} password`;
const INVALID_TOKEN = `${invalid} token`;
const EMAIL_EXISTS = `email ${alreadyExist}`;

const PASSWORD_INSTRUCTIONS = `password ${instructions}`;
const FULL_NAME_INSTRUCTIONS = `fullName ${instructions}`;
const EMAIL_INSTRUCTIONS = `email ${instructions}`;

const DELETED_BOARD_FROM_LIST = 'board was deleted from your list';
const DELETED_BOARD = 'board was deleted';
const EMPTY_DATA = 'empty data';

const languages = {
  ru: {
    authorize: 'Авторизоваться',
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
    login: 'Страница авторизации',
    registration: 'Страница регистрации',
    
    [USER_NOT_FOUND]: 'Пользователь не найден',
    [BOARD_NOT_FOUND]: 'Доска не найдена',
    [SOMETHING_WENT_WRONG]: 'Что-то пошло не так',
    [INVALID_PASSWORD]: 'Неверный пароль',
    [PASSWORD_INSTRUCTIONS]: 'Пароль жолжен состоять не менее чем из 8 символов',
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
    authorize: 'Authorize',
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
    login: 'Login page',
    registration: 'Registration page',
    passwordInstructions: 'Пароль должен быть не менее 8 символов',

    [USER_NOT_FOUND]: 'User not found',
    [BOARD_NOT_FOUND]: 'Board not found',
    [SOMETHING_WENT_WRONG]: 'Something went wrong',
    [INVALID_PASSWORD]: 'Invalid password',
    [PASSWORD_INSTRUCTIONS]: 'Password must be more then 8 characters',
    [FULL_NAME_INSTRUCTIONS]: 'Firstname of lastname is incorrect',
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