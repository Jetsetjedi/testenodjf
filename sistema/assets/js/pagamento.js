// import { loadMercadoPago } from "@mercadopago/sdk-js";



(function ($) {
  "use strict";
  const mp = new MercadoPago("TEST-df2b8a8d-4a61-420e-aa2f-e1ea57e8c376");
   
  const cardNumberElement = mp.fields.create('cardNumber', {
    placeholder: "Card Number"
  }).mount('cardNumber');
  
  const expirationDateElement = mp.fields.create('expirationDate', {
    placeholder: "MM/YY",
  }).mount('expirationDate');
  
  const securityCodeElement = mp.fields.create('securityCode', {
    placeholder: "Security Code"
  }).mount('securityCode');
   
  
  (async function getIdentificationTypes() {
    try {
      const identificationTypes = await mp.getIdentificationTypes();

      const identificationTypeElement = document.getElementById('docType');

      createSelectOptions(identificationTypeElement, identificationTypes);

    } catch (e) {
      return console.error('Error getting identificationTypes: ', e);
    }
})(

  function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {

    const { label, value } = labelsAndKeys;

    heem.options.length = 0;

    const tempOptions = document.createDocumentFragment();

    options.forEach(option => {
      const optValue = option[value];
      const optLabel = option[label];

      const opt = document.createElement('option');
      opt.value = optValue;
      opt.textContent = optLabel;

      tempOptions.appendChild(opt);
    });

    elem.appendChild(tempOptions);
}
);   
cardNumberElement.on('binChange', getPaymentMethods);


})(jQuery);
async function getPaymentMethods(data) {
  const { bin } = date
  const { results } = await mp.getPaymentMethods({ bin });
      // The payment id will be in results[0].id
    console.log(results)
}