import { db } from "./lib/firebase.js";
import {
  ref,
  push,
  set,
  onValue,
  remove,
} from "firebase/database";

const input = document.getElementById("urlInput");
const btn = document.getElementById("sendBtn");
const status = document.getElementById("status");
const connectionStatus = document.getElementById("connectionStatus");

let isOnline = false;

// Heartbeat listener
onValue(ref(db, "status/last_seen"), (snap) => {
  const lastSeen = snap.val();
  isOnline = lastSeen && Date.now() - lastSeen < 15000;
  btn.disabled = !isOnline;
  btn.textContent = isOnline
    ? "Send to Kura’s Computer"
    : "Waiting for Kura...";
  connectionStatus.innerHTML = isOnline
    ? '<span style="color:#a6e3a1;"><span class="status-dot">●</span>Kura is <b>online</b></span>'
    : '<span style="color:#eb6f92;"><span class="status-dot">●</span>Kura is <b>offline</b></span>';
});

async function sendLink() {
  if (!isOnline) return;
  const url = input.value.trim();
  if (!url) return;

  if (/\s/.test(url)) {
    status.textContent = "Invalid URL: No spaces allowed!";
    status.style.color = "#eb6f92";
    return;
  }

  let cleanUrl = /^https?:\/\//i.test(url) ? url : "https://" + url;
  btn.disabled = true;
  btn.textContent = "Sending...";

  try {
    const newRef = push(ref(db, "links"));
    await set(newRef, { url: cleanUrl, timestamp: Date.now() });

    const unsubscribe = onValue(newRef, (snap) => {
      const data = snap.val();
      if (data?.status === "opened") {
        status.textContent = "✅ Link opened on my computer!";
        status.style.color = "#a6e3a1";
        input.value = "";
        unsubscribe();
        setTimeout(() => {
          remove(newRef); // Clean up DB
          status.textContent = "";
        }, 2000);
        btn.disabled = false;
        btn.textContent = "Send to Kura’s Computer";
      } else if (data?.status?.startsWith("failed")) {
        status.textContent = "❌ Error: Link unreachable.";
        status.style.color = "#eb6f92";
        btn.disabled = false;
        btn.textContent = "Send to Kura’s Computer";
        unsubscribe();
      }
    });
  } catch (e) {
    status.textContent = "❌ Connection error.";
    btn.disabled = false;
  }
}

btn.addEventListener("click", sendLink);
input.addEventListener(
  "keypress",
  (e) => e.key === "Enter" && sendLink(),
);
