(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  
  let priceToggle = document.querySelector(".form-check-input");
            
  priceToggle.addEventListener("click", () => {
      let gsts = document.querySelectorAll("#GST");
      let prices = document.querySelectorAll("#price");

      for (let gst of gsts) {
          if (gst.style.display != "inline") {
              gst.style.display = "inline";
          } else {
              gst.style.display = "none";
          }
      }

      for (let pr of prices) {
          if (pr.style.display != "none") {
              pr.style.display = "none";
          } else {
              pr.style.display = "inline";
          }
      }
  }); 
