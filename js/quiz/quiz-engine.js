let currentQuestion = 1;
const quizAnswers = {
    q1: 'c',
    q2: 'b',
    q3: 'c'
};

function nextQuestion() {
    const questions = document.querySelectorAll('.quiz-question');
    if (currentQuestion < questions.length) {
        questions[currentQuestion - 1].classList.remove('active');
        currentQuestion++;
        questions[currentQuestion - 1].classList.add('active');
    }
}

function previousQuestion() {
    const questions = document.querySelectorAll('.quiz-question');
    if (currentQuestion > 1) {
        questions[currentQuestion - 1].classList.remove('active');
        currentQuestion--;
        questions[currentQuestion - 1].classList.add('active');
    }
}

function submitQuiz() {
    let score = 0;
    const totalQuestions = Object.keys(quizAnswers).length;
    
    for (let question in quizAnswers) {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        if (selected && selected.value === quizAnswers[question]) {
            score++;
        }
    }
    
    const percentage = (score / totalQuestions) * 100;
    
    document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
    document.querySelector('.quiz-navigation').style.display = 'none';
    
    const resultDiv = document.querySelector('.quiz-result');
    resultDiv.style.display = 'block';
    resultDiv.querySelector('.score').textContent = `${score} / ${totalQuestions} (${percentage}%)`;
    
    updateProgress();
    
    if (percentage === 100) {
        markLessonComplete();
    }
}

function retakeQuiz() {
    currentQuestion = 1;
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    document.querySelectorAll('.quiz-question').forEach((q, i) => {
        q.style.display = i === 0 ? 'block' : 'none';
        if (i === 0) q.classList.add('active');
    });
    document.querySelector('.quiz-navigation').style.display = 'flex';
    document.querySelector('.quiz-result').style.display = 'none';
}

function updateProgress() {
    const completed = getCompletedLessons();
    const total = 30;
    const percentage = (completed.length / total) * 100;
    
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-box p');
    
    if (progressFill) progressFill.style.width = percentage + '%';
    if (progressText) progressText.textContent = `${completed.length} of ${total} lessons completed`;
}

function getCompletedLessons() {
    const completed = localStorage.getItem('completedLessons');
    return completed ? JSON.parse(completed) : [];
}

function markLessonComplete() {
    const lessonId = 'python-01-variables';
    const completed = getCompletedLessons();
    if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completed));
    }
}

document.addEventListener('DOMContentLoaded', updateProgress);
