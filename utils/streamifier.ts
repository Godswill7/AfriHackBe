import cloudinary from "./cloudinary";
import streamifier from "streamifier";

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

export const streamUpload = async(req: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error: Error, result: any) => {
        if (error) {
          return reject(error);
        } else {
          
          return resolve(result);
        }
      }
    );

    streamifier.createReadStream(req?.file?.buffer!).pipe(stream);
  });
}

// const image: any = await streamUpload(req);