import Image from "../models/images.model"

export const getImagesService = async () => {
    const images = await Image.find(
        {},
        { _id: 1, img_url: 2, label: 3 }
    ).sort({ createdAt: -1 });

    return images
}

export const createImageService = async (img_url: string, label: string) => {
    const image = await Image.create({
        img_url: img_url,
        label: label,
    });

    return image
}

export const findImageByIdService = async (imageId: string) => {
    const image = await Image.findById(imageId);

    return image
}

export const deleteImageService = async (imageId: string) => {
    await Image.findByIdAndDelete(imageId);
}