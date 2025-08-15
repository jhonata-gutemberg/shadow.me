const main = document.querySelector("main")
fetch('./scripts/segments.json')
  .then(res => res.json())
  .then(data => {
    data.segments.forEach(segment => {
        const segmentDiv = document.createElement("div")
        const div = document.createElement("div")
        const firstSentence = document.createElement("p")
        const secondSentence = document.createElement("p")
        const audio = document.createElement("audio")
        const source = document.createElement("source")

        firstSentence.innerHTML = "\"" + segment.firstSentence
        secondSentence.innerHTML = segment.secondSentence + "\""
        div.appendChild(firstSentence)
        div.appendChild(secondSentence)
        source.setAttribute("src", "./audio-segments/01.mp3")
        audio.setAttribute("controls", true)
        audio.appendChild(source)
        segmentDiv.className = "segment"
        segmentDiv.appendChild(div)
        segmentDiv.appendChild(audio)

        main.appendChild(segmentDiv)
    })
  });
