async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url_input').value;
    const validUrl= Client.checkForName(formText);
    console.log("::: Form Submitted :::")
    // Form validation
    if(!validUrl){
        alert('Invalid Url');
        return
    }

    const params = JSON.stringify({'url': formText})

    console.log("::: Form Submitted Valid :::")
    console.log("Body: " + formText)
    console.log("Params: "+params)
    await fetch('http://localhost:8080/results', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: params,
    })
    .then(res => res.json())
    .then(function(res){
        console.log(res)
        document.getElementById('polarity').innerHTML = `<p>Polarity: ${res.polarity}</p>`;
        document.getElementById('subjectivity').innerHTML = `<p>Subjectivity: ${res.subjectivity}</p>`;
        document.getElementById('confidence').innerHTML = `<p>Polarity confidence: ${res.confidence}</p>`;
        document.getElementById('text').innerHTML = `<p>Text: ${res.text}</p>`;
    })
}

export { handleSubmit }
