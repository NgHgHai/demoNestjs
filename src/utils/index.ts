import { ValidationArguments } from 'class-validator';
import * as dayjs from 'dayjs';

export const generateValidationMessage = (
  arg: ValidationArguments,
  message: string,
): string => JSON.stringify({ [arg.property]: message });

export const getDateNow = (date: Date) =>
  dayjs(date).format('YYYY-MM-DD HH:mm:ss');

export const getDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');

exports.getTimeElapsed = (myDate: Date) => {
  const d = new Date().getDate() - new Date(myDate).getDate();
  if (new Date().getMonth() + 1 === new Date(myDate).getMonth() + 1) {
    switch (d) {
      case 0:
        return `Hôm nay - ${dayjs(new Date(myDate)).format('DD-MM-YYYY')}`;

      case 1:
        return `Hôm qua - ${dayjs(new Date(myDate)).format('DD-MM-YYYY')}`;

      case 2:
        return `Hôm kia - ${dayjs(new Date(myDate)).format('DD-MM-YYYY')}`;

      default:
        return `Ngày - ${dayjs(new Date(myDate)).format('DD-MM-YYYY')}`;
    }
  } else {
    return `Ngày ${dayjs(new Date(myDate)).format('DD-MM-YYYY')}`;
  }
};

export const sprintf = (str, ...argv) =>
  !argv.length
    ? str
    : sprintf(
        (str = str.replace(/((%s)|(\$)|(\{[0-9]\}))/, argv.shift())),
        ...argv,
      );

export const padNumber = (num: number) => `.${num.toString().padStart(6, '0')}`;

export const generateCode = (prefix: string, num: number) => {
  return `${prefix}${padNumber(num)}`;
};

export const addBaseUrl = (file: any) => {
  return {
    ...file,
    path: process.env.BASE_URL + file.path,
    originalname: file?.path?.substring(19) ?? file.path,
  };
};

export const lowerCase = (str) => str.toLowerCase() ?? str;
// const addBaseUrl = (files) => {
//   if (files?.length) {
//     return files.map((file) => {
//       file.path = `${process.env.BASE_URL}/${file.path}`;
//       const filename = file.path.split('/').pop();
//       return { ...file, filename };
//     });
//   }
//   files.path = `${process.env.BASE_URL}/${files.path}`;
//   const filename = files.path.split('/').pop();
//   return { ...files, filename };
// };

export const formatListIdString = (str) => {
  if (typeof str === 'string') {
    return str
      .split(',')
      .map((item) => `'${item}'`)
      .join(',');
  }

  if (Array.isArray(str)) {
    return str.map((item) => `'${item}'`).join(',');
  }

  return str;
};
