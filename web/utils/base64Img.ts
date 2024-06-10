const axios = require("axios");

export const fetchBase64Image = async (url: string) => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    if (response.status === 200) {
      let base64Image =
        `data:${response.headers["content-type"]};base64,` +
        Buffer.from(response.data).toString("base64");
      return base64Image;
    } else {
      throw new Error("Failed to fetch image");
    }
  } catch (error: any) {
    console.error("Error fetching image:", error?.message);
    return "";
  }
};
