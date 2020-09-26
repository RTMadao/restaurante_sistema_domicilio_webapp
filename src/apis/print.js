export function printSection (el, binding) {
  // insertar css especial para la impresión, esto mostrar un contenedor especial y ocultara el resto de contenido
  const style = document.createElement('style')
  style.type = 'text/css'
  style.appendChild(document.createTextNode('@media screen{#printSection{display:none;}}@page{size:300px 400px}@media print{#printSection,body{overflow:visible!important;}body *{visibility:hidden;display:none;}#printSection,#printSection *{visibility:visible;display:block;}#printSection{position:absolute;left:0;top:0;right:0}#printSection tbody{display:table;}#printSection tr{display:table-row;}#printSection td,#printSection th{display:table-cell;}}'))
  document.body.appendChild(style)

  // busco si existe mi sección para imprimir
  let printSection = document.getElementById('printSection')
  // si no existe la creo y la inserto en el body
  if (!printSection) {
    printSection = document.createElement('div')
    printSection.id = 'printSection'
    document.body.appendChild(printSection)
  }

  // creo el evento del click para cada que se de click en imprimir
  el.addEventListener('click', () => {
    // busco el contenido a imprimir, esto ya que como parametro tenia el id
    var elemToPrint = document.getElementById(binding.value)
    // si existe el contenido entonces lo imprimiré
    console.log(elemToPrint.offsetHeight)
    style.appendChild(document.createTextNode(`@page{size:300px ${elemToPrint.offsetHeight + 50}px}`))
    if (elemToPrint) {
      printSection.innerHTML = '' // limpio el contenido anterior de mi sección a imprimir
      printElement(elemToPrint)
    }
  })

  // funcion para imprimir
  function printElement (elem) {
    // creo un nodo y lo inserto dentro de mi sección a imprimir
    const domClone = elem.cloneNode(true)
    printSection.appendChild(domClone)
    console.log(printSection)
    window.print() // mando a imprimir
  }
}
