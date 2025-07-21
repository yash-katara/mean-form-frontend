import axios from 'axios';

export const getPredictedAge = async (name) => {
  try {
    const response = await axios.get(`https://api.agify.io/?name=${name}`);
    return response.data.age || 0;
  } catch (err) {
    console.error('Agify API failed:', err.message);
    return 0; // Return 0 if the API call fails
  }
};
