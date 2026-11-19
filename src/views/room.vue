<script setup>
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('panorama-container')
  if (!container) return

  //panorama size + ratio berekenen want die is vaak nodig om andere dingen te berekenen
  //hoe de window ook resizes, image blijft deze verhoudingen behouden.
  const ORIGINAL_IMAGE_WIDTH = 12441
  const ORIGINAL_IMAGE_HEIGHT = 2605
  const ORIGINAL_IMAGE_RATIO = ORIGINAL_IMAGE_WIDTH / ORIGINAL_IMAGE_HEIGHT // Approx 4.776

  //de hotspots hotspot id, horizontal position (0-1), vertical pos (0-1), original width, original height
  const hotspots = [
    ['hotspot-logout', 0.07, 0.6, 646, 268],
    ['welcome-title', 0.17, 0.1],

    //categories
    ['hotspot-books', 0.275, 0.34, 612, 437],
    ['hotspot-music', 0.3715, 0.68, 576, 579],
    ['hotspot-series', 0.757, 0.305, 480, 428],
    ['hotspot-movies', 0.7134, 0.28, 494, 335],
    ['hotspot-podcasts', 0.94, 0.54, 634, 191],
    ['hotspot-articles', 0.2, 0.7, 1039, 512],
    ['hotspot-videos', 0.733, 0.43, 479, 412],
    ['hotspot-recipes', 0.031, 0.17, 484, 352],
    ['hotspot-diary', 0.52, 0.65, 404, 177],
  ]

  // ---------------------------------------------------

  //current x is horizontal position van panorama img
  let isDragging = false
  let startX = 0 //waar muis was toen begon met slepen
  let currentX = 0 // hoeveel pixels is panorama verschoven (neg =  links, pos = naar rechts)
  let imageWidthPixels = 0 //hoe breed is de panorama nu op het scherm (verandert als window resizet)
  let hasDragged = false
  let dragThreshold = 5 //minimale beweging om als drag te tellen

  // --- dimension Calculation and Recalibration ---
  function recalculateDimensions() {
    if (!container) return

    //huidige hoogte van container
    const currentScaledHeight = container.offsetHeight

    //bereken hoe breed panorama nu is
    imageWidthPixels = ORIGINAL_IMAGE_RATIO * currentScaledHeight
    //eg. sscherm is 1000px height: width = die ratio (4.776ish) * 1000. image behoudt dus zelfde verhouding (wordt niet
    //raar gestretchd oid)

    //check of berekening gelukt is
    if (imageWidthPixels <= 0) {
      console.error('Failed to calculate scaled image width.')
      return
    }

    //alle hotspots opnieuw positioneren na rescalen
    updateHotspots()
  }

  //--------------------------

  function updateHotspots() {
    const currentOffsetRatio = -currentX / imageWidthPixels
    const containerHeight = container.offsetHeight //huidige hoogte container
    const scaleFactor = containerHeight / ORIGINAL_IMAGE_HEIGHT
    //bv 800px hoog / origineel 2605px = 0.307 -> 30.7% van het origineel

    //loop door alle hotspots
    hotspots.forEach((hotspotData) => {
      const [id, imgPosRatio, verticalRatio, origWidth, origHeight] = hotspotData
      const hotspotEl = document.getElementById(id)
      if (!hotspotEl) return

      // alleen grootte aanpassen als er dimensies zijn opgegeven (dus niet voor text elementen)
      if (origWidth && origHeight) {
        //bereken nieuwe grootte met de scalefactor
        const scaledWidth = origWidth * scaleFactor
        const scaledHeight = origHeight * scaleFactor
        hotspotEl.style.width = `${scaledWidth}px`
        hotspotEl.style.height = `${scaledHeight}px`
      }

      // gebruik de echte width voor berekeningen (of 0 als het een text element is)
      //is later nodig om te weten of een hotspot moet verplaatsen
      const elementWidth = hotspotEl.offsetWidth || 0

      // calculate horizontal position
      let hotspotPixelPosition = imgPosRatio * imageWidthPixels
      //bv ->0.07 (7% van links) * huidige breedte panorama bv 3820px = 267px
      let screenPixelPosition = hotspotPixelPosition + currentX
      //stel 500px naar links gesleept -> currentx = -500
      //screelpixelpos = 267 + -500 = -233 (-233px links buitenbeeld)

      //Handle wrap-around
      //te ver links
      //-233px < elementwidth bv - 200px -> ja? helemaal buitenbeeld dus teleporteer naar rechterkant
      if (screenPixelPosition < -elementWidth) {
        screenPixelPosition += imageWidthPixels
      }

      //te ver rechts
      //andersom, kijken of de linkerkant van de hotspot rechts buitenbeeld is
      if (screenPixelPosition > imageWidthPixels) {
        screenPixelPosition -= imageWidthPixels
      }

      //als screenPixelPosition > -elementWidth -> hotspot is niet volledig links buiten beeld
      //als screenPixelPosition < container.offsetWidth -> hotsport begint niet rechts buiten beeld
      //if beide waar -> toon hotspot
      if (screenPixelPosition > -elementWidth && screenPixelPosition < container.offsetWidth) {
        hotspotEl.style.display = 'block'

        //bereken verticale positie
        const verticalPosition = verticalRatio * containerHeight

        //eerst verplaatsen naar berekende positie
        //verschuif de hotspot terug met de helft van zn eigen grootte
        //hierdoor wordt de hotspot gecentreert op opgegeven positie
        hotspotEl.style.transform = `translate(${screenPixelPosition}px, ${verticalPosition}px) translate(-50%, -50%)`
      } else {
        //niet zichtbaar -> verberg hotspot
        hotspotEl.style.display = 'none'
      }
    })
  }

  function render() {
    // if (!isDragging) return;

    //verschuif background image horizontaal
    container.style.backgroundPositionX = `${currentX}px`

    //currentx blijft altijd binnen bepaald bereik voor endless loopingggg
    //dit werkt omdat background-repeat: repeat-x
    if (currentX < -imageWidthPixels) {
      currentX += imageWidthPixels
    } else if (currentX > 0) {
      currentX -= imageWidthPixels
    }

    //update hotspots mmet nieuwe currentX
    updateHotspots()

    //while dragging worden de hotspots steeds geupdate zodat ze meebewegen en de achtergrond beweegt
    // if (isDragging) {
    //     requestAnimationFrame(render);
    // }
  }

  // ------------ event handlers -----------------------
  const dragStart = (e) => {
    //checken of window geresized is sinds vorige keer
    recalculateDimensions()

    //start de loop in render
    isDragging = true
    hasDragged = false

    //e.clientx mousepositie, anders e.touches voor posititie vinger
    startX = e.clientX || (e.touches ? e.touches[0].clientX : 0)
    container.style.cursor = 'grabbing'

    //loop in render while dragging = true
    requestAnimationFrame(drag)
  }

  const dragMove = (e) => {
    //als user niet sleept, doe dan niks
    if (!isDragging) return
    e.preventDefault()

    //huidige muis/vinger pos
    const currentClientX = e.clientX || (e.touches ? e.touches[0].clientX : 0)

    //hoeveel pixels is muis bewogen sinds vorige frame
    const deltaX = currentClientX - startX

    //check of genoeg beweging is voor een drag
    //math abs = absolute waarde
    if (Math.abs(deltaX) > dragThreshold) {
      hasDragged = true
    }

    //voeg beweging px toe aan current x
    currentX += deltaX

    //update startx
    //want verschil wil je berekenen vanaf vorige positie
    startX = currentClientX
  }

  const dragEnd = () => {
    if (isDragging) {
      isDragging = false //stopt render loop
      container.style.cursor = 'grab'
    }
  }

  function drag() {
    if (!isDragging) return

    render()
    requestAnimationFrame(drag)
  }

  function startScroll() {
    if (!keyPressed) return

    currentX += keyDirection * 10
    render()

    requestAnimationFrame(startScroll)
  }

  // --------------  Initialization & Event Listeners ---

  // initial load -> calculate dimensions
  //want browser heeft wat tijd nodig om css en images te laden, te vroeg berekenen kunnen de dimensions nog 0 zijn

  setTimeout(() => {
    recalculateDimensions()
    const savedPosition = sessionStorage.getItem('panoramaPosition')
    if (savedPosition !== null) {
      currentX = parseFloat(savedPosition)
      render()
      sessionStorage.removeItem('panoramaPosition')
    }
  }, 100)

  //Resize Listener -> luistetr naar wanneer het browser window van grootte verandert en recalculates dimensions
  //resize event gebeuren 10x p/s tijdens resizen en anders wordt recalculate dimensions vet vaak aangeroepen
  //vandaar de timer, zodat er even wordt gewacht tot user klaar is
  window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer)
    window.resizeTimer = setTimeout(recalculateDimensions, 200)
  })

  // mouse listeners
  container.addEventListener('mousedown', dragStart)
  document.addEventListener('mousemove', dragMove)
  document.addEventListener('mouseup', dragEnd)

  let keyPressed = false
  let keyDirection = 0 //-1=afbeelding naar links 1=rechts

  //arrow listeners
  document.addEventListener('keydown', (event) => {
    //geen dubbele triggers
    if (event.repeat) {
      return
    }

    switch (event.key) {
      case 'ArrowLeft':
        keyDirection = 1
        keyPressed = true
        startScroll()
        break
      case 'ArrowRight':
        keyDirection = -1
        keyPressed = true
        startScroll()
        break
    }
  })

  document.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        keyPressed = false
        keyDirection = 0
        break
      case 'ArrowRight':
        keyPressed = false
        keyDirection = 0
        break
    }
  })

  //touch listeners
  container.addEventListener(
    'touchstart',
    (e) => {
      //only start dragging if not touching hotspot
      if (!e.target.closest('.hotspot')) {
        dragStart(e)
        e.preventDefault() //stopt default browser dingen (bv, proberen scroller, text selecteren oid)
      }
    },
    { passive: false },
  )

  document.addEventListener(
    'touchmove',
    (e) => {
      if (isDragging) {
        dragMove(e)
        e.preventDefault()
      }
    },
    { passive: false },
  )

  document.addEventListener('touchend', () => {
    if (isDragging) {
      //als user vinger optilt en dragging true is
      dragEnd()
    }
  })

  //click/tap prevention when dragging
  //niet perongeluk hotspots klikken tijdens slepen
  //queryselectorall zoekt alle elementen met class hotspot en loopt daar doorheen
  //e.screenX !== 0 && e.screenY !== 0 zorgt ervoor dat keyboard clicks (die hebben screenX en screenY= 0) niet geblocked worden
  document.querySelectorAll('.hotspot').forEach((hotspot) => {
    hotspot.addEventListener('click', (e) => {
      if (hasDragged && e.screenX !== 0 && e.screenY !== 0) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        //positie opslaan
        sessionStorage.setItem('panoramaPosition', currentX)
      }
    })

    hotspot.addEventListener('touchend', (e) => {
      if (hasDragged) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        sessionStorage.setItem('panoramaPosition', currentX)
      }
    })
  })
})
</script>

<template>
  <div id="panorama-container">
    <a href="/category/recipes" class="hotspot fixed-size-hotspot" id="hotspot-recipes">
      <img src="/src/assets/photos/room/recipes.png" alt="recipes" />
    </a>

    <a href="/logout" class="hotspot fixed-size-hotspot" id="hotspot-logout">
      <img src="/src/assets/photos/room/logout.png" alt="logout" />
    </a>

    <a href="/category/articles" class="hotspot fixed-size-hotspot" id="hotspot-articles">
      <img src="/src/assets/photos/room/articles.png" alt="notes for article category" />
    </a>

    <a href="/category/books" class="hotspot fixed-size-hotspot" id="hotspot-books">
      <img src="/src/assets/photos/room/books.png" alt="notes for book category" />
    </a>

    <a href="/category/music" class="hotspot fixed-size-hotspot" id="hotspot-music">
      <img src="/src/assets/photos/room/music.png" alt="notes for music" />
    </a>

    <a href="/category/diary" class="hotspot fixed-size-hotspot" id="hotspot-diary">
      <img src="/src/assets/photos/room/diary.png" alt="diary" />
    </a>

    <a href="/category/movies" class="hotspot fixed-size-hotspot" id="hotspot-movies">
      <img src="/src/assets/photos/room/films.png" alt="notes for movies" />
    </a>

    <a href="/category/series" class="hotspot fixed-size-hotspot" id="hotspot-series">
      <img src="/src/assets/photos/room/shows.png" alt="notes for shows" />
    </a>

    <a href="/category/videos" class="hotspot fixed-size-hotspot" id="hotspot-videos">
      <img src="/src/assets/photos/room/videos.png" alt="notes for videos" />
    </a>

    <a href="/category/podcasts" class="hotspot fixed-size-hotspot" id="hotspot-podcasts">
      <img src="/src/assets/photos/room/podcasts.png" alt="notes for podcasts" />
    </a>
  </div>
</template>

<style scoped>
#panorama-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* hides scrollbar */
  position: relative;
  z-index: 1;

  background-image: url('src/assets/photos/room/blue_jpeg.jpg'); /* set the single image as a background */
  background-repeat: repeat-x; /* allows the image to seamlessly loop */
  background-size: auto 100vh; /* scale the image height to fit the viewport */
  background-position-x: 0; /* Position controlled by JS */

  cursor: grab;
}

/* ------------ hotspots --------- */
.hotspot {
  position: absolute;
  z-index: 5;
  transition: none;
  will-change: transform;
  color: white;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
}

.fixed-size-hotspot {
  border: none;
}

.fixed-size-hotspot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: auto; /* Allow clicks/touches */
}

.hotspot:hover,
.hotspot:focus-visible {
  filter: grayscale(100%) sepia(100%) hue-rotate(270deg) saturate(3);
  /*transition: filter 0.2s ease;*/
}
</style>
