// =============================
// Resume Preview
// =============================

window.addEventListener("DOMContentLoaded", async () => {

    // ---------- Template ----------

    const selectedTemplate =
        localStorage.getItem("selectedTemplate") || "classic";

    const body = document.getElementById("previewBody");

    if (body) {
        body.className = "";
        body.classList.add(selectedTemplate);
        console.log("Selected Template:", selectedTemplate);
    }

    // ---------- Resume Data ----------

    let resume = null;

    try {

        const response = await fetch(
            "https://t8c6reufha.execute-api.us-east-1.amazonaws.com/dev/getResume"
        );

        const apiResponse = await response.json();

        console.log("API Response:", apiResponse);

        let resumes = [];

        // Agar Lambda body string return kare
        if (apiResponse.body) {
            resumes = JSON.parse(apiResponse.body);
        } else {
            resumes = apiResponse;
        }

        console.log("Resume Array:", resumes);

        if (Array.isArray(resumes) && resumes.length > 0) {

            // Latest Resume
            resume = resumes[resumes.length - 1];

        } else {

            const localData = localStorage.getItem("resume");

            if (!localData) {
                alert("Resume not found!");
                return;
            }

            resume = JSON.parse(localData);
        }

    } catch (err) {

        console.error("API Error:", err);

        const localData = localStorage.getItem("resume");

        if (!localData) {
            alert("Resume not found!");
            return;
        }

        resume = JSON.parse(localData);

    }

    console.log("Final Resume:", resume);

    // ---------- Name ----------

    const previewName = document.getElementById("previewName");

    if (previewName) {
        previewName.textContent = resume.name || "Your Name";
    }

    // ---------- Role ----------

    const previewRole = document.getElementById("previewRole");

    if (previewRole) {
        previewRole.textContent = "AWS Cloud Engineer";
    }

    // ---------- Contact ----------

    const previewContact = document.getElementById("previewContact");

    if (previewContact) {

        previewContact.innerHTML = `
            <span><i class="fa-solid fa-envelope"></i> ${resume.email || ""}</span>
            <span><i class="fa-solid fa-phone"></i> ${resume.phone || ""}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${resume.address || ""}</span>
        `;
    }

    // ---------- Summary ----------

    const previewSummary = document.getElementById("previewSummary");

    if (previewSummary) {
        previewSummary.textContent = resume.summary || "";
    }

    // ---------- Links ----------

    const links = document.querySelector(".links");

    if (links) {

        links.innerHTML = `
            <a href="${resume.linkedin || "#"}" target="_blank">LinkedIn</a>
            |
            <a href="${resume.github || "#"}" target="_blank">GitHub</a>
        `;
    }

    // ---------- Skills ----------

    const previewSkills = document.getElementById("previewSkills");

    if (previewSkills) {

        previewSkills.innerHTML = "";

        if (resume.skills) {

            resume.skills.split(",").forEach(skill => {

                const span = document.createElement("span");

                span.textContent = skill.trim();

                previewSkills.appendChild(span);

            });

        }

    }

    // ---------- Project ----------

    const project = document.getElementById("previewProjectTitle");

    if (project) {
        project.textContent = resume.project || "Project";
    }

});


// =============================
// Download PDF
// =============================

const downloadBtn = document.getElementById("downloadBtn");

if (downloadBtn) {

    downloadBtn.addEventListener("click", () => {

        const resume = document.querySelector(".resume");

        const options = {

            margin: 0.3,

            filename: "My_Resume.pdf",

            image: {
                type: "jpeg",
                quality: 1
            },

            html2canvas: {
                scale: 2
            },

            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: "portrait"
            }

        };

        html2pdf()
            .set(options)
            .from(resume)
            .save();

    });

}