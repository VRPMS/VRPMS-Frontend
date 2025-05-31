import { toast } from "react-toastify";

const BASE_LINK = 'https://vrpms-backend.fly.dev/';

export async function uploadFile(file: File | null) {
  if(!file) {
    return { error: "Try again." }
  }
  const formData = new FormData();
  formData.append('fileName', file);

  try {
    const res = await fetch(BASE_LINK + 'data/import', {
      method: 'POST',
      body: formData,
    } as RequestInit);

    if (!res.ok) {
      if(res.status === 500) {
        toast.warn("Some error occurred on server side. Try again later")
        return {error: "Server error"}
      } else {
        const error = JSON.parse(await res.text());
        throw new Error(error.message)
      }
    }

    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}