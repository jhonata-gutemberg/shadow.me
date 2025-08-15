const header = document.querySelector("main")
const main = document.querySelector("main")

function showArticle(article) {
    header.innerHTML = ""
    main.innerHTML = ""
    fetch(`./articles/${article}/transcripts/transcript.json`)
      .then(res => res.json())
      .then(transcript => {
        const h1 = document.createElement("h1")
        const h2 = document.createElement("h2")
        h1.innerHTML = transcript.title
        h2.innerHTML = transcript.subtitle
        header.append(h1)
        header.append(h2)

        const segments = transcript.segments
        for (let i = 0; i < segments.length; i++) {
            const segmentDiv = document.createElement("div")
            const div = document.createElement("div")
            const audio = document.createElement("audio")
            const source = document.createElement("source")

            const segment = segments[i]
            segment.sentences.forEach(sentence => {
                const p = document.createElement("p")
                p.innerHTML = sentence
                div.appendChild(p)
            })
            source.setAttribute("src", `./articles/${article}/audios/${i}.mp3`)
            audio.setAttribute("controls", true)
            audio.appendChild(source)
            segmentDiv.className = "segment"
            segmentDiv.appendChild(div)
            segmentDiv.appendChild(audio)

            main.appendChild(segmentDiv)
        }
      });
}
