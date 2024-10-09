export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/-])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?/-]{8,}$/i;

export const MOBILE_REGEX = /^[0-9]{10,11}$/;

export const SQL_KEYWORD_REGEX =
  /(\b(SELECT|UPDATE|DELETE|INSERT|FROM|WHERE|DROP|ALTER)\b)/i;

export const SQL_LOGIC_REGEX = /(\b(UNION|ALL|ANY|EXISTS|IN|LIKE|OR|AND)\b)/i;

export const SQL_SPECIAL_CHARACTERS_REGEX = /(--|\/\*|\*\/|;)/;

export const SQL_QUOTES_REGEX = /('|")/;

export const SQL_REGEX = [
  SQL_KEYWORD_REGEX,
  SQL_LOGIC_REGEX,
  SQL_SPECIAL_CHARACTERS_REGEX,
  SQL_QUOTES_REGEX,
];

export const DATABASE = {
  USER: process.env.DB_USER || 'sa',
  PASSWORD: process.env.DB_PASSWORD || '@Bc12345',
  HOST: process.env.DB_HOST || 'localhost',
  PORT: parseInt(process.env.DB_PORT) || 1433,
  NAME: process.env.DB_DATABASE || 'Todo_app',
  TYPE: process.env.DB_DATABASE_TYPE || 'mssql',
};

export const ROLES_KEY = process.env.ROLES_KEY || 'exampleRoles';
export const SENTRY_DSN = process.env.SENTRY_DSN || 'register-your-dsn';
export const SALT = parseInt(process.env.SALT) || 10;
export const IS_PUBLIC_KEY = process.env.IS_PUBLIC_KEY || 'isPublic';

export const MULTER_DEST = process.env.MULTER_DEST || './uploads';