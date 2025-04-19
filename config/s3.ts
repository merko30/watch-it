// Import necessary modules from AWS SDK
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const s3Client = new S3Client({
  region: process.env.AWS_REGION!, // Specify the AWS region from environment variables
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID!, // Access key ID from environment variables
    secretAccessKey: process.env.AWS_SECRETACCESSKEY! // Secret access key from environment variables
  }
})

// upload image
export const uploadImage = async (key: string, body: Buffer) => {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: 'image/jpeg' // Specify the content type of the image,
      //ACL: 'public-read' // Set the ACL to public-read to make the image publicly accessible
    })
    const result = await s3Client.send(command)
    console.log('Image uploaded successfully:', result)
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}
