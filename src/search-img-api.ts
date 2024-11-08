import axios from "axios";

const API_KEY = "Xdy94vcF56BSiQfuDNbwyg5MdtToIT8jxqpN3UvVkqg";

axios.defaults.baseURL = `https://api.unsplash.com/search/photos/`;

export type Image = {
  id: string;
  likes: number;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
}

type ApiResponse = {
  results: Image[];
};

const searchImagesForTopic = async (topic: string, page: number): Promise<Image[]> => {
  const res = await axios.get<ApiResponse>(
    `?client_id=${API_KEY}&query=${topic}&per_page=8&page=${page}`
  );

  return res.data.results;
};
export default searchImagesForTopic;
