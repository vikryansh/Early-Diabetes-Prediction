// ─── Config ──────────────────────────────────────────────────────────────────
const API_URL = "https://vikryansh-early-diabetes-prediction.hf.space/predict";
const QUESTIONS_PER_SCREEN = 4;

// ─── Question Definitions ─────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "age",
    text: "How old are you?",
    type: "number",
    placeholder: "Enter your age",
    min: 1, max: 120,
    info: {
      title: "Age",
      body: "Age is a key risk factor for Type 2 diabetes. The risk increases significantly after age 45, though diabetes can develop at any age. Your age helps the model calibrate its assessment alongside other symptoms."
    }
  },
  {
    id: "gender",
    text: "What is your biological sex?",
    type: "gender",
    info: {
      title: "Biological Sex",
      body: "Biological sex influences diabetes risk and symptom presentation. Men and women may experience different early symptoms and have different hormonal risk factors. This is used only for medical pattern analysis."
    }
  },
  {
    id: "polyuria",
    text: "Do you urinate more frequently than usual, especially at night?",
    type: "yesno",
    info: {
      title: "Polyuria (Excessive Urination)",
      body: "Polyuria means producing abnormally large amounts of urine. In diabetes, high blood sugar causes the kidneys to filter excess glucose into urine, drawing water along with it. This leads to frequent urination — often one of the first noticeable signs of diabetes."
    }
  },
  {
    id: "polydipsia",
    text: "Do you feel constantly thirsty even after drinking water?",
    type: "yesno",
    info: {
      title: "Polydipsia (Excessive Thirst)",
      body: "Polydipsia is persistent, extreme thirst. It typically follows polyuria — as your body loses water through excessive urination, it triggers thirst signals to compensate. Together, polyuria and polydipsia are among the most classic early signs of both Type 1 and Type 2 diabetes."
    }
  },
  {
    id: "sudden_weight_loss",
    text: "Have you experienced sudden, unexplained weight loss recently?",
    type: "yesno",
    info: {
      title: "Sudden Weight Loss",
      body: "When the body cannot properly use glucose for energy (due to insufficient insulin), it begins burning fat and muscle instead. This results in unintended weight loss even without changes in diet. It is more common in Type 1 diabetes but can occur in Type 2 as well."
    }
  },
  {
    id: "weakness",
    text: "Do you feel unusual fatigue or weakness throughout the day?",
    type: "yesno",
    info: {
      title: "Weakness / Fatigue",
      body: "When cells cannot absorb glucose effectively, the body lacks its primary energy source. This causes persistent fatigue and weakness that is not relieved by rest. Dehydration from excessive urination also contributes to this feeling of low energy."
    }
  },
  {
    id: "polyphagia",
    text: "Do you feel extreme hunger even shortly after eating?",
    type: "yesno",
    info: {
      title: "Polyphagia (Excessive Hunger)",
      body: "When insulin is absent or ineffective, cells cannot absorb glucose from meals. The body interprets this as starvation and sends hunger signals — even after eating. This cycle of eating without satiation is a hallmark symptom of uncontrolled diabetes."
    }
  },
  {
    id: "genital_thrush",
    text: "Have you had recurring yeast or fungal infections in the genital area?",
    type: "yesno",
    info: {
      title: "Genital Thrush",
      body: "High blood sugar creates an environment where Candida yeast thrives. Recurrent genital thrush (yeast infections) — especially when they keep returning — can be an early indicator of undiagnosed diabetes. This symptom affects both men and women."
    }
  },
  {
    id: "visual_blurring",
    text: "Has your vision become blurry or difficult to focus?",
    type: "yesno",
    info: {
      title: "Visual Blurring",
      body: "High blood sugar draws fluid from the lenses of the eyes, causing them to swell and change shape. This temporarily affects the eye's ability to focus, resulting in blurred vision. Prolonged high blood sugar can damage retinal blood vessels, potentially causing permanent vision problems."
    }
  },
  {
    id: "itching",
    text: "Do you experience persistent itching, especially on the skin?",
    type: "yesno",
    info: {
      title: "Itching",
      body: "Diabetes can cause itching through poor circulation, dry skin from dehydration, and nerve damage. Fungal infections (which are more common in high blood sugar environments) also cause skin itching. Generalized or localized itching — particularly in the lower legs — can be an early warning sign."
    }
  },
  {
    id: "irritability",
    text: "Have you noticed unusual mood changes or irritability?",
    type: "yesno",
    info: {
      title: "Irritability",
      body: "Blood sugar fluctuations directly affect brain function and mood. Low or unstable blood sugar (hypoglycemia) can cause anxiety, irritability, and difficulty concentrating. Even pre-diabetic blood sugar swings can produce noticeable mood changes before other symptoms appear."
    }
  },
  {
    id: "delayed_healing",
    text: "Do cuts or wounds on your body heal more slowly than usual?",
    type: "yesno",
    info: {
      title: "Delayed Healing",
      body: "High blood sugar impairs the immune system and disrupts blood flow to tissues, slowing the body's natural healing process. Even minor cuts or bruises may take much longer to heal. This also increases the risk of infection in wounds — one of the more serious complications of unmanaged diabetes."
    }
  },
  {
    id: "partial_paresis",
    text: "Do you have any muscle weakness or partial loss of movement in limbs?",
    type: "yesno",
    info: {
      title: "Partial Paresis (Muscle Weakness)",
      body: "Diabetic neuropathy — nerve damage caused by prolonged high blood sugar — can cause muscle weakness, cramping, or reduced control in the limbs, particularly the legs. This symptom typically appears in more advanced or long-standing cases but can occasionally present early."
    }
  },
  {
    id: "muscle_stiffness",
    text: "Do you experience unusual muscle stiffness or joint pain?",
    type: "yesno",
    info: {
      title: "Muscle Stiffness",
      body: "Diabetes-related inflammation, poor circulation, and nerve damage can cause muscles and joints to feel stiff and painful. High blood sugar also causes a process called glycation, where sugar molecules attach to proteins in the body, reducing tissue flexibility and causing stiffness."
    }
  },
  {
    id: "alopecia",
    text: "Have you noticed unexpected or unusual hair loss?",
    type: "yesno",
    info: {
      title: "Alopecia (Hair Loss)",
      body: "Diabetes can disrupt the normal hair growth cycle through hormonal imbalance, poor circulation to hair follicles, and increased physical stress on the body. Immune system dysfunction associated with Type 1 diabetes (an autoimmune condition) can also trigger alopecia areata."
    }
  },
  {
    id: "obesity",
    text: "Is your body weight significantly above the healthy range for your height?",
    type: "yesno",
    info: {
      title: "Obesity",
      body: "Obesity — particularly abdominal (visceral) fat — is one of the strongest risk factors for Type 2 diabetes. Excess fat causes insulin resistance, meaning the body produces insulin but cells don't respond to it effectively. This forces the pancreas to produce more insulin until it can no longer keep up."
    }
  }
];

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  selectedModel: null,
  answers: {},
  currentScreen: 0,   // 0 = intro
  totalScreens: 0,
};

// ─── Derived ──────────────────────────────────────────────────────────────────
// Chunk questions into groups of QUESTIONS_PER_SCREEN
function chunkQuestions() {
  const chunks = [];
  for (let i = 0; i < QUESTIONS.length; i += QUESTIONS_PER_SCREEN) {
    chunks.push(QUESTIONS.slice(i, i + QUESTIONS_PER_SCREEN));
  }
  return chunks;
}

const chunks = chunkQuestions();

// ─── DOM Refs ─────────────────────────────────────────────────────────────────
const themeToggle      = document.getElementById("themeToggle");
const themeIcon        = themeToggle.querySelector(".theme-icon");
const progressBar      = document.getElementById("progressBar");
const startBtn         = document.getElementById("startBtn");
const modelHint        = document.getElementById("modelHint");
const modelBtns        = document.querySelectorAll(".model-btn");
const questionScreens  = document.getElementById("questionScreens");
const screenIntro      = document.getElementById("screen-intro");
const screenResult     = document.getElementById("screen-result");
const resultBadge      = document.getElementById("resultBadge");
const resultTitle      = document.getElementById("resultTitle");
const resultModel      = document.getElementById("resultModel");
const resultAdvice     = document.getElementById("resultAdvice");
const restartBtn       = document.getElementById("restartBtn");
const changeModelBtn   = document.getElementById("changeModelBtn");
const tooltipOverlay   = document.getElementById("tooltipOverlay");
const tooltipClose     = document.getElementById("tooltipClose");
const tooltipTitle     = document.getElementById("tooltipTitle");
const tooltipBody      = document.getElementById("tooltipBody");

// ─── Theme ────────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  themeIcon.textContent = saved === "dark" ? "🌙" : "☀️";
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeIcon.textContent = next === "dark" ? "🌙" : "☀️";
});

// ─── Model Selection ──────────────────────────────────────────────────────────
modelBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modelBtns.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.selectedModel = btn.dataset.model;
    startBtn.disabled = false;
    modelHint.textContent = `✓ ${btn.querySelector(".model-name").textContent} selected`;
  });
});

// ─── Build Question Screens ───────────────────────────────────────────────────
function buildQuestionScreens() {
  questionScreens.innerHTML = "";

  chunks.forEach((chunk, chunkIdx) => {
    const screenEl = document.createElement("section");
    screenEl.className = "screen";
    screenEl.id = `screen-q-${chunkIdx}`;

    const inner = document.createElement("div");
    inner.className = "question-screen";

    // Step label
    const stepLabel = document.createElement("div");
    stepLabel.className = "step-label";
    stepLabel.textContent = `Step ${chunkIdx + 1} of ${chunks.length}`;
    inner.appendChild(stepLabel);

    // Questions group
    const group = document.createElement("div");
    group.className = "questions-group";

    chunk.forEach(q => {
      group.appendChild(buildQuestionCard(q));
    });

    inner.appendChild(group);

    // Error message
    const navError = document.createElement("div");
    navError.className = "nav-error";
    navError.id = `error-${chunkIdx}`;
    inner.appendChild(navError);

    // Navigation
    const nav = document.createElement("div");
    nav.className = "screen-nav";

    if (chunkIdx > 0) {
      const backBtn = document.createElement("button");
      backBtn.className = "btn-back";
      backBtn.textContent = "← Back";
      backBtn.addEventListener("click", () => goToScreen(chunkIdx)); // chunkIdx = prev (screen index = chunkIdx + 1, prev = chunkIdx)
      nav.appendChild(backBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.className = "btn-primary";
    nextBtn.id = `next-${chunkIdx}`;

    const isLast = chunkIdx === chunks.length - 1;
    nextBtn.textContent = isLast ? "Get My Result →" : "Continue →";

    nextBtn.addEventListener("click", () => {
      if (!validateChunk(chunkIdx)) return;
      if (isLast) {
        submitPrediction();
      } else {
        goToScreen(chunkIdx + 2); // +2 because screen 0 = intro, screen 1 = q chunk 0
      }
    });

    nav.appendChild(nextBtn);
    inner.appendChild(nav);
    screenEl.appendChild(inner);
    questionScreens.appendChild(screenEl);
  });
}

function buildQuestionCard(q) {
  const card = document.createElement("div");
  card.className = "q-card";

  const header = document.createElement("div");
  header.className = "q-header";

  const qText = document.createElement("div");
  qText.className = "q-text";
  qText.textContent = q.text;
  header.appendChild(qText);

  if (q.info) {
    const infoBtn = document.createElement("button");
    infoBtn.className = "q-info-btn";
    infoBtn.textContent = "?";
    infoBtn.setAttribute("aria-label", `Info about ${q.info.title}`);
    infoBtn.addEventListener("click", () => openTooltip(q.info.title, q.info.body));
    header.appendChild(infoBtn);
  }

  card.appendChild(header);

  if (q.type === "yesno") {
    const opts = document.createElement("div");
    opts.className = "q-options";

    ["Yes", "No"].forEach(label => {
      const btn = document.createElement("button");
      btn.className = "q-option";
      btn.textContent = label;
      btn.setAttribute("data-q", q.id);
      btn.setAttribute("data-val", label === "Yes" ? "1" : "0");
      btn.addEventListener("click", () => {
        opts.querySelectorAll(".q-option").forEach(b => b.className = "q-option");
        btn.classList.add(label === "Yes" ? "selected-yes" : "selected-no");
        state.answers[q.id] = label === "Yes" ? 1 : 0;
      });
      opts.appendChild(btn);
    });

    card.appendChild(opts);

  } else if (q.type === "number") {
    const input = document.createElement("input");
    input.type = "number";
    input.className = "q-input";
    input.placeholder = q.placeholder;
    input.min = q.min;
    input.max = q.max;
    input.id = `input-${q.id}`;
    input.addEventListener("input", () => {
      state.answers[q.id] = parseFloat(input.value);
    });
    card.appendChild(input);

  } else if (q.type === "gender") {
    const opts = document.createElement("div");
    opts.className = "q-options";

    [{ label: "Male", female: 0, male: 1 }, { label: "Female", female: 1, male: 0 }].forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "q-option";
      btn.textContent = opt.label;
      btn.addEventListener("click", () => {
        opts.querySelectorAll(".q-option").forEach(b => b.className = "q-option");
        btn.classList.add("selected-yes");
        state.answers["gender_Female"] = opt.female;
        state.answers["gender_Male"] = opt.male;
      });
      opts.appendChild(btn);
    });

    card.appendChild(opts);
  }

  return card;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validateChunk(chunkIdx) {
  const chunk = chunks[chunkIdx];
  const errorEl = document.getElementById(`error-${chunkIdx}`);

  for (const q of chunk) {
    if (q.type === "yesno" && state.answers[q.id] === undefined) {
      errorEl.textContent = "Please answer all questions before continuing.";
      return false;
    }
    if (q.type === "number") {
      const val = state.answers[q.id];
      if (val === undefined || isNaN(val) || val < q.min || val > q.max) {
        errorEl.textContent = `Please enter a valid age (${q.min}–${q.max}).`;
        return false;
      }
    }
    if (q.type === "gender") {
      if (state.answers["gender_Female"] === undefined) {
        errorEl.textContent = "Please select a biological sex.";
        return false;
      }
    }
  }

  errorEl.textContent = "";
  return true;
}

// ─── Screen Navigation ────────────────────────────────────────────────────────
// screenIndex: 0 = intro, 1..N = question chunks, N+1 = result
function goToScreen(screenIndex) {
  state.currentScreen = screenIndex;

  // Hide all
  screenIntro.classList.remove("active");
  screenResult.classList.remove("active");
  document.querySelectorAll(".screen[id^='screen-q-']").forEach(s => s.classList.remove("active"));

  if (screenIndex === 0) {
    screenIntro.classList.add("active");
  } else if (screenIndex === chunks.length + 1) {
    screenResult.classList.add("active");
  } else {
    const qScreen = document.getElementById(`screen-q-${screenIndex - 1}`);
    if (qScreen) qScreen.classList.add("active");
  }

  updateProgress(screenIndex);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgress(screenIndex) {
  const total = chunks.length + 1; // question screens + result
  const pct = screenIndex === 0 ? 0 : Math.round((screenIndex / total) * 100);
  progressBar.style.width = pct + "%";
}

// ─── API Call ─────────────────────────────────────────────────────────────────
async function submitPrediction() {
  const nextBtn = document.getElementById(`next-${chunks.length - 1}`);
  nextBtn.classList.add("loading");
  nextBtn.textContent = "Analyzing...";

  const payload = {
    ...state.answers,
    model_choice: state.selectedModel
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    showResult(data.prediction, data.model_used || state.selectedModel);

  } catch (err) {
    const errorEl = document.getElementById(`error-${chunks.length - 1}`);
    errorEl.textContent = "Connection failed. Please check your internet and try again.";
    nextBtn.classList.remove("loading");
    nextBtn.textContent = "Get My Result →";
  }
}

// ─── Result ───────────────────────────────────────────────────────────────────
const MODEL_NAMES = {
  random_forest: "Random Forest (98.08% accuracy)",
  decision_tree: "Decision Tree (96.15% accuracy)",
  logistic_regression: "Logistic Regression (93.08% accuracy)",
  naive_bayes: "Naive Bayes (88.08% accuracy)"
};

const ADVICE_POSITIVE = [
  "Consult a doctor or endocrinologist as soon as possible for proper blood glucose testing.",
  "Request an HbA1c test and fasting blood glucose test — these are the gold standard for diagnosis.",
  "Reduce intake of refined carbohydrates, sugary drinks, and processed foods.",
  "Aim for at least 150 minutes of moderate physical activity per week.",
  "Monitor your weight — even a 5–10% reduction can significantly improve insulin sensitivity.",
  "Stay hydrated and avoid alcohol and tobacco.",
  "Do not self-diagnose based on this tool — get a professional medical evaluation."
];

const ADVICE_NEGATIVE = [
  "Your responses suggest a lower risk profile — this is encouraging.",
  "Continue maintaining a balanced diet rich in vegetables, whole grains, and lean protein.",
  "Regular physical activity (30 min/day) helps keep blood sugar stable long-term.",
  "Get routine health checkups, especially if diabetes runs in your family.",
  "Be mindful of weight changes, increased thirst, or frequent urination in the future.",
  "This screening is not a substitute for a medical exam — consult your doctor annually."
];

function showResult(prediction, modelUsed) {
  const isPositive = prediction === 1 || prediction === "1";

  resultBadge.className = `result-badge ${isPositive ? "positive" : "negative"}`;
  resultBadge.textContent = isPositive ? "⚠️" : "✓";

  resultTitle.className = `result-title ${isPositive ? "positive" : "negative"}`;
  resultTitle.textContent = isPositive
    ? "Higher Risk Detected"
    : "Lower Risk Detected";

  resultModel.textContent = `Predicted by: ${MODEL_NAMES[modelUsed] || modelUsed}`;

  const adviceList = isPositive ? ADVICE_POSITIVE : ADVICE_NEGATIVE;
  resultAdvice.innerHTML = `
    <h3>${isPositive ? "What you should do next" : "Keep up the good habits"}</h3>
    <ul class="advice-list">
      ${adviceList.map(a => `<li>${a}</li>`).join("")}
    </ul>
  `;

  goToScreen(chunks.length + 1);
}

// ─── Restart ──────────────────────────────────────────────────────────────────
restartBtn.addEventListener("click", () => {
  state.answers = {};
  state.selectedModel = null;
  modelBtns.forEach(b => b.classList.remove("selected"));
  startBtn.disabled = true;
  modelHint.textContent = "Select a model to continue";
  buildQuestionScreens(); // rebuild to clear selections
  goToScreen(0);
});

changeModelBtn.addEventListener("click", () => {
  state.answers = {};
  state.selectedModel = null;
  modelBtns.forEach(b => b.classList.remove("selected"));
  startBtn.disabled = true;
  modelHint.textContent = "Select a model to continue";
  buildQuestionScreens();
  goToScreen(0);
});

// ─── Start Button ─────────────────────────────────────────────────────────────
startBtn.addEventListener("click", () => {
  goToScreen(1);
});

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function openTooltip(title, body) {
  tooltipTitle.textContent = title;
  tooltipBody.textContent = body;
  tooltipOverlay.classList.add("open");
}

tooltipClose.addEventListener("click", () => tooltipOverlay.classList.remove("open"));
tooltipOverlay.addEventListener("click", e => {
  if (e.target === tooltipOverlay) tooltipOverlay.classList.remove("open");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") tooltipOverlay.classList.remove("open");
});

// ─── Init ─────────────────────────────────────────────────────────────────────
initTheme();
buildQuestionScreens();
state.totalScreens = chunks.length + 2;
goToScreen(0);
