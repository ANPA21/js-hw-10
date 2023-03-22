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

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  countriesApi.query = refs.input.value.trim();

  if (countriesApi.query === '') {
    clearList();
    return;
  }

  clearList();
  countriesApi
    .fetchCountries()
    .then(countries => {
      if (countries.length === 1) {
        drawCard(mapCountries(countries));
      } else if (countries.length > 10) {
        Notify.info(
          'Too many maches found. Please Enter a more specific name!'
        );
      } else {
        countries.map(country => {
          const countryObj = {
            name: country.name.common,
            flag: country.flags.svg,
            capital: country.capital[0],
            lang: Object.values(country.languages)[0],
            pop: country.population,
          };
          drawList(countryObj);
        });
      }
    })
    .catch(error =>
      Notify.failure('Oops, there is no country with that name!')
    );
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
function drawCard(c) {
  refs.countryInfo.insertAdjacentHTML(
    'beforeend',
    ` <div class="country-card-mediabox">
        <img src="${c.flag}" alt="Country flag" />
        <p class="country-card-title">${c.name}</p>
      </div>
      <div class="country-card-textbox">
        <p class="country-card-info">
          <span class="subtitle">Capital</span>: ${c.capital}
        </p>
        <p class="country-card-info">
          <span class="subtitle">Population</span>: ${c.pop}
        </p>
        <p class="country-card-info">
          <span class="subtitle">Languages</span>: ${c.lang}
        </p>
      </div>`
  );
}
function clearList() {
  refs.list.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
function mapCountries(arr) {
  let countryObj = {};
  arr.map(country => {
    countryObj = {
      name: country.name.common,
      flag: country.flags.svg,
      capital: country.capital[0],
      lang: Object.values(country.languages)[0],
      pop: country.population,
    };
  });
  return countryObj;
}
