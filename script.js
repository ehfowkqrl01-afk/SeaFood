(function () {
  "use strict";

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const restaurantCards = document.querySelectorAll(".restaurant-card");
  const filterResult = document.getElementById("filterResult");
  const contactForm = document.getElementById("contactForm");
  const modal = document.getElementById("modal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const toast = document.getElementById("toast");
  const cardBtns = document.querySelectorAll(".card-btn");

  const IMG = {
    sashimi: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvcx-qdIxrATaYLsqIbLVu1Tt_AsXn51JUz-gsI7lYL0dRvyHlFXpbHxujQ_eT6NgyNqml4nttJe03CQBBaLxL7lc_4cnE8MMKVMGoKKLBgRE3sPS3R-Z_oYgJT4Uaoe78qJgXy52Jlh7cjsPS0AWM54Xl08_sZVBDx90c2dxyJHVxIz17WCyHkcWDTHyOygoqohKql7xhjtsxIzrIu-O4aUYlk81lztQgJPzBN-9gXBDlsRSYOmBv",
    sashimiPlatter: "https://lh3.googleusercontent.com/aida-public/AB6AXuBygBqXcpg_GfPp28BP6JyXl3t1Z0_ql9aDwl-jMHvWg8uBy7z36NoqZvwgjX9o4wTO_XD9cusFHTmUPYCWhwk5spAxQi3m-jcq0YDkoNtylEr-IeGILRlKw4wwihh5au8h--jYLynK4SmUy5xSkrZkbtiFwqY7-eNCc8sc13d9qrvXt0tnpqCknE4-im-Rw69iGMg1gEcVEfGtA-K6JOCnlatN69Ra7h9Z51QSqRIXU9OvV1jpWizZ",
    haemultang: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvKUx1b7979JWXh5zS7NgSOlpPY1WpMm5FQl9kbVifogOWkH6mrgTNVAI-mpcUvxcvdwEhW6C9fgJnSbCi1EJ9-i4DkdDs2YAT31DA6XzRUBhic0jpQ0yhJiA5ilpvLkeTTrQETmGn5MLpv0Vnj5dvbSHhV9vcAwrBybRkpF0aIvEMA_SfDKPq79zZVhfUkH0NNPmFmff7bv0urppjFeyXyfvbgB4SnCZ48BDvx08FLY5XX3go_BI-",
    seafoodSoup: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLSfymGY3mE40JYmgLPRUoKETvaFt37xZVwAV5IeR-BHYX2r7NbfTWFfJEiufYbb3ttTTKTZ-a-W1rXpYF7aSioM0b9YacS4cWj8iupRMJdC2LgZEG74cVwbbifzchlBzE759LITcg0cGrEKEigmRY0yNW4C2O4IFy7MKycuRlQSzT08OVduGmxl7KEo9QQaYjJdNDW-pxT7n7CmlgWbxN_gLVZ88mAYdyRiuFYYfNRcD2H8sQ6D-x",
    fishMarket: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc7Q_ahPXGSN46oCNPf3fmUdjS5Sg1ArObXfZ787bM79ThWmkIgx4YfzvPl0BB5FkOp-Z2MiFoFO5dWCIWlVcj2TB-TwUCyZofg3DCpwS8T0n77aIuG9LVcfKo19tdd1GozBazCK4Gi_TleqE8aRg3lJIfLTg56I2pzGJn3JOJJDw7AUuq9laIao-tq1_DK4gBb_FU3VOipVSvYVqm9kEwdH2o3_vGB1FRlBeANG4eIX-8W8diG_br",
    grilledSeafood: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_EhDiHIPONGhExdaR9Q7gP8bW-LKm4XhAEoYmTaEXTHYs5RFAWzYTBJHKi2SQf0RGNf9UwsbswmResdJILB-nvHr3MLy3rDSoaivaF9wSjPLR1bWdQXZdlcw_917PCIqDM809uZvAmBzXfu6JnWIse4mp60RDkCf4y9n2A5mLBDoKgLpQhyJZ2I6bHcQAgTd09FYS35j1hTfGoO-x46FjJg48lHSsA5JPRHG8qPtb-b3Ux7E2DzZC",
    clams: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRUX52MSBMnPGkVA6LLzDzm7s9q9YDK98QgO6ob0_BcensOrzj2YXlNKuO4nBJaUiIX7p2k7A90du-4AvDbukFYVjlWge7AopmhIQcUR9WhO3D3acQYtoHuYYo5L6Os1Bsp1jhNdTykH-ab8tm_tCkc1r7e35EK3rOdaMmzL3G-B_cjsC-ONrHkCkTAFWeMK3NRbLjv7biSgyrQhWDUGzp29pDfaA5pcWK1e1NoRe8DxAH8dwvp4sc",
    riceBowl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPx6eI6WG_JxJuH-nrGzO9FpJ2mzqsuDa6wfEGHKEzX3TsnqEZ957I-RY1hAQh421bbRMDmQVfHINlWEh-5WHioi0pHf708UTHXiBRGdFRdFswv4jBBRYo8Qy1gBI3Qna9n_6AwkdKuR_lPQlTDP9be18A5J1B1Kj-aeE6ugjb-tJdMkIWOmPfWrvxshJoVDom9pJiZWLrXtTIaBhI6hpZEW1GdtgX8kdXf_g18O2EkzcXUuG_WvbD",
    kingCrab: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgo7FT7vFPrz-GrL-tMdfoy5bWEczOpLtWTx5yi-uxnNOGDXO1FX7ckOc2MRH0ehiVM1B_rDwuBeLlT6MQKLKJxQ94xdZE1607IbJSKoi_g0sBkmqjzOsSc21ZkRZLkEZqUgjgXbyo4a0rYT7PIESJjAIQb5i4h-4soBDSuUpkh0z1fX-oA4Z_4PuxI7BV6GTg48XryA8v5J9tCNn7vycbjm7MhfNcnlCNM008RwNTw3oO10x8nhIs",
    seafoodIce: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc7Q_ahPXGSN46oCNPf3fmUdjS5Sg1ArObXfZ787bM79ThWmkIgx4YfzvPl0BB5FkOp-Z2MiFoFO5dWCIWlVcj2TB-TwUCyZofg3DCpwS8T0n77aIuG9LVcfKo19tdd1GozBazCK4Gi_TleqE8aRg3lJIfLTg56I2pzGJn3JOJJDw7AUuq9laIao-tq1_DK4gBb_FU3VOipVSvYVqm9kEwdH2o3_vGB1FRlBeANG4eIX-8W8diG_br",
    salmon: "https://lh3.googleusercontent.com/aida-public/AB6AXuBygBqXcpg_GfPp28BP6JyXl3t1Z0_ql9aDwl-jMHvWg8uBy7z36NoqZvwgjX9o4wTO_XD9cusFHTmUPYCWhwk5spAxQi3m-jcq0YDkoNtylEr-IeGILRlKw4wwihh5au8h--jYLynK4SmUy5xSkrZkbtiFwqY7-eNCc8sc13d9qrvXt0tnpqCknE4-im-Rw69iGMg1gEcVEfGtA-K6JOCnlatN69Ra7h9Z51QSqRIXU9OvV1jpWizZ"
  };

  const restaurantDetails = {
    "통영생선회 동성로점": {
      image: IMG.sashimi,
      address: "대구 중구 동성로2길 80",
      hours: "11:30 – 22:00 (브레이크타임 15:00–17:00)",
      desc: "동성로 중심에 위치한 대표 횟집. 제철 회와 모듬 사시미가 풍성하고 2인 세트부터 합리적인 가격대가 강점입니다.",
      menu: [
        { name: "모듬회 2인 세트", price: "₩45,000", image: IMG.sashimiPlatter },
        { name: "연어+광어 콤보", price: "₩38,000", image: IMG.salmon },
        { name: "특선 사시미 (1인)", price: "₩28,000", image: IMG.sashimi },
        { name: "매운탕 추가", price: "₩8,000", image: IMG.seafoodSoup }
      ],
      parking: "매장 전용 주차 없음. 동성로 공영주차장(도보 3분) 및 인근 유료 주차장 이용. 평일 저녁·주말 혼잡 시 주차 대기 가능."
    },
    "수성못 해물왕": {
      image: IMG.haemultang,
      address: "대구 수성구 범어동 177-3",
      hours: "11:00 – 21:30 (라스트 오더 21:00)",
      desc: "수성못 근처에서 가족 외식하기 좋은 해물탕·해물찜 전문점. 국물이 진하고 해산물 양이 넉넉합니다.",
      menu: [
        { name: "해물탕 (中)", price: "₩45,000", image: IMG.haemultang },
        { name: "해물탕 (大)", price: "₩65,000", image: IMG.seafoodSoup },
        { name: "아구찜 (中)", price: "₩55,000", image: IMG.grilledSeafood },
        { name: "해물파전", price: "₩18,000", image: IMG.seafoodIce }
      ],
      parking: "매장 앞 무료 주차 8대 가능. 만차 시 인근 범어 주차타워(유료, 도보 5분) 이용. 주말 점심 시간대 만차 주의."
    },
    "칠곡수산시장 회센터": {
      image: IMG.fishMarket,
      address: "대구 북구 칠곡중앙대로 672 (칠곡 3지구 수산시장)",
      hours: "09:00 – 19:00 (시장 휴무: 둘째·넷째 수요일)",
      desc: "칠곡 수산시장 안의 회센터. 직접 고른 활어로 즉석 회를 떠주며, 현지인들의 단골 비율이 높습니다.",
      menu: [
        { name: "활어회 (100g)", price: "시세", image: IMG.fishMarket },
        { name: "모듬회 (2~3인)", price: "₩35,000~", image: IMG.sashimiPlatter },
        { name: "조개구이 세트", price: "₩25,000", image: IMG.clams },
        { name: "매운탕", price: "₩10,000", image: IMG.haemultang }
      ],
      parking: "수산시장 대형 주차장 무료 (약 200대). 오전 10~12시가 가장 여유롭고, 주말 오전 11시 이후 만차 빈번."
    },
    "조개마을 월성점": {
      image: IMG.grilledSeafood,
      address: "대구 달서구 월성로 45",
      hours: "16:00 – 24:00 (라스트 오더 23:00)",
      desc: "조개구이와 해물파전이 시그니처. 숯불 향이 살아있는 조개구이와 함께 소주 한잔하기 좋은 분위기입니다.",
      menu: [
        { name: "조개구이 모듬 (2인)", price: "₩38,000", image: IMG.grilledSeafood },
        { name: "조개구이 모듬 (3~4인)", price: "₩58,000", image: IMG.clams },
        { name: "해물파전", price: "₩16,000", image: IMG.seafoodIce },
        { name: "라면사리 추가", price: "₩2,000", image: IMG.haemultang }
      ],
      parking: "건물 뒤편 전용 주차장 12대 (무료). 18시 이후 만차 시 인근 골목 노상 주차 가능하나 단속 구역 확인 필요."
    },
    "바다밥상 반월당": {
      image: IMG.riceBowl,
      address: "대구 중구 반월당로 12",
      hours: "11:00 – 21:00 (브레이크타임 14:30–17:00)",
      desc: "점심 회덮밥과 저녁 사시미 정식이 인기. 깔끔한 일식 스타일로 혼밥·데이트 모두 무난합니다.",
      menu: [
        { name: "회덮밥 (점심 특선)", price: "₩12,000", image: IMG.riceBowl },
        { name: "모듬 사시미 정식", price: "₩32,000", image: IMG.sashimiPlatter },
        { name: "연어 초밥 세트", price: "₩18,000", image: IMG.salmon },
        { name: "우동 추가", price: "₩5,000", image: IMG.sashimi }
      ],
      parking: "전용 주차 없음. 반월당 지하주차장(유료, 도보 2분) 또는 대구은행 본점 인근 공영주차장 이용. 지하철 1·2호선 반월당역 도보 3분."
    },
    "킹크랩 수성": {
      image: IMG.kingCrab,
      address: "대구 수성구 만촌동 1024-5",
      hours: "11:30 – 22:00 (예약제, 라스트 오더 21:00)",
      desc: "특별한 날 방문하기 좋은 대게·킹크랩 전문점. 코스 메뉴와 단품 주문 모두 가능하며, 단체석 예약을 추천합니다.",
      menu: [
        { name: "킹크랩 1kg (시세)", price: "₩85,000~", image: IMG.kingCrab },
        { name: "대게찜 (2인)", price: "₩90,000", image: IMG.kingCrab },
        { name: "해물 코스 A (2인)", price: "₩120,000", image: IMG.seafoodIce },
        { name: "랍스터 추가", price: "₩45,000", image: IMG.grilledSeafood }
      ],
      parking: "건물 지하 전용 주차장 무료 (30대). 2시간 무료, 이후 30분당 ₩1,000. 4인 이상 방문 시 사전 예약 시 주차 안내 문자 발송."
    }
  };

  function buildModalHTML(data) {
    const menuItems = data.menu
      .map(function (item) {
        return (
          "<li>" +
          '<img class="menu-thumb" src="' + item.image + '" alt="' + item.name + '" referrerpolicy="no-referrer" loading="lazy">' +
          '<div class="menu-text">' +
          '<span class="menu-name">' + item.name + "</span>" +
          '<span class="menu-price">' + item.price + "</span>" +
          "</div></li>"
        );
      })
      .join("");

    return (
      (data.image
        ? '<img class="modal-hero-img" src="' + data.image + '" alt="" referrerpolicy="no-referrer" loading="lazy">'
        : "") +
      '<div class="modal-section">' +
      '<p class="modal-desc">' + data.desc + "</p>" +
      '<dl class="modal-info">' +
      "<div><dt>주소</dt><dd>" + data.address + "</dd></div>" +
      "<div><dt>영업</dt><dd>" + data.hours + "</dd></div>" +
      "</dl>" +
      "</div>" +
      '<div class="modal-section">' +
      '<h4 class="modal-section-title">대표 메뉴</h4>' +
      '<ul class="modal-menu">' + menuItems + "</ul>" +
      "</div>" +
      '<div class="modal-section">' +
      '<h4 class="modal-section-title">주차 안내</h4>' +
      '<p class="modal-parking">' + data.parking + "</p>" +
      "</div>"
    );
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 3000);
  }

  function openModal(name) {
    const data = restaurantDetails[name];
    modalTitle.textContent = name;
    modalBody.innerHTML = data
      ? buildModalHTML(data)
      : "<p>상세 정보를 준비 중입니다.</p>";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 60);
    updateActiveNav();
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    let current = "";

    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  menuToggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      restaurantCards.forEach(function (card) {
        const area = card.dataset.area;
        const show = filter === "all" || area === filter;
        card.classList.toggle("hidden", !show);
        if (show) visibleCount++;
      });

      const label = filter === "all" ? "전체" : filter;
      filterResult.textContent =
        filter === "all"
          ? "총 " + visibleCount + "개 맛집을 소개합니다."
          : label + " 지역 " + visibleCount + "개 맛집이 표시됩니다.";
    });
  });

  cardBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.dataset.name);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showToast("문의가 접수되었습니다. 감사합니다!");
    contactForm.reset();
  });

  function animateCounters() {
    const counters = document.querySelectorAll(".stat strong[data-count]");
    const heroStats = document.querySelector(".hero-stats");

    if (!heroStats) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          counters.forEach(function (counter) {
            const target = parseInt(counter.dataset.count, 10);
            let current = 0;
            const step = Math.ceil(target / 40);

            const timer = setInterval(function () {
              current += step;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = current;
              }
            }, 30);
          });

          observer.disconnect();
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(heroStats);
  }

  filterResult.textContent = "총 " + restaurantCards.length + "개 맛집을 소개합니다.";
  animateCounters();
  updateActiveNav();
})();
