

;(async function() {
  const response = await fetch(`https://placekitten.com/320/240`)
  const blob = await response.blob()

  const url = URL.createObjectURL(blob.slice(0, 40000))
  const image = new Image()
  image.src = url
  image.width="360";
  image.height="250";
  image.style.display="block";
  image.style.margin = "auto";
  document.getElementById("respuesta").appendChild(image)
  
})()


