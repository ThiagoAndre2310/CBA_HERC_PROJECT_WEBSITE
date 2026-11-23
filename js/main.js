import { activities } from "./data/activities.js";
import { resources } from "./data/resources.js";
import { members } from "./data/members.js";

const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

const resourceList = document.querySelector("#resource-list");
const activityList = document.querySelector("#activity-list");
const memberList = document.querySelector("#member-list");

if (resourceList) {
  resourceList.innerHTML = resources.map((resource) => `
    <article class="card resource-card">
      <span class="resource-card__category">${escapeHTML(resource.category)}</span>
      <h3>${escapeHTML(resource.title)}</h3>
      <p>${escapeHTML(resource.learningChallenge)}</p>
      <p class="resource-card__meta">${escapeHTML(resource.suggestedSchoolLevel)} · ${escapeHTML(resource.duration)}</p>
    </article>
  `).join("");
}

if (activityList) {
  activityList.innerHTML = activities.map((activity) => {
    const dateLabel = activity.date
      ? new Intl.DateTimeFormat("es-BO", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${activity.date}T00:00:00Z`))
      : "Fecha por confirmar";
    const locationLabel = activity.location || "Sede por confirmar";
    return `
      <article class="card activity-card">
        <p class="activity-card__date">${escapeHTML(dateLabel)}</p>
        <h3>${escapeHTML(activity.title)}</h3>
        <p>${escapeHTML(activity.description)}</p>
        <p class="activity-card__meta">${escapeHTML(activity.topic)} · ${escapeHTML(locationLabel)}</p>
      </article>
    `;
  }).join("");
}

if (memberList) {
  memberList.innerHTML = members.map((member) => `
    <article class="card team-card">
      <span class="badge">Perfil de muestra</span>
      <h3>${escapeHTML(member.name)}</h3>
      <p class="team-card__area">${escapeHTML(member.area)}</p>
      <p>${escapeHTML(member.problem)}</p>
      <p class="team-card__note">Testimonio y evidencia pendientes de verificación y autorización.</p>
    </article>
  `).join("");
}
