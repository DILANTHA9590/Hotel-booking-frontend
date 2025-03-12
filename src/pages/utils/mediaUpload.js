import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wZW5wcHh2Y3Z4eGNvZ3hhZG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MDM0MTQsImV4cCI6MjA1NzI3OTQxNH0.673NY24fto8enIGyJeDzJvT9xLAdHTa8Cn4v31Shy2o`;
const url = "https://mpenppxvcvxxcogxadok.supabase.co";

export default function uplaodMediaSuperbase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      return reject("file is emty");
    }

    let fileName = file.name;

    console.log(fileName);
    const extention = fileName.split(".")[fileName.split(".").length - 1];

    if (extention != "jpg" && extention != "png") {
      alert("please select jpg or png file type");
    }
    const supabase = createClient(url, key);

    const timesstamp = new Date().getTime();

    fileName = timesstamp + "." + extention;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;

        resolve(publicUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// if (!file) {
//   alert("Please select one or more files.");
//   return;
// }

//
// const extention = fileName.split(".")[fileName.split(".").length - 1];

// if (extention != "jpg" && extention != "png") {
//   alert("please select jpg or png file type");
// }
// console.log(extention);

// console.log(file.name);

// const supabase = createClient(url, key);

// const timesstamp = new Date().getTime();

// fileName = timesstamp + "." + extention;

// supabase.storage.from("images").upload(fileName, file, {
//   cacheControl: "3600",
//   upsert: false,
// });

// const url2 = supabase.storage.from("images").getPublicUrl(fileName);

// console.log("url", url2);
