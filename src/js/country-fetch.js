export default class CountriesApi {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const filters = ['name', 'capital', 'population', 'flags', 'languages'];
    const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=${filters}`;
    return fetch(url)
      .then(r => r.json())
      .then(arr => {
        return arr;
      });
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
