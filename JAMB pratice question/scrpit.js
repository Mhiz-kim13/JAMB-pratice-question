const subjectTopics = {
  physics: [
    'Measurement and units',
    'Motion and vectors',
    'Newton’s laws of motion',
    'Work, energy and power',
    'Electricity and magnetism',
    'Waves and optics',
    'Modern physics'
  ],
  mathematics: [
    'Algebra and quadratic equations',
    'Trigonometry and identities',
    'Coordinate geometry',
    'Differentiation and integration',
    'Probability and statistics',
    'Sets and logic',
    'Matrices and determinants'
  ],
  biology: [
    'Cell biology and organisation',
    'Plant and animal physiology',
    'Genetics and variation',
    'Ecology and conservation',
    'Evolution and adaptation',
    'Reproduction and growth',
    'Human health and diseases'
  ],
  chemistry: [
    'Atomic structure and periodicity',
    'Chemical bonding',
    'Stoichiometry and chemical reactions',
    'Acids, bases and salts',
    'Electrochemistry',
    'Hydrocarbons and organic chemistry',
    'Equilibrium and kinetics'
  ],
  english: [
    'Comprehension and summary',
    'Grammar and structure',
    'Vocabulary and antonyms',
    'Sentence interpretation',
    'Lexis and oral English',
    'Literary appreciation',
    'Essay writing and argumentation'
  ]
};

const examYears = Array.from({ length: 2025 - 2010 + 1 }, (_, index) => 2010 + index);

const questionBank = {
  physics: [
    {
      question: 'A body starts from rest and moves with uniform acceleration of 5 m/s². What is its velocity after 4 seconds?',
      options: ['10 m/s', '15 m/s', '20 m/s', '25 m/s'],
      answer: '20 m/s',
      explanation: 'Using v = u + at, with u = 0, a = 5 and t = 4, v = 20 m/s.'
    },
    {
      question: 'What is the SI unit of power?',
      options: ['Newton', 'Joule', 'Watt', 'Pascal'],
      answer: 'Watt',
      explanation: 'Power is the rate of doing work; the SI unit is the watt (W).'
    },
    {
      question: 'The resistance of a conductor is directly proportional to:',
      options: ['Cross-sectional area', 'Current', 'Length', 'Voltage'],
      answer: 'Length',
      explanation: 'For a conductor, R = ρL/A, so resistance increases with length.'
    }
  ],
  mathematics: [
    {
      question: 'Solve for x: 2x + 5 = 17',
      options: ['3', '4', '5', '6'],
      answer: '6',
      explanation: '2x = 12, so x = 6.'
    },
    {
      question: 'If sin θ = 1/2, what is θ in the first quadrant?',
      options: ['30°', '45°', '60°', '90°'],
      answer: '30°',
      explanation: 'sin 30° = 1/2.'
    },
    {
      question: 'The gradient of the line through (2, 3) and (5, 9) is:',
      options: ['1', '2', '3', '4'],
      answer: '2',
      explanation: 'Gradient = (9 - 3) / (5 - 2) = 6 / 3 = 2.'
    }
  ],
  biology: [
    {
      question: 'The basic unit of life is the:',
      options: ['Tissue', 'Cell', 'Organ', 'System'],
      answer: 'Cell',
      explanation: 'All living organisms are made of cells, the basic structural and functional unit of life.'
    },
    {
      question: 'Which organ is primarily responsible for pumping blood?',
      options: ['Lungs', 'Kidney', 'Heart', 'Liver'],
      answer: 'Heart',
      explanation: 'The heart pumps blood throughout the body.'
    },
    {
      question: 'The process by which plants make food is called:',
      options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Digestion'],
      answer: 'Photosynthesis',
      explanation: 'Plants use sunlight to produce glucose through photosynthesis.'
    }
  ],
  chemistry: [
    {
      question: 'Which subatomic particle carries a negative charge?',
      options: ['Proton', 'Neutron', 'Electron', 'Nucleus'],
      answer: 'Electron',
      explanation: 'Electrons are negatively charged particles found in atoms.'
    },
    {
      question: 'What is the pH of a neutral solution?',
      options: ['0', '3', '7', '10'],
      answer: '7',
      explanation: 'A pH of 7 represents a neutral solution such as pure water.'
    },
    {
      question: 'The chemical formula of water is:',
      options: ['H2O2', 'HO2', 'H2O', 'OH2'],
      answer: 'H2O',
      explanation: 'Water is composed of two hydrogen atoms and one oxygen atom.'
    }
  ],
  english: [
    {
      question: 'Choose the correct sentence:',
      options: ['She go to school every day.', 'She goes to school every day.', 'She going to school every day.', 'She gone to school every day.'],
      answer: 'She goes to school every day.',
      explanation: 'The third-person singular verb takes the “-s” form in the present simple tense.'
    },
    {
      question: 'The antonym of “ancient” is:',
      options: ['Old', 'Classic', 'Modern', 'Historic'],
      answer: 'Modern',
      explanation: 'Modern is the opposite of ancient.'
    },
    {
      question: 'A passage that explains a process is best described as:',
      options: ['Narrative', 'Expository', 'Poetic', 'Argumentative'],
      answer: 'Expository',
      explanation: 'Expository writing explains facts, ideas, or processes clearly.'
    }
  ]
};

const subjectData = Object.entries(subjectTopics).reduce((data, [subject, topics]) => {
  data[subject] = {
    topics,
    questions: questionBank[subject]
  };
  return data;
}, {});

const state = {
  subject: 'physics',
  year: 2025
};

const subjectNav = document.getElementById('subjectNav');
const yearSelect = document.getElementById('yearSelect');
const syllabusList = document.getElementById('syllabusList');
const questionContainer = document.getElementById('questionContainer');
const syllabusTitle = document.getElementById('syllabusTitle');

function createSubjectButtons() {
  const buttons = Object.keys(subjectData)
    .map((subject) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'subject-btn';
      button.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
      button.dataset.subject = subject;

      if (subject === state.subject) {
        button.classList.add('active');
      }

      button.addEventListener('click', () => {
        state.subject = subject;
        renderPage();
      });

      return button;
    });

  subjectNav.innerHTML = '';
  buttons.forEach((button) => subjectNav.appendChild(button));
}

function createYearOptions() {
  yearSelect.innerHTML = examYears
    .map((year) => `<option value="${year}">${year}</option>`)
    .join('');

  yearSelect.value = String(state.year);
  yearSelect.onchange = (event) => {
    state.year = Number(event.target.value);
    renderPage();
  };
}

function renderSyllabus() {
  const selectedTopics = subjectData[state.subject].topics;
  syllabusTitle.textContent = `${state.subject.charAt(0).toUpperCase() + state.subject.slice(1)} syllabus (${state.year})`;

  syllabusList.innerHTML = selectedTopics
    .map((topic) => `<li>${topic}</li>`)
    .join('');
}

function renderQuestions() {
  const { questions } = subjectData[state.subject];

  questionContainer.innerHTML = questions
    .map(
      (item, index) => `
        <article class="question-card">
          <h3>Question ${index + 1}</h3>
          <p>${item.question}</p>
          <ol type="A" class="answer-options">
            ${item.options.map((option) => `<li>${option}</li>`).join('')}
          </ol>
          <button type="button" class="reveal-btn" data-index="${index}">Reveal answer</button>
          <div class="answer-box" id="answer-${index}">
            Correct answer: <span>${item.answer}</span><br />
            ${item.explanation}
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.reveal-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      const answerBox = document.getElementById(`answer-${index}`);
      const visible = answerBox.classList.contains('visible');
      answerBox.classList.toggle('visible', !visible);
      button.textContent = visible ? 'Reveal answer' : 'Hide answer';
    });
  });
}

function renderPage() {
  createSubjectButtons();
  createYearOptions();
  renderSyllabus();
  renderQuestions();
}

renderPage();
