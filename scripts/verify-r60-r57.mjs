import { chromium } from "playwright";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const LIBDIR = path.join(os.homedir(), "tools/chromium-libs/usr/lib/x86_64-linux-gnu");
if (fs.existsSync(LIBDIR)) {
  process.env.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH
    ? `${LIBDIR}:${process.env.LD_LIBRARY_PATH}`
    : LIBDIR;
}

const URL = process.env.TARGET_URL || "https://portfolio-simpul.himaystudio.com/";
const BREAKPOINTS = [375, 480, 768, 1025, 1440];

async function dismissWelcomeModal(page) {
  const closeBtn = page.locator('[role="dialog"] button').first();
  if (await closeBtn.count().catch(() => 0)) {
    await closeBtn.click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(400);
  }
  await page.evaluate(() => {
    document.querySelectorAll(".modal-scrim").forEach((el) => el.remove());
  });
}

async function readState(page, trigger, i) {
  const expanded = await trigger.getAttribute("aria-expanded");
  const box = await page.locator(`#mega-${i}`).boundingBox();
  const visible = box !== null && box.width > 0 && box.height > 0;
  return { expanded, visible, agree: (expanded === "true") === visible };
}

const browser = await chromium.launch();
const results = { hoverThenClick: [], clickHoldPosition: [], keyboardOnly: [], clickOutside: [], r57: [] };

// A) hover -> read -> click (cursor stays on trigger) -> read. Mirrors the
// recorder script (~/tools/recorder/simpul-nav.js) almost exactly.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await dismissWelcomeModal(page);
  const triggers = await page.locator('button.nav-link[aria-haspopup="true"]').all();
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i];
    const label = (await trigger.textContent())?.trim();
    await trigger.hover();
    await page.waitForTimeout(1600);
    const afterHover = await readState(page, trigger, i);
    await page.waitForTimeout(900);
    await trigger.click().catch(() => {});
    await page.waitForTimeout(400);
    const afterClick = await readState(page, trigger, i);
    results.hoverThenClick.push({ index: i, label, afterHover, afterClick });
  }
  await page.close();
}

// B) click cold (no prior hover) with cursor RESTING on the trigger
// afterward (a real click leaves the pointer where it clicked) -> read.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await dismissWelcomeModal(page);
  const triggers = await page.locator('button.nav-link[aria-haspopup="true"]').all();
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i];
    const label = (await trigger.textContent())?.trim();
    await trigger.click();
    await page.waitForTimeout(200);
    const afterOpen = await readState(page, trigger, i);
    // second click on the SAME trigger, cursor still resting on it
    await trigger.click();
    await page.waitForTimeout(200);
    const afterSecondClick = await readState(page, trigger, i);
    results.clickHoldPosition.push({ index: i, label, afterOpen, afterSecondClick });
    await page.mouse.move(10, 10);
    await page.waitForTimeout(200);
  }
  await page.close();
}

// C) pure keyboard: Tab to the trigger (no mouse anywhere near it), Enter to
// open, read, Escape to close, read.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await dismissWelcomeModal(page);
  const triggers = await page.locator('button.nav-link[aria-haspopup="true"]').all();
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i];
    const label = (await trigger.textContent())?.trim();
    await trigger.focus();
    await page.waitForTimeout(100);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const afterEnter = await readState(page, trigger, i);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const afterEscape = await readState(page, trigger, i);
    results.keyboardOnly.push({ index: i, label, afterEnter, afterEscape });
  }
  await page.close();
}

// D) click to open, then click far outside -> should close, both agree.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await dismissWelcomeModal(page);
  const triggers = await page.locator('button.nav-link[aria-haspopup="true"]').all();
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i];
    const label = (await trigger.textContent())?.trim();
    await trigger.click();
    await page.waitForTimeout(200);
    const afterOpen = await readState(page, trigger, i);
    await page.mouse.click(10, 850);
    await page.waitForTimeout(200);
    const afterOutsideClick = await readState(page, trigger, i);
    results.clickOutside.push({ index: i, label, afterOpen, afterOutsideClick });
  }
  await page.close();
}

// R57: scrollWidth <= innerWidth, panels closed AND open, every breakpoint
for (const width of BREAKPOINTS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await dismissWelcomeModal(page);

  const closedOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));

  const openOverflow = [];
  if (width >= 1025) {
    const triggers = await page.locator('button.nav-link[aria-haspopup="true"]').all();
    for (let i = 0; i < triggers.length; i++) {
      await triggers[i].click();
      await page.waitForTimeout(150);
      const m = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      openOverflow.push({ index: i, ...m, overflow: m.scrollWidth > m.innerWidth });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(100);
    }
  }

  results.r57.push({
    width,
    closed: { ...closedOverflow, overflow: closedOverflow.scrollWidth > closedOverflow.innerWidth },
    open: openOverflow,
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
