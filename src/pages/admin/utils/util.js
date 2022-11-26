import axios from "axios";

export const uploadImage = async(images, productId) =>{
    const formData = new FormData();
  
    Array.from(images).forEach(image => {
      formData.append('images',image)
    });
  
    await axios.post(`/api/products/admin/fileupload?productId=${productId}`, formData)
  };
  
 export const uploadImageCloudinary = async(images,productId)=>{
    const url = 'https://api.cloudinary.com/v1_1/dtcws1ecu/image/upload';
  
    const formData = new FormData();
  
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
  
      formData.append('file',file);
      formData.append('upload_preset',"zywwhoz0");
      fetch(url, {
        method: 'POST',
        body : formData
      })
      .then(resp => resp.json())
      .then(data =>{
         axios.post(`/api/products/admin/fileupload?cloudinary=true&productId=${productId}`,{ url : data.url })
      })
      
    }
    
  }
  