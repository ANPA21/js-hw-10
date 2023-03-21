import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CountriesApi from './js/country-fetch';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('input'),
  list: document.querySelector('ul'),
  countryInfo: document.querySelector('div'),
};
const countriesApi = new CountriesApi();

refs.input.addEventListener('input', debounce(onInputChange, 300));

function onInputChange() {
  countriesApi.query = refs.input.value.trim();

  if (countriesApi.query === '') {
    return;
  }

  countriesApi.fetchCountries().then(countries => {
    // if (countries.length === 0) { ERORR / WRONG INPUT / NO RESULTS}
    // else if (countries.length === 1) { DRAW FULL COUNTRY CARD}
    // else  if (countries >10) { ERROR TOO MANY MATCHES}
    // else { DRAW LIST OF COUNTRIES}
    countries.map(country => {
      const countryObj = {
        name: country.name.official,
        flag: country.flags.svg,
        capital: country.capital[0],
        lang: Object.values(country.languages)[0],
        pop: country.population,
      };
      drawList(countryObj);
    });
  });
}

function drawList(c) {
  refs.list.insertAdjacentHTML(
    'beforeend',
    `<li class="country-list__item">
        <img src="${c.flag}" alt="Country flag">
        <p class="country-title">${c.name}</p>
      </li>`
  );
}

// Can merge with drawList(), call it smth like drawCountries(), but maybe too complex

// function mapCountries(arr) {
//   arr.map(country => {
//     const countryObj = {
//       name: country.name.official,
//       flag: country.flags.svg,
//       capital: country.capital[0],
//       lang: Object.values(country.languages)[0],
//       pop: country.population,
//     };
//     return countryObj;
//   });
// }
