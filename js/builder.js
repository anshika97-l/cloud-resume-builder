const RESUME_API_URL =
"https://8dfqpe2qbl.execute-api.us-east-1.amazonaws.com/dev/resume";

const form = document.querySelector("form");
const previewBtn = document.getElementById("previewBtn");

// ---------------- Save Resume ----------------

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const resume = {

        resumeID: Date.now().toString(),

        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        linkedin: document.getElementById("linkedin").value,
        github: document.getElementById("github").value,
        summary: document.getElementById("summary").value,
        skills: document.getElementById("skills").value,
        project: document.getElementById("project").value

    };

    // Save locally
    localStorage.setItem("resume", JSON.stringify(resume));

    try {

        const response = await fetch(RESUME_API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(resume)

        });

        if (response.ok) {
            alert("Resume Saved Successfully!");
        } else {
            alert("Resume saved locally.");
        }

    } catch (error) {

        console.error(error);

        alert("Resume saved locally.");

    }

});

// ---------------- Preview ----------------

previewBtn.addEventListener("click", () => {

    const resume = {

        resumeID: Date.now().toString(),

        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        linkedin: document.getElementById("linkedin").value,
        github: document.getElementById("github").value,
        summary: document.getElementById("summary").value,
        skills: document.getElementById("skills").value,
        project: document.getElementById("project").value

    };

    localStorage.setItem("resume", JSON.stringify(resume));

    window.location.href = "template-selection.html";

});