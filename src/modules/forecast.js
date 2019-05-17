export default class Forecast {
  constructor() {
    this.key = "XMKlXO38GCuOsGonhqG3wSrL6MTCScQr";
    this.baseURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async getLocation(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.baseURI + query);
    const data = await response.json();
    console.log(data);
  }
}
