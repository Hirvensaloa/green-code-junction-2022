import { useState } from "react";

export const useUploadFile = () => {
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const uploadFile = async (file: File | null, title: string) => {
    const body = new FormData();
    body.append("title", title);
    body.append("name", title);
    body.append("contentType", file?.type || "");

    const response = await fetch("http://localhost:7777/api/upload/file", {
      method: "POST",
      body,
    });

    const { url } = await response.json();

    const uploadUrl = url[0];

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file?.type || "",
      },
      body: file,
    });

    if (uploadResponse.status !== 200) {
      window.alert("Upload failed");

      setError(true);
    } else {
      // Toast success
      window.alert("Uploaded succesfully!");

      setFile(null);
      setTitle("");
    }
    setLoading(false);
  };

  return { title, setTitle, file, setFile, loading, error, uploadFile };
};
