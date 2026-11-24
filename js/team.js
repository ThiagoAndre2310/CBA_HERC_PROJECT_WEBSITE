import { members } from "./data/members.js";
import { resources } from "./data/resources.js";
import "./navigation.js";
import { initScrollReveal } from "./interactions.js";

const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const profileRoot = document.querySelector("#member-profiles");
const resourceSelect = document.querySelector("#resource-choice");

if (profileRoot) {
  profileRoot.innerHTML = members.map((member, index) => `
    <article class="member-profile reveal">
      <div class="member-profile__index">PERFIL ${String(index + 1).padStart(2, "0")} · ${escapeHTML(member.area)}</div>
      <div class="member-profile__body"><div class="member-profile__portrait" aria-hidden="true"><span>H</span><i></i><b></b></div><div><span class="badge">Muestra · datos personales pendientes</span><h3>${escapeHTML(member.name)}</h3><p class="member-profile__area">${escapeHTML(member.area)}</p></div></div>
      <dl class="member-profile__story"><div><dt>Problema o desafío</dt><dd>${escapeHTML(member.problem)}</dd></div><div><dt>Primer intento</dt><dd>${escapeHTML(member.firstAttempt)}</dd></div><div><dt>Qué cambió la idea inicial</dt><dd>${escapeHTML(member.whatChangedTheInitialIdea)}</dd></div><div><dt>Evidencia</dt><dd>${escapeHTML(member.evidence)}</dd></div></dl>
      <div class="member-profile__credits"><p><span>EXPERIENCIA ORIGINAL</span>${escapeHTML(member.experienceAuthorCredit)}</p><p><span>ADAPTACIÓN PEDAGÓGICA</span>${escapeHTML(member.pedagogicalAdaptationCredit)}</p></div>
    </article>
  `).join("");
}

resources.forEach((resource) => {
  const option = document.createElement("option");
  option.value = resource.id;
  option.textContent = resource.title;
  resourceSelect?.append(option);
});

const form = document.querySelector("#experience-form");
if (form) {
  const steps = [...form.querySelectorAll("[data-step]")];
  const progress = [...form.querySelectorAll("[data-progress]")];
  const backButton = form.querySelector("#step-back");
  const nextButton = form.querySelector("#step-next");
  const submitButton = form.querySelector("#step-submit");
  const errorBox = form.querySelector("#submission-error");
  const review = form.querySelector("#submission-review");
  const classroomFields = form.querySelector(".classroom-fields");
  const classroomCredit = form.querySelector(".classroom-credit");
  const success = document.querySelector("#submission-success");
  let currentStep = 1;

  function selectedType() { return form.querySelector('[name="experienceType"]:checked')?.value || ""; }
  function updateTypeFields() {
    const isClassroom = selectedType() === "classroom";
    classroomFields.hidden = !isClassroom;
    classroomCredit.hidden = !isClassroom;
    classroomFields.querySelectorAll("input, textarea").forEach((input) => { input.required = isClassroom; });
    const creditInput = classroomCredit.querySelector("input");
    creditInput.required = isClassroom;
  }
  function showStep(step) {
    currentStep = step;
    steps.forEach((element) => { element.hidden = Number(element.dataset.step) !== step; });
    progress.forEach((element) => {
      const index = Number(element.dataset.progress);
      element.classList.toggle("is-current", index === step);
      element.classList.toggle("is-complete", index < step);
      if (index === step) element.setAttribute("aria-current", "step");
      else element.removeAttribute("aria-current");
    });
    backButton.disabled = step === 1;
    nextButton.hidden = step === 4;
    submitButton.hidden = step !== 4;
    errorBox.hidden = true;
    const legend = form.querySelector(`[data-step="${step}"] legend`);
    legend.tabIndex = -1;
    legend.focus();
  }
  function validateCurrentStep() {
    const fieldset = form.querySelector(`[data-step="${currentStep}"]`);
    for (const control of fieldset.querySelectorAll("input, select, textarea")) {
      if (control.type === "file" || control.disabled || control.closest("[hidden]")) continue;
      if (!control.checkValidity()) {
        control.reportValidity();
        control.focus();
        return false;
      }
    }
    return true;
  }
  function showError(message) { errorBox.textContent = message; errorBox.hidden = false; errorBox.focus(); }
  function buildReview() {
    const data = new FormData(form);
    const type = data.get("experienceType") === "classroom" ? "Así lo probamos en el aula" : "Así lo aprendí";
    const resource = resources.find((item) => item.id === data.get("resourceId"));
    const pairs = [
      ["Tipo", type], ["Recurso", resource?.title || "Sin recurso relacionado"], ["Desafío", data.get("challenge")],
      ["Primer intento", data.get("firstAttempt")], ["Observación o aprendizaje", data.get("observation")],
      ...(data.get("experienceType") === "classroom" ? [["Nivel educativo", data.get("schoolLevel")], ["Materiales", data.get("materials")], ["Duración", data.get("duration")]] : []),
      ["Departamento", data.get("department")], ["Autoría de experiencia", data.get("experienceAuthor")],
      ...(data.get("experienceType") === "classroom" ? [["Adaptación pedagógica", data.get("pedagogicalAuthor")]] : []),
      ["Evidencia", data.get("evidence")?.name || "No adjunta"],
    ];
    review.innerHTML = pairs.map(([label, value]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value || "—")}</dd></div>`).join("");
  }

  form.querySelectorAll('[name="experienceType"]').forEach((radio) => radio.addEventListener("change", updateTypeFields));
  nextButton.addEventListener("click", () => {
    if (!validateCurrentStep()) return;
    if (currentStep === 3) buildReview();
    showStep(Math.min(currentStep + 1, 4));
  });
  backButton.addEventListener("click", () => showStep(Math.max(currentStep - 1, 1)));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (currentStep !== 4 || !validateCurrentStep()) return;
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });
  document.querySelector("#submission-reset")?.addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    success.hidden = true;
    updateTypeFields();
    showStep(1);
  });
  updateTypeFields();
  showStep(1);
}

document.querySelectorAll(".team-page .reveal").forEach((element, index) => element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`));
initScrollReveal(document.querySelector(".team-page"));
