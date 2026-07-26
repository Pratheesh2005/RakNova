import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ProfilePhotoUpload() {
  const [photo, setPhoto] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-6 p-5 border border-gray-200 rounded-xl">
      <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-2xl font-bold flex-shrink-0 overflow-hidden">
        {photo ? <img src={photo} alt="Profile" className="w-full h-full object-cover" /> : "JD"}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">Profile Photo</p>
        <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
        <div className="flex gap-2 mt-3">
          <label className="cursor-pointer">
            <Button variant="outline" size="sm" type="button" onClick={() => document.getElementById("photo-upload")?.click()}>
              Upload Photo
            </Button>
            <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
          {photo && (
            <Button variant="ghost" size="sm" onClick={() => setPhoto(null)}>
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
