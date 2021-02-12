
const AddressField = {
  urlIBGE: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  select_element_uf: document.querySelector('select[name=uf]'),
  select_element_city: document.querySelector('#city'),
  input_element_hidden: document.querySelector('[name=state'),

  async handleApiIBGE(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data; 
  },

  async injectUFinOptions() {
    const data = await AddressField.handleApiIBGE(AddressField.urlIBGE);

    for (let uf of data) {
      AddressField.select_element_uf.innerHTML += `<option value="${uf.id}">${uf.sigla}</option>`;
    }

  },

  async getCities(event) {
    const ufValue = event.target.value;
    const citiesUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    const data = await AddressField.handleApiIBGE(citiesUrl);

    const indexOfSelectUf = event.target.selectedIndex;

    console.log(indexOfSelectUf)

    AddressField.input_element_hidden.value = event.target.options[indexOfSelectUf].text

    for (let city of data) {
      AddressField.select_element_city.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
    }
    
    AddressField.select_element_city.disabled = false;
  },

  async init() {
    await AddressField.injectUFinOptions();

    document
      .querySelector('select[name=uf]')
      .addEventListener('change', AddressField.getCities);
  },
}

AddressField.init();

