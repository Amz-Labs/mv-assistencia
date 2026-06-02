(function () {
  /**
   * MV Assistência — App JS
   * Funções:
   * 1. Scroll suave para âncoras internas
   * 2. Tracking global de cliques via data-event/data-source para GTM/GA4
   */

  // =========================================================
  // 1. Scroll suave para âncoras internas
  // =========================================================
  document.addEventListener("click", function (e) {
    const anchor = e.target.closest('a[href^="#"]');

    if (!anchor) return;

    const id = anchor.getAttribute("href");

    // Evita erro em links temporários href="#"
    if (!id || id === "#") return;

    const target = document.querySelector(id);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    history.pushState(null, "", id);
  });

  // =========================================================
  // 2. Tracking global para GTM/GA4
  // =========================================================
  document.addEventListener("click", function (e) {
    const element = e.target.closest("[data-event]");

    if (!element) return;

    const eventName = element.getAttribute("data-event");
    const eventSource = element.getAttribute("data-source") || "unknown";
    const eventText = (element.innerText || element.getAttribute("aria-label") || "").trim();
    const eventHref = element.getAttribute("href") || null;

    if (!eventName) return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: eventName,
      event_category: "engagement",
      event_label: eventSource,
      event_source: eventSource,
      click_text: eventText,
      click_url: eventHref,
      page_path: window.location.pathname,
      page_url: window.location.href,
      referrer: document.referrer || null
    });
  });

  // =========================================================
  // 3. Tracking global para submit de formulários com data-event
  // =========================================================
  document.addEventListener("submit", function (e) {
    const form = e.target.closest("form[data-event]");

    if (!form) return;

    const eventName = form.getAttribute("data-event");
    const eventSource = form.getAttribute("data-source") || "unknown";
    const formId = form.getAttribute("id") || null;
    const formAction = form.getAttribute("action") || null;

    if (!eventName) return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: eventName,
      event_category: "lead",
      event_label: eventSource,
      event_source: eventSource,
      form_id: formId,
      form_action: formAction,
      page_path: window.location.pathname,
      page_url: window.location.href,
      referrer: document.referrer || null
    });
  });
})();