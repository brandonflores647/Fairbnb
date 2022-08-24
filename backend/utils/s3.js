import dotenv from 'dotenv';
import aws from 'aws-sdk';

dotenv.config();

const region = 'us-east-1';
const bucketName = 'fairbnb-images';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: '4'
});

export async function generateUploadURL() {
    const imageName = '';

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    });

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
}
