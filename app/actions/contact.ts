"use server";

import { revalidatePath } from "next/cache";
import { createContact, deleteContact, updateContact } from "../api/contact";
import { getSession } from "../_lib/session";
import {ContactType} from "../_types/contact"
import { uploadToCloudinary } from "../_lib/cloudinary";

export const createContactAction = async (prevState: any, formData: FormData)=> {
   if(!formData.get("name")) {
    return {error: `Name is missing`};
   } 

   const user = await getSession();
   const photo = formData.get("photo") as File;
   const tags = formData.get("tags") as string;

   let photoUrl = "";
   if(photo && photo.size > 0){
        const cloudinaryResponse = await uploadToCloudinary(photo) as any;
        photoUrl = cloudinaryResponse.secure_url;
   }

   const newContact: ContactType = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user?.id,
    photo: photoUrl,
    tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
   };

   try {
    await createContact(newContact);
    revalidatePath("/contact");
    return {success: true};

   } catch (error) {
    console.log("Error creating contact: ", error);
    return{error: "Faild to create contact"}
   }
}

export const updateContactAction = async (prevState: any, formData: FormData) => {
   
    const id = await formData.get("id") as string;
    const photo = formData.get("photo") as File;
    const tags = formData.get("tags") as string;

    let photoUrl = "";
    if(photo && photo.size > 0){
         const cloudinaryResponse = await uploadToCloudinary(photo) as any;
         photoUrl = cloudinaryResponse.secure_url;
    }


   const user = await getSession();

   const updatedContact: any = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user?.id,
    tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
   };

   if(photoUrl) {
    updatedContact.photo = photoUrl;
   }

   try {
    await updateContact(id, updatedContact);
    revalidatePath("/contact");
    return {success: true};

   } catch (error) {
    console.log("Error updating contact: ", error);
    return{error: "Faild to update contact"}
   }
}


export const deleteContactAction = async (prevState: any, formdata: FormData) => {
    const id = formdata.get("id") as string;

    try {
        await deleteContact(id);
        revalidatePath("/contact")
        return{success: true};

    } catch (error) {
        console.log("Error deleting contact: ", error);
        return{error: "Faild to delete contact"}
    }
};