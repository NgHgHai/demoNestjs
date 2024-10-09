// import * as dayjs from 'dayjs';
// import * as fs from 'fs';

// export const readFile = (path: string) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const data = fs.readFileSync(path);
//       console.log('#utils/log - readFile() - log: ' + data);
//       return resolve(data);
//     } catch (err) {
//       console.log('#utils/log - readFile() - error: ' + err);
//       return reject(err);
//     }
//   });
// };

// export const writeFile = (data: any) => {
//   const now = dayjs(Date.now()).format('YYYYMMDD');
//   const path = './logs/' + now + '.lg';

//   if (fs.existsSync(path)) {
//     // Append new data into log file!
//     fs.appendFileSync(path, data);
//   } else {
//     // Delete old files in log directory!
//     deleteFiles(31);

//     // Create a new log file!
//     fs.writeFileSync(path, data);
//   }
// };

// const deleteFiles = (expired) => {
//   const path = './logs';

//   fs.readdir(path, (err, items) => {
//     if (err) console.log('#utils/index - deleteFiles() - error: ' + err);
//     else {
//       const n = new Date();
//       const now = dayjs(new Date(n.getFullYear(), n.getMonth(), n.getDate()));

//       for (let i = 0; i < items.length; i++) {
//         const filename = path + '/' + items[i];
//         fs.stat(filename, (err, stats) => {
//           if (err) {
//             console.log('#utils/index - deleteFiles() - error: ' + err);
//             return;
//           }

//           const c = new Date(stats['ctime']);
//           const created = dayjs(
//             new Date(c.getFullYear(), c.getMonth(), c.getDate()),
//           );

//           const duration = now.diff(created, 'day');
//           const days = Math.floor(duration);
//           console.log(days);

//           if (days >= expired) {
//             fs.unlink(filename, (err) => {
//               console.log('#utils/index - readFile() - error: ' + err);
//             });
//           }
//         });
//       }
//     }
//   });
// };

// export const writeLog = (path?: string, message?: string) => {
//   const data = `[ERROR] ${new Date().toISOString()}: [${path}] : ${message}\r\n`;
//   writeFile(data);
// };
