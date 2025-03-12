import { useState } from "react";
import uplaodMediaSuperbase from "./utils/mediaUpload";

export default function UploadFile() {
  const [file, setFile] = useState([]);

  async function handleOnClick() {
    const promiseArrey = [];

    for (let i = 0; i < file.length; i++) {
      promiseArrey[i] = uplaodMediaSuperbase(file[i]);
    }

    const imgUrls = await Promise.all(promiseArrey);

    console.log(imgUrls);
  }

  return (
    <div className="flex flex-col">
      <input type="file" multiple onChange={(e) => setFile(e.target.files)} />
      <button onClick={handleOnClick}>Click here</button>
      <img
        className="w-[100px] h-[100px]"
        src="
https://qpomyrakpniobxqxwzzx.supabase.co/storage/v1/object/public/images/1741756927075Screenshot%20(57).png.png"
        // https://mpenppxvcvxxcogxadok.supabase.co/storage/v1/object/public/images//WIN_20231109_19_56_52_Pro.jpg
        alt=""
      />
    </div>
  );
}
