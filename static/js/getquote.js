const form = document.querySelector('form');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    let org = "";
    if (form.organization.value) {
        org = form.organization.value
    }
    const subject = form.subject.value;
    const body = form.body.value;

    const res = await fetch(("/sendquote"), {
        method: "POST",
        body: JSON.stringify({ name, email, subject, body, org, phone }),
        headers: { 'Content-Type': "application/json" }
    })

    let data = await res.json();
    data = JSON.parse(data)
    if (data.bool) {
        prompt("Sent to Admin")
        location.assign('/getquote');
    }
    else {
        alert("Something went wrong")
    }
})
