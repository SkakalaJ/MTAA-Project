import Minio from 'minio';
import { Readable } from "stream";
import { makeTokenizer } from "@tokenizer/http";
import FileType, { FileTypeResult } from "file-type";

export const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minio_access_key',
    secretKey: 'minio_secret_key'
});

// export async function uploadFile(bucketName: string): Promise<void>{
//     var file = 'C:\\Users\\juraj\\Pictures\\lucifer.jpg';


// }

export async function upload(bucket: string, name: string, data: string | Buffer | Readable): Promise<string> {
    if (!await minioClient.bucketExists(bucket))
        await minioClient.makeBucket(bucket, '');

    return await minioClient.putObject(bucket, name, data);
}

// export async function stat(bucket: string, name: string): Promise<BucketItemStat> {
//     return await client.statObject(bucket, name);
// }

// export async function remove(bucket: string, name: string): Promise<void> {
//     return await client.removeObject(bucket, name);
// }

// export async function move(sourceBucket: string, sourceName: string, targetBucket: string, targetName: string): Promise<void> {
//     const conds = new CopyConditions();
//     await client.copyObject(targetBucket, targetName, `${sourceBucket}/${sourceName}`, conds);
//     await client.removeObject(sourceBucket, sourceName);
// }

// export async function listObjects(bucket: string): Promise<BucketItem[]> {
//     return new Promise((resolve, reject) => {
//         const stream = client.listObjects(bucket);
//         const list: BucketItem[] = [];
//         stream.on('data', object => list.push(object));
//         stream.on('error', error => reject(error));
//         stream.on('finish', () => resolve(list));
//     });
// }

export async function getPresignedUploadUrl(bucket: string, name: string, expiresIn?: number): Promise<string> {
    return await minioClient.presignedPutObject(bucket, name, expiresIn);
}

export async function getPresignedDownloadUrl(bucket: string, name: string, expiresIn?: number): Promise<string> {
    return await minioClient.presignedGetObject(bucket, name, expiresIn);
}

// export async function getFileStream(bucket: string, name: string): Promise<Readable> {
//     return await minioClient.getObject(bucket, name);
// }

export async function getFileType(bucket: string, name: string): Promise<FileTypeResult | undefined> {
    const url = await minioClient.presignedGetObject(bucket, name, 3600);
    const tokenizer = await makeTokenizer(url);
    return await FileType.fromTokenizer(tokenizer);
}
