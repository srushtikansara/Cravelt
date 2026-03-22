// ---------- TOAST ----------
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---------- EMAIL CHECK ----------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    const username = loginForm.querySelector("input[name='username']");
    const password = loginForm.querySelector("input[name='password']");

    if (username.value.trim() === "") {
      e.preventDefault();
      showToast("Username is required");
      return;
    }

    if (password.value.trim() === "") {
      e.preventDefault();
      showToast("Password is required");
      return;
    }

    // success (let form submit)
  });
}

// ================= SIGN-UP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    const name = signupForm.querySelector("input[name='fullname']");
    const email = signupForm.querySelector("input[name='email']");
    const password = signupForm.querySelector("input[name='password']");
    const confirm = signupForm.querySelector("input[name='confirmpassword']");
    const location = signupForm.querySelector("input[name='location']");

    if (name.value.trim() === "") {
      e.preventDefault();
      showToast("Full name is required");
      return;
    }

    if (!isValidEmail(email.value)) {
      e.preventDefault();
      showToast("Enter a valid email");
      return;
    }

    if (password.value.length < 6) {
      e.preventDefault();
      showToast("Password must be at least 6 characters");
      return;
    }

    if (password.value !== confirm.value) {
      e.preventDefault();
      showToast("Passwords do not match");
      return;
    }

    if (location.value.trim() === "") {
      e.preventDefault();
      showToast("Location is required");
      return;
    }

    // success (let form submit)
  });
}
