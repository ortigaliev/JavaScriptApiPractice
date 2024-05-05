
class Currency {
  //Odatda valyutalar nimdan tashkil topgan bo'ladi.
  //Albatta uning code USD, EUR, SUM  va $ uning qiymati
  #code;
  #rate;

  //Constructorni ichida bularni qabul qilib olib
  //yuqoridagi privite atributelarga set qilib chiqami.
  constructor(code, rate) {
    this.#code = code;
    this.#rate = rate;
  }
  get code() {
    return this.#code;
  }
  get rate() {
    return this.#rate;
  }
  display(container){
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${this.code}</td>
        <td>${this.rate}</td>
    `;
    container.appendChild(tr);

  }
}

class App {
  #list; //atribute
  #currencies; //

  constructor() {
    this.#init();//boshqa bir funcsiya chaqiramiz
  }

  async #init() { //backendga so'rov jo'natish uchun async dan foydalandik
    this.#list = document.getElementById('table-body');//birinchi navbatda listimizni topib olamiz
    const response = await fetch('https://api.frankfurter.app/latest?from=USD');//backendga request jo'natamiz
    const result = await response.json();//json ga o'tkazamiz
    this.#transformResult(result);//valuta kursi biz hohlagan yani Array ko'rinishida bo'lmagani uchun Array ko'rinishiga o'tkazib olamiz. Json qilib o'tkazgan nimizni transformga argument sifatida berib yuboramiz.
    this.#renderCurrencies();
  }

  #transformResult(result) {
    const {base, amount, rates} = result;
    const baseCurrency = new Currency(base, amount);
    const otherCurrencies = Object.entries(rates).map(([code, rate]) => new Currency(code, rate));
    this.#currencies = [baseCurrency, ...otherCurrencies];
    console.log(this.#currencies);
  }

  #renderCurrencies() {
    this.#currencies.forEach(currency => currency.display(this.#list));//har bir currencyni display funcsiyasini chaqiramiz 
  }
}
new App();