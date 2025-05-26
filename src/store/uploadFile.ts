const BASE_LINK = 'https://vrpms-backend.fly.dev/';

export async function uploadFile(file: File | null) {
  if(!file) {
    return { error: "Try again." }
  }
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(BASE_LINK + 'data/import', {
      method: 'POST',
      body: formData,
    } as RequestInit);

    if (!res.ok) {
      const error = JSON.parse(await res.text());
      throw new Error(error.message)
    }

    return { error: null };
  } catch (error: any) {
    console.error('Upload error:', error);
    return { error: error.message };
  }
}