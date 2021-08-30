import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export async function fetchImg (query, page) {
    const { data: {hits}} = await axios.get(`&q=${query}&page=${page}&per_page=12&key=23161944-2a0cfa2ec118e633f18262ab9`)
    return hits;
}