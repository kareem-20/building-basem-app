// import { Injectable } from '@angular/core';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Platform } from '@ionic/angular';
// import { DataService } from '../data/data.service';
// import { HttpClient, HttpEventType } from '@angular/common/http';
// import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';

// const IMAGE_DIR = 'stored-images';

// interface LocalFile {
//   name: string;
//   data: string;
//   progress: number;
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class CameraService {
//   images: LocalFile[] = [];
//   uploadedImages: any[] = []

//   constructor(
//     private plt: Platform,
//     private http: HttpClient,
//     private dataService: DataService
//   ) { }

//   // async createFolder() {
//   //   Filesystem.readdir({
//   //     path: IMAGE_DIR,
//   //     directory: Directory.Data,
//   //   }).then(async result => {
//   //     // Folder  exists!
//   //     for (let file of result.files) {
//   //       const filePath = `${IMAGE_DIR}/${file.name}`;
//   //       await Filesystem.deleteFile({
//   //         path: filePath,
//   //         directory: Directory.Data,
//   //       })
//   //     }
//   //   },
//   //     async (err) => {
//   //       // Folder does not exists!
//   //       await Filesystem.mkdir({
//   //         path: IMAGE_DIR,
//   //         directory: Directory.Data,
//   //       });
//   //     }
//   //   )
//   // }

//   async selectImage(camera: boolean = true) {
//     console.log(camera);

//     const options: ImageOptions = {
//       quality: 100,
//       allowEditing: false,
//       resultType: CameraResultType.Uri,
//       saveToGallery: true,
//       source: camera ? CameraSource.Camera : CameraSource.Photos // Camera, Photos or Prompt!
//     }
//     console.log(options);

//     const image = await Camera.getPhoto(options);
//     console.log(image);
//     if (image) return await this.saveImage(image)
//   }

//   async saveImage(photo: Photo) {
//     const base64Data = await this.readAsBase64(photo);
//     const fileName = new Date().getTime() + '' + '_' + (photo.webPath.lastIndexOf('/') + 1) + `.${photo.format}`;
//     const image = {
//       name: fileName,
//       path: `${IMAGE_DIR}/${fileName}`,
//       data: base64Data.includes(`data:image`) ? base64Data : `data:image/${photo.format};base64,${base64Data}`,
//       progress: 0
//     }

//     this.images.push(image);
//     return image
//   }

//   private async readAsBase64(photo: Photo) {
//     if (this.plt.is('hybrid')) {
//       const file = await Filesystem.readFile({
//         path: photo.path
//       });
//       return file.data;
//     }
//     else {
//       // Fetch the photo, read as a blob, then convert to base64 format
//       const response = await fetch(photo.webPath);
//       const blob = await response.blob();
//       return await this.convertBlobToBase64(blob) as string;
//     }
//   }

//   convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
//     const reader = new FileReader;
//     reader.onerror = reject;
//     reader.onload = () => {
//       resolve(reader.result);
//     };
//     reader.readAsDataURL(blob);
//   });

//   async uploadOneImage(image: any) {
//     if (image.progress) return null;
//     const promise = new Promise(async (resolve) => {
//       const body = await this.createFormData(image)
//       console.log(body);

//       this.http.post(this.dataService.baseURL + '/upload/image', body, {
//         reportProgress: true,
//         observe: 'events',
//       }).subscribe((event: any) => {
//         if (event.type == HttpEventType.UploadProgress) {
//           image.progress = Math.round(event.loaded / event.total)
//         } else if (event.type == HttpEventType.Response) {
//           resolve(event.body as string)
//         }
//         resolve(null)
//       }, err => {
//         console.log(err);
//         resolve(null)
//       })
//     })
//     return promise
//   }


//   async createFormData(image: any) {
//     let formData = new FormData()
//     const response = await fetch(image.data);
//     const blob = await response.blob();
//     formData.append('image', blob, image.name)
//     return formData
//   }

// }
