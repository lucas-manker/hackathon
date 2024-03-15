document.addEventListener('DOMContentLoaded', function() {
  const pinInput = document.getElementById('pin_input');
  const submitButton = document.getElementById('submit_button');
  const resultsDiv = document.getElementById('results');

  submitButton.addEventListener('click', async function() {
    const enteredPin = pinInput.value.trim();
    // const res_design_count = await fetch(`http://localhost:3000/designCount/${enteredPin}`);
    // const res_payitems_count = await fetch(`http://localhost:3000/payItemCount/${enteredPin}`);
    // const res_missing_payitems = await fetch(`http://localhost:3000/missingPayItems/${enteredPin}`);
    // const res_inspection_count = await fetch(`http://localhost:3000/inspectionCount/${enteredPin}`);


    resultsDiv.innerHTML = '';

    // change to report what we actually want
    const resultElement = document.createElement('p');
    resultElement.textContent = `entered pin: ${enteredPin}`;
    resultsDiv.appendChild(resultElement);
  });
});
