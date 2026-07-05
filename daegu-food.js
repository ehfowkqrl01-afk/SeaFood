(function () {
  "use strict";

  const API_BASE = "https://www.daegufood.go.kr/kor/api/tasty.html";
  const CORS_PROXY = "https://api.allorigins.win/raw?url=";
  const PAGE_SIZE = 12;

  const DISTRICTS = [
    "중구",
    "동구",
    "서구",
    "남구",
    "북구",
    "수성구",
    "달서구",
    "달성군",
    "군위군"
  ];

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const districtBar = document.getElementById("districtBar");
  const foodSearch = document.getElementById("foodSearch");
  const foodCount = document.getElementById("foodCount");
  const foodStatus = document.getElementById("foodStatus");
  const foodError = document.getElementById("foodError");
  const foodErrorMsg = document.getElementById("foodErrorMsg");
  const foodRetryBtn = document.getElementById("foodRetryBtn");
  const foodGrid = document.getElementById("foodGrid");
  const foodPagination = document.getElementById("foodPagination");
  const foodPrevBtn = document.getElementById("foodPrevBtn");
  const foodNextBtn = document.getElementById("foodNextBtn");
  const foodPageInfo = document.getElementById("foodPageInfo");
  const districtHint = document.getElementById("districtHint");
  const foodModal = document.getElementById("foodModal");
  const foodModalBackdrop = document.getElementById("foodModalBackdrop");
  const foodModalClose = document.getElementById("foodModalClose");
  const foodModalTitle = document.getElementById("foodModalTitle");
  const foodModalBody = document.getElementById("foodModalBody");

  let currentDistrict = "";
  let allItems = [];
  let filteredItems = [];
  let currentPage = 1;
  let loading = false;

  function initHeader() {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });

    if (menuToggle && nav) {
      menuToggle.addEventListener("click", function () {
        const open = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
      });

      nav.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function buildDistrictButtons() {
    districtBar.innerHTML = DISTRICTS.map(function (district) {
      return (
        '<button type="button" class="filter-btn" data-district="' +
        district +
        '" role="tab" aria-selected="false">' +
        district +
        "</button>"
      );
    }).join("");

    districtBar.addEventListener("click", function (event) {
      const btn = event.target.closest("[data-district]");
      if (!btn || loading) return;
      selectDistrict(btn.dataset.district);
    });
  }

  function setDistrictActive(district) {
    districtBar.querySelectorAll("[data-district]").forEach(function (btn) {
      const active = btn.dataset.district === district;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });
  }

  function showLoading(show) {
    loading = show;
    foodStatus.hidden = !show;
    if (show) {
      foodError.hidden = true;
      foodGrid.innerHTML = "";
      foodPagination.hidden = true;
    }
  }

  function showError(message) {
    foodError.hidden = false;
    foodErrorMsg.textContent = message;
    foodGrid.innerHTML = "";
    foodPagination.hidden = true;
    foodCount.textContent = "";
  }

  async function fetchJson(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (directErr) {
      const proxyUrl = CORS_PROXY + encodeURIComponent(url);
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error("맛집 데이터를 불러오지 못했습니다.");
      return await res.json();
    }
  }

  async function loadDistrict(district) {
    showLoading(true);
    foodSearch.value = "";

    try {
      const url =
        API_BASE + "?mode=json&addr=" + encodeURIComponent(district);
      const json = await fetchJson(url);

      if (json.status && json.status !== "DONE") {
        throw new Error("API 응답 오류: " + json.status);
      }

      allItems = Array.isArray(json.data) ? json.data : [];
      filteredItems = allItems.slice();
      currentPage = 1;

      districtHint.textContent =
        district + " · 총 " + (json.total || allItems.length) + "곳";

      renderList();
    } catch (err) {
      showError(
        err.message ||
          "맛집 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      showLoading(false);
    }
  }

  function selectDistrict(district) {
    if (currentDistrict === district && allItems.length) return;
    currentDistrict = district;
    setDistrictActive(district);
    loadDistrict(district);
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function stripHtml(html) {
    if (!html) return "";
    return String(html)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .trim();
  }

  function getCategoryEmoji(category) {
    const map = {
      "한식": "🍚",
      "중식": "🥟",
      "일식": "🍣",
      "양식": "🍝",
      "분식": "🍜",
      "카페": "☕",
      "디저트": "🍰",
      "술집": "🍶",
      "해산물": "🦐",
      "고기": "🥩",
      "치킨": "🍗",
      "패스트푸드": "🍔"
    };
    for (const key in map) {
      if (category && category.indexOf(key) !== -1) return map[key];
    }
    return "🍽️";
  }

  function applySearch() {
    const q = foodSearch.value.trim().toLowerCase();
    if (!q) {
      filteredItems = allItems.slice();
    } else {
      filteredItems = allItems.filter(function (item) {
        const text = [
          item.BZ_NM,
          item.FD_CS,
          item.GNG_CS,
          item.SMPL_DESC
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return text.indexOf(q) !== -1;
      });
    }
    currentPage = 1;
    renderList();
  }

  function renderList() {
    foodError.hidden = true;

    if (!filteredItems.length) {
      foodGrid.innerHTML =
        '<p class="food-empty">표시할 맛집이 없습니다. 다른 검색어나 구·군을 선택해 보세요.</p>';
      foodCount.textContent = "0곳";
      foodPagination.hidden = true;
      return;
    }

    const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filteredItems.slice(start, start + PAGE_SIZE);

    foodGrid.innerHTML = pageItems
      .map(function (item, idx) {
        const globalIdx = start + idx;
        const name = escapeHtml(item.BZ_NM || "이름 없음");
        const category = escapeHtml(item.FD_CS || "음식점");
        const address = escapeHtml(item.GNG_CS || "");
        const desc = escapeHtml(stripHtml(item.SMPL_DESC || "").slice(0, 80));
        const emoji = getCategoryEmoji(item.FD_CS);

        return (
          '<article class="food-card" data-index="' +
          globalIdx +
          '">' +
          '<div class="food-card-thumb" aria-hidden="true">' +
          emoji +
          "</div>" +
          '<div class="food-card-body">' +
          '<div class="food-card-meta">' +
          '<span class="food-card-category">' +
          category +
          "</span>" +
          (item.MBZ_HR
            ? '<span class="food-card-hours">' +
              escapeHtml(item.MBZ_HR.split("(")[0].trim()) +
              "</span>"
            : "") +
          "</div>" +
          "<h3>" +
          name +
          "</h3>" +
          (address ? '<p class="food-card-address">' + address + "</p>" : "") +
          (desc ? '<p class="food-card-desc">' + desc + "…</p>" : "") +
          '<button type="button" class="card-btn food-detail-btn" data-index="' +
          globalIdx +
          '">상세 보기 →</button>' +
          "</div></article>"
        );
      })
      .join("");

    foodCount.textContent =
      filteredItems.length +
      "곳" +
      (foodSearch.value.trim() ? " (검색 결과)" : "");

    if (totalPages > 1) {
      foodPagination.hidden = false;
      foodPageInfo.textContent = currentPage + " / " + totalPages;
      foodPrevBtn.disabled = currentPage <= 1;
      foodNextBtn.disabled = currentPage >= totalPages;
    } else {
      foodPagination.hidden = true;
    }
  }

  function openDetail(index) {
    const item = filteredItems[index];
    if (!item) return;

    foodModalTitle.textContent = item.BZ_NM || "맛집 정보";

    const rows = [
      ["음식 종류", item.FD_CS],
      ["주소", item.GNG_CS],
      ["연락처", item.TLNO],
      ["영업시간", item.MBZ_HR],
      ["좌석", item.SEAT_CNT],
      ["주차", item.PKPL],
      ["예약", item.BKN_YN],
      ["지하철", item.SBW],
      ["버스", item.BUS]
    ];

    let html = "";
    if (item.SMPL_DESC) {
      html +=
        '<p class="food-modal-desc">' +
        escapeHtml(stripHtml(item.SMPL_DESC)) +
        "</p>";
    }

    html += '<dl class="food-detail-list">';
    rows.forEach(function (row) {
      if (!row[1] || row[1] === "없음" || row[1] === "불가능") return;
      html +=
        "<div><dt>" +
        row[0] +
        "</dt><dd>" +
        escapeHtml(String(row[1])) +
        "</dd></div>";
    });
    html += "</dl>";

    if (item.MNU) {
      html +=
        '<div class="food-modal-menu"><h4>메뉴</h4><div class="food-menu-list">' +
        item.MNU +
        "</div></div>";
    }

    if (item.HP && item.HP !== "없음" && item.HP.indexOf("http") === 0) {
      html +=
        '<p class="food-modal-link"><a href="' +
        escapeHtml(item.HP) +
        '" target="_blank" rel="noopener noreferrer">웹사이트 방문 →</a></p>';
    }

    foodModalBody.innerHTML = html;
    foodModal.setAttribute("aria-hidden", "false");
    foodModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    foodModal.setAttribute("aria-hidden", "true");
    foodModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function bindEvents() {
    foodSearch.addEventListener("input", applySearch);

    foodGrid.addEventListener("click", function (event) {
      const btn = event.target.closest(".food-detail-btn");
      if (!btn) return;
      openDetail(Number(btn.dataset.index));
    });

    foodPrevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage -= 1;
        renderList();
        foodGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    foodNextBtn.addEventListener("click", function () {
      const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
      if (currentPage < totalPages) {
        currentPage += 1;
        renderList();
        foodGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    foodRetryBtn.addEventListener("click", function () {
      if (currentDistrict) loadDistrict(currentDistrict);
    });

    foodModalClose.addEventListener("click", closeModal);
    foodModalBackdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });
  }

  function initFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const district = params.get("district");
    if (district && DISTRICTS.indexOf(district) !== -1) {
      selectDistrict(district);
      return;
    }
    selectDistrict("중구");
  }

  initHeader();
  buildDistrictButtons();
  bindEvents();
  initFromQuery();
})();
