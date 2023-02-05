const form = document.querySelector("form");
const userid = document.getElementById("userid").value


form.addEventListener("submit", async (e) => {

    e.preventDefault();
    const para = document.getElementById('notUser');
    if (userid != '') {
        console.log(userid);
        para.innerText = "";
        const id = document.getElementById("id").value
        const data = form.comment.value
        const username = form.username.value

        const res = await fetch('/blog/comment', {
            method: "POST",
            body: JSON.stringify({ id: id, data: data, username: username }),
            headers: { 'Content-Type': "application/json" }
        })

        let bool = await res.json();
        bool = JSON.parse(bool);

        console.log(bool);
        if (bool) {
            location.assign(`/blog/${id}`);
        }
    }
    else {
        setTimeout(() => {
            para.innerText = "";
        }, 1000);
        para.innerText = "Please Login First";
        // location.assign("/login");
    }
})
