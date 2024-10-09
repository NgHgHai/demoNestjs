import { MULTER_DEST } from '../constants';
import * as multer from 'multer';

console.log(__dirname);

export const multerFactory = async (): Promise<any> => ({
  dest: MULTER_DEST,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, MULTER_DEST);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    //#region validate file từ làm thêm vào nhen

    cb(null, true);
  },
});
