// Fahm website: language choice and the sample quiz. Everything works without it.
(function () {
  var store = {
    get: function () { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem("lang", v); } catch (e) {} },
  };

  // Remember a language the visitor picks.
  document.querySelectorAll("a[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () { store.set(a.getAttribute("data-lang")); });
  });

  // First visit to the English home page from a browser in another language the site has:
  // open that one. Never on a return visit or after a choice, and never from inside the site.
  var home = document.body.getAttribute("data-home");
  if (home === "en" && !store.get()) {
    var langs = navigator.languages || [navigator.language || ""];
    var code = (langs[0] || "").slice(0, 2).toLowerCase();
    if (code === "in") code = "id"; // old Android code for Indonesian
    var fromSite = document.referrer && document.referrer.indexOf(location.host) !== -1;
    var link = code !== "en" && document.querySelector('a[data-lang="' + code + '"]');
    if (!fromSite && link) location.replace(link.href);
  }

  // The sample question in "How a lesson works".
  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var verdict = quiz.querySelector(".verdict");
    var buttons = quiz.querySelectorAll("button");
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var right = b.getAttribute("data-right") === "true";
        buttons.forEach(function (o) {
          o.disabled = true;
          if (o.getAttribute("data-right") === "true") o.classList.add("right");
        });
        if (!right) b.classList.add("wrong");
        verdict.textContent = quiz.getAttribute(right ? "data-right" : "data-wrong");
      });
    });
  });
})();
