const brief = [
  { label: "Landing page design", tag: "Included", note: "Home page only, 1 revision round." },
  { label: "Mobile responsiveness", tag: "Included", note: "Responsive across common breakpoints." },
  { label: "Forms integration", tag: "Included", note: "Single contact form wired to the CRM." },
];

const requests = [
  { label: "Add dark mode", tag: "+1 ask", note: "Not in the original brief, but 'quick'." },
  { label: "Create admin dashboard", tag: "+1 ask", note: "A whole extra surface area, same deadline." },
  { label: "Add analytics events", tag: "+1 ask", note: "Now the build needs tracking and QA." },
  { label: "Can we also do copywriting?", tag: "+1 ask", note: "This is now multiple disciplines." },
];

const briefList = document.getElementById("brief-list");
const requestList = document.getElementById("request-list");
const changeOrder = document.getElementById("change-order");
const driftStatus = document.getElementById("drift-status");
const driftNote = document.getElementById("drift-note");
const template = document.getElementById("item-template");

function renderList(target, items, stateClass) {
  target.innerHTML = "";
  items.forEach((item) => {
    const node = template.content.cloneNode(true);
    const article = node.querySelector(".item");
    article.classList.add(stateClass);
    node.querySelector("strong").textContent = item.label;
    node.querySelector(".tag").textContent = item.tag;
    node.querySelector("p").textContent = item.note;
    target.appendChild(node);
  });
}

function renderChangeOrder() {
  changeOrder.innerHTML = `
    <strong>Draft change order</strong>
    <p>The following requests exceed the original brief and should be approved before work resumes:</p>
    <ul>
      <li>Additional UI surface: admin dashboard</li>
      <li>New feature scope: dark mode and analytics</li>
      <li>Extra discipline: copywriting support</li>
      <li>Revised estimate: +3 days, +£1,250</li>
    </ul>
  `;
  changeOrder.classList.add("flag");
  driftStatus.textContent = "Scope drift detected";
  driftNote.textContent = "A change order has been drafted from the extra requests.";
}

function renderGoodState() {
  changeOrder.innerHTML = `
    <strong>No change order needed</strong>
    <p>The current request list still matches the original brief. Keep going.</p>
  `;
  changeOrder.classList.remove("flag");
  driftStatus.textContent = "Monitoring";
  driftNote.textContent = "No deviation detected yet.";
}

document.getElementById("load-btn").addEventListener("click", () => {
  renderList(briefList, brief, "good");
  renderList(requestList, requests, "flag");
  renderChangeOrder();
});

renderList(briefList, brief, "good");
renderList(requestList, [], "flag");
renderGoodState();
