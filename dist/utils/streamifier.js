"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamUpload = void 0;
const cloudinary_1 = __importDefault(require("./cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
// export const streamUpload = async (req: any) => {
//   return new Promise(async (resolve, reject) => {
//     let stream = cloudinary.uploader.upload_stream(
//       (error: Error, result: any) => {
//         if (result) {
//           return resolve(result);
//         } else {
//           return reject(error);
//         }
//       }
//     );
//     streamifier.createReadStream(req.file.buffer).pipe(stream);
//   });
// };
const streamUpload = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        var _a;
        const stream = cloudinary_1.default.uploader.upload_stream((error, result) => {
            if (error) {
                return reject(error);
            }
            else {
                return resolve(result);
            }
        });
        streamifier_1.default.createReadStream((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.buffer).pipe(stream);
    });
});
exports.streamUpload = streamUpload;
// const image: any = await streamUpload(req);
