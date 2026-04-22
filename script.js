const quizData = [
    {
        question: "Which message is the strongest phishing warning sign?",
        options: [
            "An email that creates urgency and asks you to click a login link immediately",
            "A calendar reminder from your manager",
            "A normal internal newsletter",
            "A system notification you expected"
        ],
        answer: 0,
        explanation: "Urgency plus a login link is a classic phishing pattern. Attackers often try to rush people into clicking before they think."
    },
    {
        question: "What is the best response to an unexpected attachment from an unknown sender?",
        options: [
            "Open it quickly to see what it contains",
            "Reply and ask whether it is safe",
            "Report it to IT or security and avoid opening it",
            "Forward it to coworkers for a second opinion"
        ],
        answer: 2,
        explanation: "Unexpected attachments should not be opened casually. Reporting them is safer than investigating them directly."
    },
    {
        question: "Why are unique passwords important?",
        options: [
            "They are easier to remember than reused passwords",
            "They prevent one compromised account from exposing multiple systems",
            "They remove the need for multi-factor authentication",
            "They make accounts load faster"
        ],
        answer: 1,
        explanation: "Password reuse creates a domino effect. One breach can expose several accounts when credentials are shared."
    },
    {
        question: "What is social engineering?",
        options: [
            "A method of optimizing a website",
            "A hardware upgrade process",
            "Manipulating people into revealing information or taking unsafe actions",
            "A type of antivirus software"
        ],
        answer: 2,
        explanation: "Social engineering targets human behavior rather than technical weaknesses."
    },
    {
        question: "Which action is the safest when visiting an unfamiliar website?",
        options: [
            "Download the first file offered to you",
            "Ignore browser warnings",
            "Check the URL carefully and avoid entering sensitive data unless the site is trusted",
            "Disable security tools temporarily"
        ],
        answer: 2,
        explanation: "Checking the URL and only trusting verified sites helps prevent credential theft and unsafe downloads."
    }
];

const overviewSection = document.getElementById("overview");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("results");
const quizContent = document.getElementById("quizContent");
const resultSummary = document.getElementById("resultSummary");
const resultDetails = document.getElementById("resultDetails");

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("submitAnswers").addEventListener("click", gradeQuiz);
document.getElementById("retakeQuiz").addEventListener("click", startQuiz);
document.getElementById("backToOverview").addEventListener("click", backToOverview);

function showSection(sectionToShow) {
    [overviewSection, quizSection, resultsSection].forEach(section => {
        section.classList.add("hidden");
    });
    sectionToShow.classList.remove("hidden");
}

function startQuiz() {
    quizContent.innerHTML = "";
    resultSummary.innerHTML = "";
    resultDetails.innerHTML = "";

    quizData.forEach((item, index) => {
        const questionBlock = document.createElement("div");
        questionBlock.className = "question-card";

        questionBlock.innerHTML = `
            <h3>Question ${index + 1}</h3>
            <p class="question-text">${item.question}</p>
            <div class="option-list">
                ${item.options.map((option, i) => `
                    <label class="option-item">
                        <input type="radio" name="question${index}" value="${i}">
                        <span>${option}</span>
                    </label>
                `).join("")}
            </div>
        `;

        quizContent.appendChild(questionBlock);
    });

    showSection(quizSection);
}

function gradeQuiz() {
    let score = 0;
    let detailHtml = '<div class="feedback-list">';

    quizData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        const selectedValue = selected ? parseInt(selected.value, 10) : null;
        const isCorrect = selectedValue === item.answer;

        if (isCorrect) {
            score++;
        }

        const selectedText = selectedValue !== null
            ? item.options[selectedValue]
            : "No answer selected";

        const correctText = item.options[item.answer];

        detailHtml += `
            <div class="feedback-card ${isCorrect ? "correct" : "incorrect"}">
                <h3>Question ${index + 1}</h3>
                <p><strong>Your Answer:</strong> ${selectedText}</p>
                <p><strong>Correct Answer:</strong> ${correctText}</p>
                <p><strong>Why:</strong> ${item.explanation}</p>
            </div>
        `;
    });

    detailHtml += "</div>";

    const percentage = Math.round((score / quizData.length) * 100);
    let rating = "Needs Improvement";

    if (percentage >= 80) {
        rating = "Strong Awareness";
    } else if (percentage >= 60) {
        rating = "Developing Awareness";
    }

    resultSummary.innerHTML = `
        <div class="summary-card">
            <p class="score-line">Score: ${score} / ${quizData.length}</p>
            <p class="score-line">Percentage: ${percentage}%</p>
            <p class="score-rating">${rating}</p>
        </div>
    `;

    resultDetails.innerHTML = detailHtml;
    showSection(resultsSection);
}

function backToOverview() {
    showSection(overviewSection);
}
