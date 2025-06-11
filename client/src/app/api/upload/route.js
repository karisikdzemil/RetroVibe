import { NextResponse } from "next/server";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // ✅ Dodaj getDownloadURL
import { firebaseConfig } from "@/app/firebase";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !file.arrayBuffer) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `images/${fileName}`);

    await uploadBytes(storageRef, buffer, { contentType: file.type });
    const url = await getDownloadURL(storageRef); // ✅ Ovo će sada raditi

    return NextResponse.json({ imageUrl: url });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}