const form = document.querySelector('form');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const body = form.body.value;

    const res = await fetch(("/send"), {
        method: "POST",
        body: JSON.stringify({ name, email, subject, body }),
        headers: { 'Content-Type': "application/json" }
    })

    let data = await res.json();
    data = JSON.parse(data)

    if (data.bool) {
        location.assign('/');
    }
    else {
        alert("Something went wrong")
    }
})
