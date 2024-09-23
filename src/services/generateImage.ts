import axiosInstance from "./axiosConfic";

const generateImage = async (image_path: string, prompt: string) => {
  const body = {
    prompt: prompt,
    image_path: image_path
  };

  try {
    const response = await axiosInstance.post("/generate-prompt", body);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export default generateImage;


