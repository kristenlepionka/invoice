
import './style.css'

document.querySelector('#app').innerHTML = `
<div class="app-toolbar">
  <button type="button" id="download-pdf" class="download-button">
    <span aria-hidden="true">↓</span>
    Download PDF
  </button>
</div>
  <main class="invoice">
    <header class="invoice-header">
      <h1>Invoice</h1>

      <div class="studio-info">
        <h2 contenteditable="true" spellcheck="false">Studio Name</h2>
        <p><span contenteditable="true" spellcheck="false">hello@reallygreatsite.com</span></p>
        <p><span contenteditable="true" spellcheck="false">+123-456-7890</span></p>

        <div class="invoice-details">
          <p>
            <strong>
              Invoice No.
              <span contenteditable="true" spellcheck="false">11254</span>
            </strong>
          </p>
          <p>
            Invoice date:
            <span contenteditable="true" spellcheck="false">20 October 2026</span>
          </p>
          <p>
            Due on:
            <span contenteditable="true" spellcheck="false">03 November 2026</span>
          </p>
        </div>
      </div>
    </header>

    <section class="billing">
      <div>
        <h3>Billed to:</h3>
        <p contenteditable="true">Client name</p>
        <p contenteditable="true" spellcheck="false">email@mail.com</p>
      </div>

      <div class="billing-address">
        <p contenteditable="true" spellcheck="false">
          123 Anywhere St, Any City, ST 12345
        </p>
        <p contenteditable="true" spellcheck="false">+123-456-7890</p>
      </div>
    </section>

    <section class="items">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td contenteditable="true">Copy Writing</td>
            <td>
              <div class="rate-field">
                <span>$</span>
                <input class="number-input rate-input"
                  type="number" value="50" min="0" step="0.01">
              </div>
            </td>
            <td>
              <input class="number-input quantity-input"
                type="number" value="5" min="0" step="any">
            </td>
            <td class="line-total">
              <span class="amount">$250</span>
              <button type="button" class="remove-item"
                aria-label="Remove item">×</button>
            </td>
          </tr>

          <tr>
            <td contenteditable="true">Website Design</td>
            <td>
              <div class="rate-field">
                <span>$</span>
                <input class="number-input rate-input"
                  type="number" value="100" min="0" step="0.01">
              </div>
            </td>
            <td>
              <input class="number-input quantity-input"
                type="number" value="15" min="0" step="any">
            </td>
            <td class="line-total">
              <span class="amount">$1500</span>
              <button type="button" class="remove-item"
                aria-label="Remove item">×</button>
            </td>
          </tr>

          <tr>
            <td contenteditable="true">Website Development</td>
            <td>
              <div class="rate-field">
                <span>$</span>
                <input class="number-input rate-input"
                  type="number" value="100" min="0" step="0.01">
              </div>
            </td>
            <td>
              <input class="number-input quantity-input"
                type="number" value="10" min="0" step="any">
            </td>
            <td class="line-total">
              <span class="amount">$1000</span>
              <button type="button" class="remove-item"
                aria-label="Remove item">×</button>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="button" id="add-item" class="editor-button">
        <span class="button-icon">+</span> Add item
      </button>

      <div class="totals">
        <div>
          <strong>Subtotal</strong>
          <span id="subtotal">$2750</span>
        </div>

        <div>
          <strong>Tax (0%)</strong>
          <span id="tax-amount">$0</span>
        </div>

        <div class="grand-total">
          <strong>Grand Total</strong>
          <strong id="grand-total">$2750</strong>
        </div>
      </div>
    </section>

    <div class="payment-editor">
      <button type="button" id="edit-payments" class="editor-button"
        aria-expanded="false" aria-controls="payment-options">
        <span class="button-icon">⚙</span> Payment options
      </button>

      <div id="payment-options" class="payment-options" hidden>
        <label>
          <input type="checkbox" data-method="check" checked>
          Accept checks
        </label>
        <label>
          <input type="checkbox" data-method="bank" checked>
          Bank transfer
        </label>
        <label>
          <input type="checkbox" data-method="online" checked>
          Pay online
        </label>
      </div>
    </div>

    <section class="payments">
      <div class="payment-methods">
        <h3>Payment Methods</h3>

        <div class="payment-check">
          <p>Check</p>
        </div>

        <div class="payment-bank">
          <p>Bank transfer</p>
          <p class="indent">
            Account
            <span contenteditable="true" spellcheck="false">#000000000000</span>
          </p>
          <p class="indent">
            Routing
            <span contenteditable="true" spellcheck="false">#000000000</span>
          </p>
        </div>

        <div class="payment-online">
          <p>
            Pay Online:
            <span contenteditable="true" spellcheck="false">[URL]</span>
          </p>
        </div>
      </div>

      <div class="payment-mail">
        <h3>Pay by Mail</h3>
        <p>
          Checks payable to:
          <span contenteditable="true">Payment Name</span>
        </p>
        <p contenteditable="true">
          123 Anywhere St, Any City, ST 12345
        </p>
      </div>
    </section>
  </main>
`

// Format currency
function formatMoney(amount) {
  return '$' + amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

// Calculate line items and totals
function updateTotals() {
  let subtotal = 0

  document.querySelectorAll('.items tbody tr').forEach(row => {
    const rate = Number(row.querySelector('.rate-input').value) || 0
    const quantity = Number(row.querySelector('.quantity-input').value) || 0
    const lineTotal = rate * quantity

    subtotal += lineTotal

    row.querySelector('.amount').textContent = formatMoney(lineTotal)
  })

  const taxRate = 0
  const tax = subtotal * taxRate / 100

  document.querySelector('#subtotal').textContent = formatMoney(subtotal)
  document.querySelector('#tax-amount').textContent = formatMoney(tax)
  document.querySelector('#grand-total').textContent =
    formatMoney(subtotal + tax)
}

const tbody = document.querySelector('.items tbody')

// Recalculate when rates or quantities change
tbody.addEventListener('input', updateTotals)

// Add a line item
document.querySelector('#add-item').addEventListener('click', () => {
  const newRow = document.createElement('tr')

  newRow.innerHTML = `
    <td contenteditable="true">Item name</td>
    <td>
      <div class="rate-field">
        <span>$</span>
        <input class="number-input rate-input"
          type="number" value="0" min="0" step="0.01">
      </div>
    </td>
    <td>
      <input class="number-input quantity-input"
        type="number" value="1" min="0" step="any">
    </td>
    <td class="line-total">
      <span class="amount">$0</span>
      <button type="button" class="remove-item"
        aria-label="Remove item">×</button>
    </td>
  `

  tbody.appendChild(newRow)
  updateTotals()
  newRow.querySelector('[contenteditable]').focus()
})

// Remove a line item
tbody.addEventListener('click', event => {
  const button = event.target.closest('.remove-item')

  if (button) {
    button.closest('tr').remove()
    updateTotals()
  }
})

// Toggle payment options panel
const paymentButton = document.querySelector('#edit-payments')
const paymentOptions = document.querySelector('#payment-options')

paymentButton.addEventListener('click', () => {
  paymentOptions.hidden = !paymentOptions.hidden
  paymentButton.setAttribute(
    'aria-expanded',
    String(!paymentOptions.hidden)
  )
})

// Show selected payment methods
function updatePaymentMethods() {
  const selected = {}

  document.querySelectorAll('[data-method]').forEach(checkbox => {
    selected[checkbox.dataset.method] = checkbox.checked
  })

  document.querySelector('.payment-check').hidden = !selected.check
  document.querySelector('.payment-bank').hidden = !selected.bank
  document.querySelector('.payment-online').hidden = !selected.online
  document.querySelector('.payment-mail').hidden = !selected.check

  const hasMethods = selected.check || selected.bank || selected.online

  document.querySelector('.payments').hidden = !hasMethods

  document.querySelector('.payments').classList.toggle(
    'single-column',
    !selected.check
  )
}

document.querySelectorAll('[data-method]').forEach(checkbox => {
  checkbox.addEventListener('change', updatePaymentMethods)
})

// Initialize
updateTotals()
updatePaymentMethods()
function resizeRateInput(input) {
  const length = input.value.length || 1
  input.style.width = `${length + 0.5}ch`
}

document.querySelector('.items tbody').addEventListener('input', event => {
  if (event.target.matches('.rate-input')) {
    resizeRateInput(event.target)
  }
})

document.querySelectorAll('.rate-input').forEach(resizeRateInput)

document.querySelector('#download-pdf').addEventListener('click', () => {
  window.print()
})