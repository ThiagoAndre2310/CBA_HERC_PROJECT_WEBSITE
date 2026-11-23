import { activities } from "./data/activities.js";
import { resources } from "./data/resources.js";
import { members } from "./data/members.js";
import "./navigation.js";
import { initScrollReveal } from "./interactions.js";

const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

const categoryNames = {
  Mathematics: "Matemáticas",
  Physics: "Física",
  Chemistry: "Química",
  Robotics: "Robótica",
  Astronomy: "Astronomía",
};

const resourceList = document.querySelector("#resource-list");
if (resourceList) {
  resourceList.innerHTML = resources.map((resource, index) => `
    <article class="resource-card reveal" data-category="${escapeHTML(resource.category)}">
      <div class="resource-card__top"><span class="resource-card__index">0${index + 1}</span><span class="resource-card__category">${escapeHTML(categoryNames[resource.category] || resource.category)}</span></div>
      <span class="resource-card__symbol" aria-hidden="true">${["∑", "↗", "◉", "⌘", "✦"][index % 5]}</span>
      <h3>${escapeHTML(resource.title)}</h3>
      <p>${escapeHTML(resource.learningChallenge)}</p>
      <span class="resource-card__meta">${escapeHTML(resource.suggestedSchoolLevel)} <i></i> ${escapeHTML(resource.duration)}</span>
      <span class="resource-card__arrow" aria-hidden="true">↗</span>
    </article>
  `).join("");
}

const activityList = document.querySelector("#activity-list");
if (activityList) {
  const monthNames = { "2027-01": "ENERO", "2027-02": "FEBRERO" };
  const orderedMonths = ["2027-01", "2027-02"];
  activityList.innerHTML = orderedMonths.map((month) => {
    const monthActivities = activities.filter((activity) => activity.month === month);
    if (!monthActivities.length) return "";
    const cards = monthActivities.map((activity, index) => {
      const dateLabel = activity.date
        ? new Intl.DateTimeFormat("es-BO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${activity.date}T00:00:00Z`))
        : "Fecha por confirmar";
      return `
        <article class="activity-card reveal">
          <span class="activity-card__number">${String(index + 1).padStart(2, "0")}</span>
          <div class="activity-card__body"><p class="activity-card__date">${escapeHTML(dateLabel)}</p><h3>${escapeHTML(activity.title)}</h3><p>${escapeHTML(activity.description)}</p><span class="activity-card__meta">${escapeHTML(activity.topic)} <i></i> ${escapeHTML(activity.location || "Sede por confirmar")}</span></div>
          <span class="activity-card__mark" aria-hidden="true">↗</span>
        </article>
      `;
    }).join("");
    return `<section class="agenda-month" aria-labelledby="month-${month}"><div class="agenda-month__label"><span>${monthNames[month] || month}</span><b>2027</b></div><div class="agenda-month__items" id="month-${month}">${cards}</div></section>`;
  }).join("");
}

const memberList = document.querySelector("#member-list");
if (memberList) {
  memberList.innerHTML = members.map((member) => `
    <article class="member-feature reveal">
      <div class="member-feature__portrait" aria-hidden="true"><span>H</span><i></i><b></b></div>
      <div class="member-feature__copy"><span class="badge">Perfil de muestra</span><h3>${escapeHTML(member.name)}</h3><p>${escapeHTML(member.area)}</p><p class="member-feature__note">Perfil de demostración; faltan datos verificados y autorización para publicar una experiencia personal.</p></div>
    </article>
  `).join("");
}

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
});
initScrollReveal();
