"use client"

import { sql } from '@vercel/postgres';
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function UploadImge(){
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState(false);

  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  const handleSubmit = async (e: React.FormEvent) => {
    setInProgress(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file as Blob);

    const response = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setPreview(data.url);
    setInProgress(false);

    await sql`UPDATE topics SET image = ${preview} WHERE topics.id = ${search}`;
  };

  return(
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.item(0) || null)}
        />
        <button type="submit">{inProgress ? "Uploading..." : "Upload"}</button>

        {preview && (
          <div>
            <Image src={preview} alt="Icon" width={200} height={200} />
          </div>
        )}
    </form>
  );
}