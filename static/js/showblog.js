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

let replylink = document.getElementsByClassName('reply');
// let replyform = document.getElementsByClassName('replyform');
let replyform2 = document.getElementsByClassName("repform"); 

let flag = false;
for (let i = 0; i < replylink.length; i++) {
    replylink[i].addEventListener('click', (e) => {
        e.preventDefault();
        if (!flag) {
            replyform2[i].style.display = "flex";
            flag = true;
        }
        else {
            replyform2[i].style.display = "none";
            flag = false;
        }

        replyform2[i].addEventListener('submit',async(e)=>{
            e.preventDefault();

            let comment_id = replyform2[i].comment_id.value;
            let blog_id = replyform2[i].blog_id.value;
            let reply = replyform2[i].reply.value;
            let username = replyform2[i].username.value;

            const res = await fetch("/blog/reply",{
                method:"POST",
                body: JSON.stringify({comment_id , blog_id , reply, username}),
                headers: {"Content-Type": "application/json"}
            })
            const id = document.getElementById("id").value
            const data = await res.json();

            if(data){
                location.assign(`/blog/${id}`);
            }
            else{
                console.log("error");
            }
        })

    })


}