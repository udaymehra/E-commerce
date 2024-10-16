const cloudinary=require('cloudinary').v2
const multer=require('multer');
cloudinary.config({
    cloud_name:'doxw2i6cl',
    api_key: '722291474842417',
    api_secret:'gGMB9rXSoJG-0pQTAYiTxZA2he0'
}) 

const storage =new multer.memoryStorage();
async function imageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file,{
       resource_type:'auto',
    })
    return result;
}

const upload =multer({storage});
module.exports={upload,imageUploadUtil};