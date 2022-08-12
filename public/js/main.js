// HANDLING DELETES:
// Collect all of the red x icons and add event listeners to them to handle the delete
const deleteButtons = document.querySelectorAll('.fa-times')
Array.from(deleteButtons).forEach((element => {
  element.addEventListener('click', deleteItem)
}))

async function deleteItem() {
  const listItem = this.parentNode.childNodes[1].innerText
  try {
    const response = await fetch('deleteItem', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'groceryItemFromJS': listItem
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.error(err)
  }
}