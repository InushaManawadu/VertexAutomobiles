import { storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

const sanitizeFileName = (name) => (
    name
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, '-')
        .replace(/^-+|-+$/g, '')
);

const uploadSingleImage = (file, index, total, onProgress) => new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
        reject(new Error(`${file.name} is not an image file.`));
        return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
        reject(new Error(`${file.name} is larger than 8 MB.`));
        return;
    }

    const filePath = `car-images/${Date.now()}-${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
    const imageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(imageRef, file, {
        contentType: file.type,
        customMetadata: {
            originalName: file.name
        }
    });

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const fileProgress = snapshot.bytesTransferred / snapshot.totalBytes;
            const progress = Math.round(((index + fileProgress) / total) * 100);
            onProgress(progress);
        },
        reject,
        async () => {
            resolve(await getDownloadURL(uploadTask.snapshot.ref));
        }
    );
});

export const uploadCarImages = async (files, onProgress) => {
    const imageFiles = Array.from(files);
    const uploadedUrls = [];

    for (const [index, file] of imageFiles.entries()) {
        const downloadUrl = await uploadSingleImage(file, index, imageFiles.length, onProgress);
        uploadedUrls.push(downloadUrl);
    }

    onProgress(100);
    return uploadedUrls;
};
