(function () {
  "use strict";

  var STORAGE_KEY = "daegu-seafood-chatbot-config";
  var OPENAI_URL = "https://api.openai.com/v1/chat/completions";

  var chatbot = document.getElementById("chatbot");
  var chatbotToggle = document.getElementById("chatbotToggle");
  var chatbotPanel = document.getElementById("chatbotPanel");
  var chatbotSetup = document.getElementById("chatbotSetup");
  var chatbotBody = document.getElementById("chatbotBody");
  var chatbotMessages = document.getElementById("chatbotMessages");
  var chatbotForm = document.getElementById("chatbotForm");
  var chatbotInput = document.getElementById("chatbotInput");
  var chatbotSend = document.getElementById("chatbotSend");
  var chatbotApiKey = document.getElementById("chatbotApiKey");
  var chatbotModel = document.getElementById("chatbotModel");
  var chatbotProxyUrl = document.getElementById("chatbotProxyUrl");
  var chatbotSaveKey = document.getElementById("chatbotSaveKey");
  var chatbotSettingsBtn = document.getElementById("chatbotSettingsBtn");
  var chatbotSuggestions = document.getElementById("chatbotSuggestions");

  if (!chatbot || !chatbotToggle) return;

  var config = loadConfig();
  var messages = [];
  var isLoading = false;

  var systemPrompt =
    "당신은 '대구 해산물 맛집 가이드' AI 상담원입니다. " +
    "아래 맛집 정보만 바탕으로 친절하고 간결하게 한국어로 답변하세요. " +
    "모르는 정보는 추측하지 말고, 페이지에 없는 맛집은 추천하지 마세요.\n\n" +
    "맛집 목록:\n" +
    "1. 통영생선회 동성로점 (중구 동성로) - 회·사시미, 1인 ₩25,000~, ★4.8\n" +
    "   주소: 대구 중구 동성로2길 80 / 11:30–22:00\n" +
    "   메뉴: 모듬회 2인 ₩45,000, 연어+광어 콤보 ₩38,000, 특선 사시미 ₩28,000\n" +
    "   주차: 전용 없음, 동성로 공영주차장(도보 3분)\n\n" +
    "2. 수성못 해물왕 (수성구 범어동) - 해물탕·찜, 2인 ₩45,000~, ★4.7\n" +
    "   주소: 대구 수성구 범어동 177-3 / 11:00–21:30\n" +
    "   메뉴: 해물탕 中 ₩45,000, 大 ₩65,000, 아구찜 ₩55,000\n" +
    "   주차: 매장 앞 무료 8대\n\n" +
    "3. 칠곡수산시장 회센터 (북구 칠곡) - 수산시장 회, 시세, ★4.9\n" +
    "   주소: 대구 북구 칠곡중앙대로 672 / 09:00–19:00\n" +
    "   메뉴: 활어회(100g) 시세, 모듬회 ₩35,000~, 조개구이 ₩25,000\n" +
    "   주차: 시장 대형 주차장 무료(약 200대)\n\n" +
    "4. 조개마을 월성점 (달서구 월성동) - 조개구이, 1인 ₩20,000~, ★4.6\n" +
    "   주소: 대구 달서구 월성로 45 / 16:00–24:00\n" +
    "   메뉴: 조개구이 모듬 2인 ₩38,000, 해물파전 ₩16,000\n" +
    "   주차: 전용 12대 무료\n\n" +
    "5. 바다밥상 반월당 (중구 반월당) - 회덮밥·일식, 점심 ₩12,000~, ★4.5\n" +
    "   주소: 대구 중구 반월당로 12 / 11:00–21:00\n" +
    "   메뉴: 회덮밥 ₩12,000, 모듬 사시미 정식 ₩32,000\n" +
    "   주차: 전용 없음, 반월당 지하주차장(도보 2분)\n\n" +
    "6. 킹크랩 수성 (수성구 만촌동) - 대게·킹크랩, 2인 ₩80,000~, ★4.8\n" +
    "   주소: 대구 수성구 만촌동 1024-5 / 11:30–22:00 (예약제)\n" +
    "   메뉴: 킹크랩 1kg ₩85,000~, 대게찜 2인 ₩90,000\n" +
    "   주차: 지하 전용 30대, 2시간 무료";

  function loadConfig() {
    var saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (e) {
      saved = {};
    }

    var external = window.CHATBOT_CONFIG || {};
    return {
      apiKey: external.apiKey || saved.apiKey || "",
      model: external.model || saved.model || "gpt-4o-mini",
      proxyUrl: external.proxyUrl || saved.proxyUrl || ""
    };
  }

  function saveConfig() {
    var next = {
      apiKey: chatbotApiKey.value.trim(),
      model: chatbotModel.value,
      proxyUrl: chatbotProxyUrl.value.trim()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    config = next;
    showChatView();
    appendMessage(
      "assistant",
      "안녕하세요! 대구 해산물 맛집 가이드 AI입니다. 🐟\n" +
        "맛집 추천, 메뉴, 영업시간, 주차 안내를 도와드릴게요."
    );
  }

  function hasValidConfig() {
    return Boolean(config.apiKey && config.apiKey.startsWith("sk-"));
  }

  function showSetupView() {
    chatbotSetup.hidden = false;
    chatbotBody.hidden = true;
    chatbotApiKey.value = config.apiKey || "";
    chatbotModel.value = config.model || "gpt-4o-mini";
    chatbotProxyUrl.value = config.proxyUrl || "";
  }

  function showChatView() {
    chatbotSetup.hidden = true;
    chatbotBody.hidden = false;
  }

  function togglePanel(forceOpen) {
    var isOpen = typeof forceOpen === "boolean" ? forceOpen : !chatbotPanel.classList.contains("open");
    chatbotPanel.classList.toggle("open", isOpen);
    chatbotToggle.classList.toggle("open", isOpen);
    chatbotToggle.setAttribute("aria-expanded", String(isOpen));
    chatbotPanel.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen) {
      if (hasValidConfig()) {
        showChatView();
        if (messages.length === 0) {
          appendMessage(
            "assistant",
            "안녕하세요! 대구 해산물 맛집 가이드 AI입니다. 🐟\n" +
              "맛집 추천, 메뉴, 영업시간, 주차 안내를 도와드릴게요."
          );
        }
        chatbotInput.focus();
      } else {
        showSetupView();
        chatbotApiKey.focus();
      }
    }
  }

  function appendMessage(role, text) {
    messages.push({ role: role, content: text });

    var el = document.createElement("div");
    el.className = "chatbot-msg chatbot-msg--" + role;
    el.textContent = text;
    chatbotMessages.appendChild(el);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function appendTyping() {
    var el = document.createElement("div");
    el.className = "chatbot-msg chatbot-msg--assistant chatbot-msg--typing";
    el.id = "chatbotTyping";
    el.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(el);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function removeTyping() {
    var typing = document.getElementById("chatbotTyping");
    if (typing) typing.remove();
  }

  function setLoading(state) {
    isLoading = state;
    chatbotSend.disabled = state;
    chatbotInput.disabled = state;
    chatbotSuggestions.querySelectorAll(".chatbot-chip").forEach(function (chip) {
      chip.disabled = state;
    });
  }

  async function sendMessage(text) {
    var trimmed = text.trim();
    if (!trimmed || isLoading) return;

    if (!hasValidConfig()) {
      showSetupView();
      return;
    }

    appendMessage("user", trimmed);
    chatbotInput.value = "";
    chatbotInput.style.height = "auto";
    setLoading(true);
    appendTyping();

    var apiMessages = [{ role: "system", content: systemPrompt }]
      .concat(messages.slice(0, -1))
      .concat([{ role: "user", content: trimmed }]);

    try {
      var reply = await callOpenAI(apiMessages);
      removeTyping();
      appendMessage("assistant", reply);
    } catch (err) {
      removeTyping();
      appendMessage("assistant", "⚠️ " + err.message);
    } finally {
      setLoading(false);
      chatbotInput.focus();
    }
  }

  async function callOpenAI(apiMessages) {
    var payload = {
      model: config.model,
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 600
    };

    if (config.proxyUrl) {
      var proxyRes = await fetch(config.proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: config.apiKey, ...payload })
      });

      if (!proxyRes.ok) {
        var proxyErr = await proxyRes.json().catch(function () { return {}; });
        throw new Error(proxyErr.error || "프록시 서버 오류 (" + proxyRes.status + ")");
      }

      var proxyData = await proxyRes.json();
      return extractReply(proxyData);
    }

    var res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + config.apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      var errData = await res.json().catch(function () { return {}; });
      var msg = (errData.error && errData.error.message) || "API 요청 실패 (" + res.status + ")";
      if (res.status === 401) msg = "API 키가 올바르지 않습니다. 설정에서 다시 입력해 주세요.";
      throw new Error(msg);
    }

    var data = await res.json();
    return extractReply(data);
  }

  function extractReply(data) {
    var content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!content) throw new Error("응답을 받지 못했습니다.");
    return content.trim();
  }

  chatbotToggle.addEventListener("click", function () {
    togglePanel();
  });

  chatbotSettingsBtn.addEventListener("click", function () {
    showSetupView();
  });

  chatbotSaveKey.addEventListener("click", function () {
    if (!chatbotApiKey.value.trim()) {
      chatbotApiKey.focus();
      return;
    }
    saveConfig();
  });

  chatbotForm.addEventListener("submit", function (e) {
    e.preventDefault();
    sendMessage(chatbotInput.value);
  });

  chatbotInput.addEventListener("input", function () {
    chatbotInput.style.height = "auto";
    chatbotInput.style.height = Math.min(chatbotInput.scrollHeight, 120) + "px";
  });

  chatbotInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatbotForm.requestSubmit();
    }
  });

  chatbotSuggestions.addEventListener("click", function (e) {
    var chip = e.target.closest(".chatbot-chip");
    if (!chip || chip.disabled) return;
    sendMessage(chip.dataset.prompt);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && chatbotPanel.classList.contains("open")) {
      togglePanel(false);
    }
  });

  document.addEventListener("click", function (e) {
    if (!chatbotPanel.classList.contains("open")) return;
    if (chatbot.contains(e.target)) return;
    togglePanel(false);
  });

  if (window.CHATBOT_CONFIG && window.CHATBOT_CONFIG.apiKey) {
    config = loadConfig();
  }
})();
