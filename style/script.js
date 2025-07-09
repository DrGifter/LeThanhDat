const sound = document.getElementById('music');
let isNight = false;
let meteorInterval;
let messageTimers = [];
let snowInterval;
const arrow = document.getElementById("arrow");

function toggleMode() {
  const body = document.body;
  const btn = document.getElementById("toggleButton");
  const messageBox = document.getElementById("messageBox");

  messageTimers.forEach(timer => clearTimeout(timer));
  messageTimers = [];

  function createSnowflake() {
    const snowflake = document.createElement("div");
    const size = Math.random() * 5 + 2;
    snowflake.className = "snowflake";
    snowflake.style.width = size + "px";
    snowflake.style.height = size + "px";
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.animationDuration = (5 + Math.random() * 5) + "s";
    document.body.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 12000);
  }

  function startSnow() {
    snowInterval = setInterval(() => {
      for (let i = 0; i < 5; i++) createSnowflake();
    }, 300);
  }

  function stopSnow() {
    clearInterval(snowInterval);
    document.querySelectorAll(".snowflake").forEach(flake => flake.remove());
  }

  if (!isNight) {
    body.classList.add("night");
    btn.innerText = "🌤️";
    btn.title = "Chào buổi sáng ☀️";
    isNight = true;
    arrow.style.opacity = "0";
    startSnow(); 
    sound.play();

    const title = "Chúc Cậu Một Buổi Tối Thật Dịu Dàng 💚";
    const messages = [
      "Hy Vọng Hôm Nay Cậu Đã Có Một Ngày Nhẹ Nhàng",
      "Nếu Cậu Còn Chút Mệt Mỏi",
      "Hãy Để Màn Đêm Xoa Dịu Tất Cả",
      "Ngủ Ngoan Nha! 🌙",
      "Ngày Mai Thật Tốt Đẹp Nhé ✨",
    ];

    messageBox.innerHTML = "";
    messageBox.classList.add("show");

    const titleLine = document.createElement("div");
    titleLine.className = "message-title";
    titleLine.textContent = title;
    messageBox.appendChild(titleLine);
    setTimeout(() => titleLine.classList.add("show"), 500);

    messages.forEach((text, i) => {
      const timer = setTimeout(() => {
        const line = document.createElement("div");
        line.className = "message-line";
        line.textContent = text;
        line.classList.add("fade-in");
        messageBox.appendChild(line);
      }, (i + 1) * 2000);
      messageTimers.push(timer);
    });

    const stars = 500;
    for (let i = 0; i < stars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = Math.random() * 100 + "vh";
      star.style.left = Math.random() * 100 + "vw";
      star.style.width = star.style.height = Math.random() * 2 + 1 + "px";
      star.style.animationDuration = (Math.random() * 2 + 1) + "s";
      body.appendChild(star);
    }

    setTimeout(() => {
      meteorInterval = setInterval(meteorShower, 5000);
      meteorShower();
    }, 1000);

  } else {
    body.classList.remove("night");
    btn.innerText = "🌙";
    btn.title = "Chúc ngủ ngon 🌙";
    isNight = false;
    arrow.style.opacity = "1";
    stopSnow();  
    sound.pause(); 

    document.querySelectorAll(".star, .meteor").forEach(el => el.remove());
    clearInterval(meteorInterval);

    messageBox.classList.remove("show");
    messageBox.innerHTML = "";
  }
}

function createMeteor() {
  const meteor = document.createElement("div");
  meteor.className = "meteor";
  meteor.style.top = Math.random() * window.innerHeight * 0.3 + "px";
  meteor.style.left = (60 + Math.random() * 30) + "vw";
  document.body.appendChild(meteor);
  setTimeout(() => meteor.remove(), 1200);
}

function meteorShower() {
  const count = 20;
  for (let i = 0; i < count; i++) {
    setTimeout(createMeteor, i * 150);
  }
}

document.addEventListener("click", function(e) {
  createExplosion(e.clientX, e.clientY);
});

function createExplosion(x, y) {
  const numberOfStars = 25;
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 8 + 4;
    star.className = "explosion-star";
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = (x - size / 2) + "px";
    star.style.top = (y - size / 2) + "px";

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 120 + 40;
    const dx = Math.cos(angle) * distance + "px";
    const dy = Math.sin(angle) * distance + "px";

    star.style.setProperty("--dx", dx);
    star.style.setProperty("--dy", dy);

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 800);
  }
}