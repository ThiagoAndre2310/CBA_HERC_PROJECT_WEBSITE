import { activities } from "./data/activities.js";
import "./navigation.js";
import { initScrollReveal } from "./interactions.js";

const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

const monthInfo = {
  "2027-01": { name: "Enero", short: "ENE", theme: "Cine CBA", type: "Encuentro audiovisual" },
  "2027-02": { name: "Febrero", short: "FEB", theme: "Escuelas y feria STEM", type: "Actividad escolar" },
};
const monthOrder = ["2027-01", "2027-02"];
const fair = activities.find((activity) => activity.id === "feb-2027-cba-stem-fair");
const calendarActivities = activities.filter((activity) => activity.id !== fair?.id && monthInfo[activity.month]);
const timeline = document.querySelector("#outreach-timeline");
const results = document.querySelector("#outreach-results");
const fairPanel = document.querySelector("#outreach-fair-panel");
const monthFilters = document.querySelector(".outreach-month-filters");

function formatConfirmedDate(date) {
  if (!date) return "Fecha por confirmar";
  return new Intl.DateTimeFormat("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function renderActivity(activity, index) {
  const month = monthInfo[activity.month];
  const kind = activity.location === "CINE CBA" ? "Cine CBA" : "Visita escolar";
  const resourceIsAvailable = activity.educationalResource && activity.educationalResource !== "Pendiente de definir";
  const resourceLink = resourceIsAvailable
    ? `<a class="outreach-card__resource" href="./stem.html?resource=${encodeURIComponent(activity.educationalResource)}#resource-detail">Abrir recurso educativo <span aria-hidden="true">↗</span></a>`
    : `<p class="outreach-card__pending">Recurso educativo: pendiente de definir.</p>`;

  return `
    <details class="outreach-card reveal">
      <summary>
        <span class="outreach-card__index">${String(index + 1).padStart(2, "0")}</span>
        <span class="outreach-card__main">
          <span class="outreach-card__tags"><span class="outreach-tag">${escapeHTML(kind)}</span><span class="outreach-card__date">${escapeHTML(formatConfirmedDate(activity.date))}</span></span>
          <span class="outreach-card__title">${escapeHTML(activity.title)}</span>
          <span class="outreach-card__topic">${escapeHTML(activity.topic)}</span>
        </span>
        <span class="outreach-card__toggle" aria-hidden="true">+</span>
      </summary>
      <div class="outreach-card__detail">
        <p>${escapeHTML(activity.description)}</p>
        <p class="outreach-card__location"><span>LUGAR</span>${escapeHTML(activity.location || "Sede por confirmar")}</p>
        ${resourceLink}
      </div>
    </details>
  `;
}

if (timeline) {
  timeline.innerHTML = monthOrder.map((month) => {
    const monthActivities = calendarActivities
      .filter((activity) => activity.month === month)
      .map((activity, originalIndex) => ({ activity, originalIndex }))
      .sort((a, b) => {
        if (!a.activity.date) return b.activity.date ? 1 : a.originalIndex - b.originalIndex;
        if (!b.activity.date) return -1;
        return a.activity.date.localeCompare(b.activity.date);
      });
    if (!monthActivities.length) return "";
    const info = monthInfo[month];
    const cards = monthActivities.map(({ activity }, index) => renderActivity(activity, index)).join("");
    return `
      <section class="outreach-month reveal" data-outreach-month="${month}" aria-labelledby="outreach-month-${month}">
        <div class="outreach-month__marker"><span>${info.short}</span><i></i></div>
        <div class="outreach-month__content">
          <header class="outreach-month__header"><div><p>${escapeHTML(info.theme)}</p><h3 id="outreach-month-${month}">${info.name} <span>2027</span></h3></div><span class="outreach-month__count">${String(monthActivities.length).padStart(2, "0")} ACTIVIDADES</span></header>
          <div class="outreach-activity-list">${cards}</div>
        </div>
      </section>
    `;
  }).join("");
}

if (fairPanel && fair) {
  fairPanel.innerHTML = `
    <div class="outreach-fair__copy">
      <p class="eyebrow">${escapeHTML(fair.topic)} · FECHA CONFIRMADA</p>
      <h2 id="outreach-fair-title">CBA STEM <span>Fair.</span></h2>
      <p>${escapeHTML(fair.description)}</p>
      <p class="outreach-fair__purpose">Un espacio para compartir preguntas, ideas y aprendizajes de ciencia, tecnología, ingeniería y matemáticas.</p>
      <p class="outreach-fair__venue">${escapeHTML(fair.location || "Sede por confirmar")}</p>
      <a class="button button--primary" href="./stem.html">Explorar recursos STEM <span aria-hidden="true">↗</span></a>
    </div>
    <div class="outreach-fair__date" aria-label="${escapeHTML(formatConfirmedDate(fair.date))}">
      <span class="outreach-fair__date-label">RESERVÁ LA FECHA</span>
      <time datetime="${escapeHTML(fair.date)}"><span>${escapeHTML(fair.date.slice(8, 10))}</span><b>FEB</b><i>2027</i></time>
      <span class="outreach-fair__date-status">DÍA CONFIRMADO · SEDE POR CONFIRMAR</span>
    </div>
    <div class="outreach-fair__orbit" aria-hidden="true"><span></span><i></i><b></b></div>
  `;
}

function updateCalendar(month = "all") {
  const sections = [...(timeline?.querySelectorAll("[data-outreach-month]") || [])];
  let visibleCount = 0;
  sections.forEach((section) => {
    const isVisible = month === "all" || section.dataset.outreachMonth === month;
    section.hidden = !isVisible;
    if (isVisible) visibleCount += section.querySelectorAll(".outreach-card").length;
  });
  if (results) results.textContent = `${visibleCount} ${visibleCount === 1 ? "actividad" : "actividades"} en el calendario`;
  monthFilters?.querySelectorAll("[data-month-filter]").forEach((button) => {
    const isActive = button.dataset.monthFilter === month;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

monthFilters?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-month-filter]");
  if (button) updateCalendar(button.dataset.monthFilter);
});

if (timeline) initScrollReveal(timeline);
if (fairPanel) initScrollReveal(fairPanel);
updateCalendar();
