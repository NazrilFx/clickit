"use client";
import { useState, useEffect } from "react";
import FormInput from "@/components/FormInput";
import CountryDialCodePicker from "@/components/CountryNumberPicker";
import getCsrfToken from "@/utils/fetcherCsrfToken";
import getCurrentUser from "@/utils/fetchCurrentUser";
import WALinkMaker from "@/utils/WALinkMaker";
import getAllCategories from "@/utils/fetchAllCategories";
import { IUser } from "@/models/User";
import { ICategoryWithId } from "@/models/Category";
import CategoriesPicker from "@/components/CategoriesPicker";
import LocationPicker from "@/components/LocationPicker";
import MultiImagePicker from "@/components/MultiImagePicker";
import SingleVideoPicker from "@/components/VideoPicker";

export default function AffiliatePage() {
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState("");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [categories, setCategories] = useState<ICategoryWithId[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [targetLocations, setTargetLocations] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token || ""));

    getCurrentUser().then((user) => setCurrentUser(user));

    getAllCategories()
      .then((categories) => setCategories(Array.isArray(categories) ? categories : []))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const imagesPreviewUrl: string[] = []
    let videoPreviewUrl: string = ""
    e.preventDefault()
    if (images.length > 0) {
      for (const file of images) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'clickit'); // Ganti dengan preset kamu

        const res = await fetch('https://api.cloudinary.com/v1_1/dqbdvmmgu/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          imagesPreviewUrl.push(data.secure_url)
        } else {
          alert("Upload image failed");
        }
      }
    }

    if (video) {
      const formData = new FormData();
      formData.append('file', video);
      formData.append('upload_preset', 'clickit'); // Ganti dengan preset kamu

      const res = await fetch('https://api.cloudinary.com/v1_1/dqbdvmmgu/video/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        videoPreviewUrl = data.secure_url
      } else {
        alert("Upload video failed");
      }
    }

    const redirectUrl = WALinkMaker(number, message);
    try {
      const res = await fetch("/api/link/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          category_id: selectedCategory,
          user_id: currentUser?._id, // Ensure currentUser is not null
          redirectUrl,
          targetLocations,
          images: imagesPreviewUrl, // Optional, can be added later
          video: videoPreviewUrl, // Optional, can be added later
          phone: number,
          csrfToken, // Include CSRF token in the request
        }),
      });
      const json = await res.json();
      if (res.ok) {
        alert("Link created successfully!");
        // Redirect to login or home page
        setName("");
        setNumber("");
      } else {
        alert(json.message || "Link creation failed");
      }
    } catch (error) {
      console.error("Error during link creation:", error);
    }
  };

  const handleImages = (files: File[]) => { // Saving selected images
    setImages(files);
  };

  const handleVideo = (file: File) => {
    setVideo(file); // Saving selected video
  }

  return (
    <>
      <section aria-label="Grow your audience" className="mb-8">
        <h1 className="mr-auto text-blue-900 rounded-2xl border-1 border-blue-500 bg-blue-50 w-60 flex justify-center font-bold text-2xl py-3 my-3">
          Create Your Link
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            type="text"
            name="linkName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Link Name"
          />
          <CountryDialCodePicker onChange={(e) => setNumber(e.target.value)} />
          <FormInput
            name="number"
            value={number}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, ""); // filter hanya angka
              setNumber(onlyNumbers);
            }}
            type="number"
            placeholder="Whatsapp Number (ex: 6285792962289)"
          />
          <CategoriesPicker categories={categories} onChange={(e) => setSelectedCategory(e.target.value)} />
          <LocationPicker locationData={setTargetLocations} />
          <MultiImagePicker onImagesSelected={handleImages} />
          <SingleVideoPicker onVideoSelected={handleVideo} />
          <FormInput
            type="text"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Message (ex: Hi, I want to buy this product)"
          />
          <FormInput
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            textarea
            type="text"
            placeholder="description (briefing for affiliator)"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            {loading ? "Loading..." : "Create Link"}
          </button>
        </form>
      </section>
    </>
  );
}
