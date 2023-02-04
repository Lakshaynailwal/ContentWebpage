const form = document.querySelector('form');
        const emailError = document.querySelector('.email.error');
        const nameError = document.querySelector('.name.error');
        const phoneError = document.querySelector('.phone.error');
        const passwordError = document.querySelector('.password.error');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            emailError.textContent = "";
            nameError.textContent = "";
            phoneError.textContent = "";
            passwordError.textContent = "";

            const email = form.email.value;
            const name = form.name.value;
            const phone = form.phone.value;
            const password = form.password.value;

            const res = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password ,name ,phone }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            console.log(data.errors);
            if (data.errors) {
                emailError.textContent = data.errors.email;
                nameError.textContent = data.name.email;
                phoneError.textContent = data.phone.email;
                passwordError.textContent = data.errors.password;
            }

            if (data.user) {
                location.assign("/");
            }

        })
