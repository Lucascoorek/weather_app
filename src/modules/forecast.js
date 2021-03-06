export default class Forecast {
  constructor() {
    this.key = "rMp5uxAH4HIb96vWpPxJkvNJYkaopqEH";
    this.baseURI =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
    this.baseCondURI =
      "https://dataservice.accuweather.com/currentconditions/v1/";
  }
  async getLocation(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.baseURI + query);
    if (response.status !== 200) {
      throw new Error("cannot fetch data");
    }
    const data = await response.json();
    return data[0];
  }
  async getConditions(cityKey) {
    const query = `${cityKey}?apikey=${this.key}`;
    const response = await fetch(this.baseCondURI + query);
    if (response.status !== 200) {
      throw new Error("cannot fetch data");
    }
    const data = await response.json();
    return data[0];
  }
  async updateCity(city) {
    const location = await this.getLocation(city);
    const conditions = await this.getConditions(location.Key);
    return { location, conditions };
  }
}
