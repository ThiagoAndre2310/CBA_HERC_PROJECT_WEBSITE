import { resources } from "./data/resources.js";
import "./navigation.js";
import { initScrollReveal } from "./interactions.js";

const labels = {
  Mathematics: "Matemáticas",
  Physics: "Física",
  Chemistry: "Química",
  Robotics: "Robótica",
  Astronomy: "Astronomía",
};

const icons = {
  Mathematics: '<path d="M7 27h26M9 27V8m1 17 7-8 6 4 10-13"/><circle cx="17" cy="19" r="2"/><circle cx="23" cy="21" r="2"/>',
  Physics: '<path d="M7 28h26M12 23h15l-2-7H15zM16 16l2-5h7l2 5M15 28a3 3 0 1 0 6 0m3 0a3 3 0 1 0 6 0"/><path d="M9 8v6m-3-3h6"/>',
  Chemistry: '<path d="M16 7h8m-6 0v10l-8 12h24l-8-12V7M13 23h18"/><circle cx="19" cy="21" r="1"/><circle cx="25" cy="26" r="1"/>',
  Robotics: '<rect x="10" y="13" width="20" height="15" rx="3"/><path d="M20 13V8m-4 10h.1m7.8 0h.1M14 28l-3 4m15-4 3 4M7 17v7m26-7v7"/><circle cx="20" cy="7" r="2"/>',
  Astronomy: '<circle cx="20" cy="20" r="6"/><ellipse cx="20" cy="20" rx="16" ry="7" transform="rotate(-28 20 20)"/><path d="m9 8 1.5 3L14 12.5 10.5 14 9 17l-1.5-3L4 12.5 7.5 11zM31 6v5m-2.5-2.5h5"/>',
};

const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);
const normalizeText = (value) => String(value ?? "").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const icon = (category) => `<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">${icons[category] || icons.Astronomy}</svg>`;
const scrollBehavior = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

const filterForm = document.querySelector("#resource-filters");
const searchInput = document.querySelector("#resource-search");
const subjectFilter = document.querySelector("#subject-filter");
const levelFilter = document.querySelector("#level-filter");
const shortcutList = document.querySelector("#subject-shortcuts");
const listElement = document.querySelector("#hub-resource-list");
const emptyState = document.querySelector("#resource-empty");
const resultCount = document.querySelector("#result-count");
const catalog = document.querySelector("#catalogo");
const detail = document.querySelector("#resource-detail");
const detailContent = document.querySelector("#detail-content");
const printButton = document.querySelector(".print-resource");

const categories = [...new Set(resources.map((resource) => resource.category))];
const levels = [...new Set(resources.map((resource) => resource.suggestedSchoolLevel).filter(Boolean))];

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = labels[category] || category;
  subjectFilter?.append(option);
});

levels.forEach((level) => {
  const option = document.createElement("option");
  option.value = level;
  option.textContent = level;
  levelFilter?.append(option);
});

if (shortcutList) {
  shortcutList.innerHTML = categories.map((category) => `
    <button class="subject-chip" type="button" data-subject="${escapeHTML(category)}" aria-pressed="false">
      ${icon(category)}<span>${escapeHTML(labels[category] || category)}</span><b aria-hidden="true">↘</b>
    </button>
  `).join("");
}

function renderResources() {
  if (!listElement) return;
  const query = normalizeText(searchInput?.value.trim() || "");
  const subject = subjectFilter?.value || "";
  const level = levelFilter?.value || "";
  const filtered = resources.filter((resource) => {
    const searchable = [resource.title, resource.description, resource.learningChallenge, resource.classroomActivity, labels[resource.category]]
      .filter(Boolean).join(" ");
    const normalizedSearchable = normalizeText(searchable);
    return (!query || normalizedSearchable.includes(query))
      && (!subject || resource.category === subject)
      && (!level || resource.suggestedSchoolLevel === level);
  });

  listElement.innerHTML = filtered.map((resource, index) => `
    <article class="hub-resource reveal" data-category="${escapeHTML(resource.category)}">
      <div class="hub-resource__visual hub-resource__visual--${escapeHTML(resource.category.toLowerCase())}">
        ${icon(resource.category)}<span class="hub-resource__sequence">${String(index + 1).padStart(2, "0")} / ${String(filtered.length).padStart(2, "0")}</span>
      </div>
      <div class="hub-resource__content">
        <div class="hub-resource__meta"><span>${escapeHTML(labels[resource.category] || resource.category)}</span><i></i><span>${escapeHTML(resource.duration)}</span></div>
        <h3>${escapeHTML(resource.title)}</h3>
        <p>${escapeHTML(resource.description || resource.learningChallenge)}</p>
        <div class="hub-resource__footer"><span>${escapeHTML(resource.suggestedSchoolLevel || "Nivel por definir")}</span><a href="?resource=${encodeURIComponent(resource.id)}#resource-detail" data-open-resource="${escapeHTML(resource.id)}" aria-label="Abrir recurso: ${escapeHTML(resource.title)}">Explorar <b aria-hidden="true">↗</b></a></div>
      </div>
    </article>
  `).join("");

  if (resultCount) resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "recurso" : "recursos"}${query || subject || level ? " encontrados" : " disponibles"}`;
  if (emptyState) emptyState.hidden = filtered.length !== 0;
  listElement.hidden = filtered.length === 0;
  initScrollReveal(listElement);
}

function renderDetail(resource) {
  if (!resource || !detail || !catalog || !detailContent) return false;
  catalog.hidden = true;
  detail.hidden = false;
  document.body.classList.add("is-resource-detail");
  detailContent.innerHTML = `
    <article class="learning-resource">
      <header class="learning-hero reveal">
        <div class="learning-hero__copy"><p class="eyebrow"><span class="eyebrow__line"></span> ${escapeHTML(labels[resource.category] || resource.category)} · RECURSO EDUCATIVO</p>
          <h1 id="detail-title">${escapeHTML(resource.title)}</h1><p>${escapeHTML(resource.description || resource.learningChallenge)}</p>
          <div class="learning-hero__meta"><span>${escapeHTML(resource.suggestedSchoolLevel || "Nivel por definir")}</span><i></i><span>${escapeHTML(resource.duration)}</span></div>
        </div>
        <figure class="learning-hero__diagram"><div class="learning-hero__icon">${icon(resource.category)}</div><figcaption>ESQUEMA EDUCATIVO · ${escapeHTML(labels[resource.category] || resource.category)}</figcaption></figure>
      </header>

      <section class="learning-block learning-overview reveal" aria-labelledby="overview-title">
        <div class="learning-block__heading"><span>01</span><p>EL RECURSO</p></div>
        <div class="learning-block__content"><h2 id="overview-title">Una idea para poner a prueba.</h2><p>${escapeHTML(resource.description || resource.learningChallenge)}</p><h3>Materiales</h3><ul class="materials-list">${(resource.materials || []).map((material) => `<li>${escapeHTML(material)}</li>`).join("")}</ul></div>
      </section>

      <section class="learning-block learning-story reveal" aria-labelledby="story-title">
        <div class="learning-block__heading"><span>02</span><p>GUÍA DE EXPLORACIÓN</p></div>
        <div class="learning-block__content"><p class="eyebrow">Así lo aprendí</p><h2 id="story-title">Empezá con una pregunta.<br>Seguí la evidencia.</h2>
          <div class="learning-steps">
            <article><span>A · DESAFÍO</span><h3>El reto de aprendizaje</h3><p>${escapeHTML(resource.learningChallenge)}</p></article>
            <article><span>B · PRIMER INTENTO</span><h3>Probá una primera idea</h3><p>${escapeHTML(resource.firstTry || "Ejemplo educativo: registrá una predicción inicial antes de empezar la actividad.")}</p></article>
            <article><span>C · OBSERVACIÓN</span><h3>¿Qué notás?</h3><p>${escapeHTML(resource.whatToObserve || "Anotá lo que observás directamente y separalo de tus posibles explicaciones.")}</p></article>
          </div>
          <div class="evidence-placeholder"><span aria-hidden="true">▧</span><div><h3>Evidencia del aprendizaje</h3><p>${escapeHTML(resource.evidencePlaceholder || "Espacio reservado para datos, esquemas o fotografías autorizadas generadas durante la actividad. No se publican resultados inventados.")}</p></div><span class="evidence-placeholder__tag">APORTE DEL AULA</span></div>
          <p class="learning-disclaimer">Esta guía es un ejemplo educativo para realizar en clase; no es un testimonio ni un resultado experimental del equipo NASA HERC.</p>
        </div>
      </section>

      <section class="learning-block learning-classroom reveal" aria-labelledby="classroom-title">
        <div class="learning-block__heading"><span>03</span><p>TRANSFERIR A LA CLASE</p></div>
        <div class="learning-block__content"><p class="eyebrow">Probalo en tu aula</p><h2 id="classroom-title">Aprender también es hacerlo en equipo.</h2>
          <div class="classroom-question"><span>PREGUNTA INICIAL</span><p>${escapeHTML(resource.initialQuestion || resource.learningChallenge)}</p></div>
          <div class="classroom-columns"><article><h3>Actividad sugerida</h3><p>${escapeHTML(resource.classroomActivity)}</p></article><article><h3>Práctica en equipo</h3><p>${escapeHTML(resource.teamPractice || "Comparen sus procedimientos, registren acuerdos y expliquen qué evidencia respalda sus ideas.")}</p></article></div>
          <div class="reflection-prompt"><span>PARA CERRAR</span><p>${escapeHTML(resource.closingReflection || "¿Qué evidencia cambió o fortaleció tu idea inicial?")}</p></div>
        </div>
      </section>

      <section class="learning-block learning-ai reveal" aria-labelledby="ai-resource-title">
        <div class="learning-block__heading"><span>04</span><p>PENSAR CRÍTICAMENTE</p></div>
        <div class="learning-block__content"><p class="eyebrow">IA en el aula</p><h2 id="ai-resource-title">La IA sugiere.<br>Vos verificás.</h2>
          <div class="ai-prompt"><span>DESAFÍO PARA EXPLORAR CON IA</span><p>${escapeHTML(resource.aiClassroomApplication)}</p></div>
          <ol class="ai-checklist"><li>Escribí tu propia explicación antes de consultar una herramienta.</li><li>Compará la respuesta generada con tus observaciones, datos o cálculos.</li><li>Señalá qué coincide, qué no coincide y qué necesitarías verificar.</li></ol>
          <p class="learning-disclaimer">Una respuesta de IA puede contener errores. No la tomes como correcta sin comprobarla con evidencia y fuentes adecuadas.</p>
        </div>
      </section>
      <footer class="learning-footer"><p>RECURSO EDUCATIVO · AULA STEM BOLIVIA</p><button class="button button--primary print-resource" type="button">Imprimir esta guía <span aria-hidden="true">▤</span></button></footer>
    </article>
  `;
  detailContent.querySelectorAll(".reveal").forEach((element, index) => element.style.setProperty("--reveal-delay", `${index * 60}ms`));
  initScrollReveal(detailContent);
  detail.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  return true;
}

function showCatalog({ scroll = false } = {}) {
  if (!catalog || !detail) return;
  detail.hidden = true;
  catalog.hidden = false;
  document.body.classList.remove("is-resource-detail");
  detailContent.replaceChildren();
  if (scroll) catalog.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

function resourceFromLocation() {
  const resourceId = new URLSearchParams(window.location.search).get("resource");
  if (!resourceId) return null;
  return resources.find((resource) => resource.id === resourceId) || null;
}

function syncDetailRoute() {
  const resource = resourceFromLocation();
  if (resource) renderDetail(resource);
  else showCatalog();
}

filterForm?.addEventListener("submit", (event) => event.preventDefault());
searchInput?.addEventListener("input", renderResources);
subjectFilter?.addEventListener("change", () => {
  shortcutList?.querySelectorAll("[data-subject]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.subject === subjectFilter.value)));
  renderResources();
});
levelFilter?.addEventListener("change", renderResources);
  filterForm?.addEventListener("reset", () => requestAnimationFrame(() => {
  shortcutList?.querySelectorAll("[data-subject]").forEach((button) => button.setAttribute("aria-pressed", "false"));
  renderResources();
}));
shortcutList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-subject]");
  if (!button) return;
  const next = subjectFilter.value === button.dataset.subject ? "" : button.dataset.subject;
  subjectFilter.value = next;
  shortcutList.querySelectorAll("[data-subject]").forEach((chip) => chip.setAttribute("aria-pressed", String(chip.dataset.subject === next)));
  renderResources();
  catalog.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
});
document.querySelector("[data-reset-filters]")?.addEventListener("click", () => filterForm?.reset());

listElement?.addEventListener("click", (event) => {
  const link = event.target.closest("[data-open-resource]");
  if (!link) return;
  const resource = resources.find((item) => item.id === link.dataset.openResource);
  if (!resource) return;
  event.preventDefault();
  history.pushState({ resourceId: resource.id }, "", link.href);
  renderDetail(resource);
});

document.querySelectorAll("[data-back-to-catalog]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  history.pushState({}, "", link.href);
  showCatalog({ scroll: true });
}));
window.addEventListener("popstate", syncDetailRoute);
document.addEventListener("click", (event) => {
  if (event.target.closest(".print-resource")) window.print();
});

renderResources();
const initialResource = resourceFromLocation();
if (initialResource) renderDetail(initialResource);
else if (window.location.search.includes("resource=")) showCatalog();
