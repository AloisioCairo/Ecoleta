/* - - - - - - -  Aula 2 - Busca os estados no site do IBGE  - - - - - - -  */
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then( res => res.json())
      .then( states => {
        for (const state of states) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
      })
  }

populateUFs()

/* - - - - - - -  Aula 2 - Busca as cidades no site do IBGE baseado no estado selecionado - - - - - - -  */
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option Value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {  
        for (const city of cities) {
          citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)




// - - - - - - - Aula 3 -  Itens da coleta - Pegar todos os li's - - - - - - - 
const itemsToCollect = document.querySelectorAll(".items-grid li")

for ( const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]") // Seleciona o componente no html
let selectedItems = []

function handleSelectedItem (event) {
  const itemLi = event.target

  // Adicionar ou remover uma classe com JS
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // Verificar se existe itens selecionados. Se sim, pegar os itens selecionados
  const alreadySelecterd = selectedItems.findIndex(item => {
    const itemFound = item == itemId // Isso será true ou false
    return itemFound
  })

  // Se já estiver selecionado
  if (alreadySelecterd >= 0) {
    // tirar a seleção
    const filteredItems = selectedItems.filter(item => {
      const itemsIsDifferent = item != itemId // false
      return itemsIsDifferent
    })

    selectedItems = filteredItems
  }
  else {
    // Se não estiver selecionado, adicionar a seleção
    selectedItems.push(itemId)
  }

  console.log(selectedItems)
  
  // Atualizar o campo escondido com os itens selecionado
  collectedItems.value = selectedItems
}
    