// ==========================================================
// Portfólio de Iris Travassos
// ==========================================================

(function () {
  "use strict";

  // ---------- Menu no celular ----------
  var botao = document.querySelector(".menu-botao");
  var menu = document.getElementById("menu");

  function fecharMenu() {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
  }

  if (botao && menu) {
    botao.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      botao.setAttribute("aria-expanded", String(aberto));
    });

    // Fecha o menu ao escolher uma seção
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", fecharMenu);
    });

    // Fecha o menu com a tecla Esc
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") {
        fecharMenu();
      }
    });
  }

  // ---------- Destaque da seção ativa no menu ----------
  var links = Array.prototype.slice.call(document.querySelectorAll(".menu a"));
  var secoes = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function marcarAtivo(id) {
    links.forEach(function (link) {
      var ativo = link.getAttribute("href") === "#" + id;
      link.classList.toggle("ativo", ativo);
      if (ativo) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && secoes.length) {
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            marcarAtivo(entrada.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    secoes.forEach(function (secao) {
      observador.observe(secao);
    });
  }

  // ---------- Animação do código na primeira seção ----------
  var linhas = document.querySelectorAll(".janela__corpo .linha");
  var semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (semAnimacao) {
    linhas.forEach(function (linha) {
      linha.classList.add("visivel");
    });
  } else {
    linhas.forEach(function (linha, indice) {
      setTimeout(function () {
        linha.classList.add("visivel");
      }, 350 + indice * 170);
    });
  }

  // ---------- Ano atual no rodapé ----------
  var ano = document.getElementById("ano");
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }
})();
