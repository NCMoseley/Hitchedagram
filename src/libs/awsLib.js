import { Storage } from 'aws-amplify';

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}

// export async function s3Fetch(attachment) {
//   const image = await Storage.vault.get();
//   console.log(image);
//   return image;
// }
