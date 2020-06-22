require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const decode = require('urldecode');

const s3 = new AWS.S3({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });


module.exports = {
    Mutation: {

        async uploadFile(parent, args) {
            try {

                const file = await args.file;
                const { createReadStream, filename, mimetype } = file;
                const fileStream = createReadStream();
                const uuid = uuidv1();

                // fs upload
                /*
                const dir = `./uploads/${uuid}`;
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                const location = `${dir}/${filename}`;
                fileStream.pipe(fs.createWriteStream(location));
                file.filename = location;
                */

                // aws s3
                const uploadParams = {
                    Bucket: process.env.AWS_BUCKET,
                    Key: `${process.env.AWS_UPLOAD_FOLDER}/${uuid}/${filename}`,
                    Body: fileStream,
                    ACL: 'public-read',
                };
                const result = await s3.upload(uploadParams).promise();
                file.filename = result.Location;


                return file;
            } catch (err) {
                throw new Error(err);
            }
        },

        async deleteFile(_, { file }, context) {
            try {
                const decoded = decode(file);
                const filename = decoded.substring(decoded.lastIndexOf('/') + 1);
                const path = decoded.substring(0, decoded.lastIndexOf('/'));
                const uuid = path.substring(path.lastIndexOf('/') + 1);
                const params = {
                    Bucket: process.env.AWS_BUCKET,
                    Key: `${process.env.AWS_UPLOAD_FOLDER}/${uuid}/${filename}`,
                };
                await s3.deleteObject(params).promise();
                return 'deleted successfully';
            } catch (err) {
                throw new Error(err);
            }
        },

    }
};
