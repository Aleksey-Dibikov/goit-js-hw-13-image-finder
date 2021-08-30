import { form, list, loadMore } from './js/refs';
import { fetchImg } from './js/apiService';
import gallaryTmpl from './templates/gallary.hbs';
import './css/style.css';
import * as basicLightbox from 'basiclightbox'


const state = {
    query: '',
    page: 1,
}

loadMore.style.visibility = 'hidden';

form.addEventListener('submit', onSubmitForm);
loadMore.addEventListener('click', onClickLoadMore);
list.addEventListener('click', openModal);


async function onSubmitForm(e) {
    e.preventDefault();
    state.page = 1;
    if (!e.currentTarget.elements.query.value.trim()) {
        return;
    }
    loadMore.style.visibility = 'hidden';
    state.query = e.currentTarget.elements.query.value.trim();
    const data = await fetchImg(state.query, state.page);
    list.innerHTML = gallaryTmpl(data);
    if (data.length > 11) {
        loadMore.style.visibility = 'visible';
    }
}

async function onClickLoadMore() {
    state.page += 1;
    const data = await fetchImg(state.query, state.page);
    list.insertAdjacentHTML('beforeend', gallaryTmpl(data));
    if (data.length > 12) {
        loadMore.style.visibility = 'hidden';
    }
    list.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function openModal(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    basicLightbox.create(`<img src="${e.target.dataset.src}" width="800" height="600">`).show()
}