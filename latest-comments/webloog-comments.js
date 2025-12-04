// Blogfa Latest Comments Widget v1.0
// Author: Saman Mahmudi (http://webloog.ir)
// Released: 2025-12-04
// Docs: http://webloog.ir/post/66
try {
  const script = document.currentScript;
  let comments = Number(script.getAttribute("data-comments")) || 5;
  comments = Math.min(comments, 30);
  const webloogBlogId = script.getAttribute("data-blog");
  const webloogTheme = script.getAttribute("data-theme") || "light";
  const _style = `<style>[data-theme="light"]{--body:#ffffff;--border:#dddddd;--link:#4763ff;--text:#111111;--muted:#555555}[data-theme="dark"]{--body:#1c1c1e;--border:#39393b;--link:#8c9dfd;--text:#f5f5f5;--muted:#aaaaaa} [data-theme="red"]{--body:#fff6f6;--border:#f5c4c4;--link:#e84a4a;--text:#3a1e1e;--muted:#8a5c5c;}[data-theme="orange"]{--body:#fff8f2;--border:#ffd8b3;--link:#ff8b3d;--text:#3f2a1e;--muted:#8a705c;}[data-theme="yellow"]{--body:#fffbec;--border:#ffe9a6;--link:#e3b600;--text:#3a320f;--muted:#8a835e;}[data-theme="green"]{--body:#f2fff8;--border:#bfe8cf;--link:#2fad6d;--text:#123821;--muted:#4f7d61;}[data-theme="teal"]{--body:#f3fffd;--border:#b9ebe4;--link:#26bfa8;--text:#103630;--muted:#55837d;}[data-theme="blue"]{--body:#f4f9ff;--border:#c0d8ff;--link:#3f82ff;--text:#11243b;--muted:#5c6f8a;}[data-theme="indigo"]{--body:#f5f4ff;--border:#cbc7ff;--link:#695cff;--text:#1d1a3d;--muted:#6b658f;}[data-theme="purple"]{--body:#fcf5ff;--border:#e4c5ff;--link:#a347ff;--text:#2f1c44;--muted:#7a629c;}[data-theme="pink"]{--body:#fff6fb;--border:#ffcce4;--link:#ff5fa3;--text:#3f1f32;--muted:#8a5c78;}[data-theme="brown"]{--body:#faf4eb;--border:#e2d0b8;--link:#9b6a3e;--text:#3b2c1b;--muted:#7d6a55;} .webloog-wrap *{ box-sizing: border-box; font-size: 10pt !important; margin: 0; padding: 0;} .webloog-wrap{ border: 1px solid var(--border); display: block; background-color: var(--body); border-radius: 10px; overflow: hidden; width: 100%; max-width: 576px; margin: 20px auto; font-size: 10pt !important; color: var(--text); text-align: right;} .webloog-heading{ display: flex; flex-direction: row; justify-content: center; align-items: center; font-weight: 700; border-bottom: 1px solid var(--border); gap: 10px; padding: 20px; width: 100%;} .webloog-heading button{ margin-right: auto; cursor: pointer;} .webloog-loading{ animation: pulse 2s infinite; padding: 20px; text-align: center;} @keyframes pulse{ 0%{ opacity: 1;} 50%{ opacity: 0.3;} 100%{ opacity: 1;}} .webloog-comment{ padding: 20px 10px 20px 20px; border-bottom: 1px solid var(--border); display: flex; flex-direction: row; align-items: start; gap: 10px; position: relative; opacity: 0; animation: fadeInSmooth 0.6s ease-out forwards;} @keyframes fadeInSmooth{ to{ opacity: 1;}} .webloog-comment:last-of-type{ border: none;} .webloog-avatar{ display: flex; flex-direction: row; align-items: center; justify-content: center; line-height: 0 !important; width: 40px; height: 40px; user-select: none; border-radius: 50%; overflow: hidden; font-weight: bold; background-color: var(--border); flex-shrink: 0; color: white; text-shadow: 1px 1px 0px #000; z-index: 1; font-size: 12pt !important;} .webloog-line{ height: 100%; width: 0; border-right: 1px solid var(--border); opacity: 0.5; position: absolute; top: 0; right: 29px; z-index: 0;} .webloog-head{ display: flex; flex-direction: column;} .webloog-date{ margin-bottom: 10px; font-size: 9pt !important; color: var(--muted);} .webloog-info{ margin-bottom: 2px; color: var(--muted);} .webloog-info b{ color: var(--text) !important;} .webloog-content .reply{ position: relative; padding: 20px; border-radius: 10px; max-width: max-content; margin-top: 20px; background-color: color-mix(in srgb, var(--border) 40%, transparent);} .webloog-content .reply::before{ content: ""; position: absolute; right: -30px; top: 50%; width: 30px; height: 0; border-top: 1px solid var(--border); opacity: 0.5;} .webloog-content .reply .rt{ font-weight: 700; padding-left: 5px;} .webloog-author a, .webloog-post{ color: var(--link) !important;} .webloog-notFound{ padding: 20px; text-align: center;}</style>`;
  const _dom = `  <div class="webloog-wrap" dir="rtl" lang="fa" data-theme="${webloogTheme}"><div class="webloog-heading"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0867 21.3877L13.6288 20.4718C14.0492 19.7614 14.2595 19.4062 14.5972 19.2098C14.9349 19.0134 15.36 19.0061 16.2104 18.9915C17.4658 18.9698 18.2531 18.8929 18.9134 18.6194C20.1386 18.1119 21.1119 17.1386 21.6194 15.9134C22 14.9946 22 13.8297 22 11.5V10.5C22 10.1303 22 9.78153 21.9989 9.45187C21.9976 9.02454 21.4751 8.78307 21.0971 8.9825C20.4709 9.31294 19.7573 9.5 19 9.5C16.5147 9.5 14.5 7.48528 14.5 5C14.5 4.24271 14.6871 3.52911 15.0175 2.90288C15.2169 2.52494 14.9755 2.00244 14.5481 2.00106C14.2185 2 13.8697 2 13.5 2H10.5C7.22657 2 5.58985 2 4.38751 2.7368C3.71473 3.14908 3.14908 3.71473 2.7368 4.38751C2 5.58985 2 7.22657 2 10.5V11.5C2 13.8297 2 14.9946 2.3806 15.9134C2.88807 17.1386 3.86144 18.1119 5.08658 18.6194C5.74689 18.8929 6.53422 18.9698 7.78958 18.9915C8.63992 19.0061 9.06509 19.0134 9.40279 19.2098C9.74049 19.4063 9.95073 19.7614 10.3712 20.4718L10.9133 21.3877C11.3965 22.204 12.6035 22.204 13.0867 21.3877Z" fill="currentColor"/><circle cx="19" cy="5" r="3" fill="var(--link)"/></svg><div>آخرین نظرات کاربران</div></div><div class="webloog-comments"><div class="webloog-loading">درحال بارگذاری نظرات..</div></div><div style="padding: 20px; border-top: 1px solid var(--border); text-align: center"><a href="http://webloog.ir/post/66" style="opacity: 1 !important; display: inline-block !important; position: relative !important;color:var(--text)!important" title="دریافت کد آخرین نظرات بلاگفا | webloog.ir"> کد آخرین نظرات بلاگفا | وبلاگ‌ :: webloog</a></div><div></div></div>`;
  script.insertAdjacentHTML("beforebegin", _style + _dom);
  const webloogComments = document.querySelector(".webloog-comments");
  let foundComment = false;
  async function getComment(postId, page = 1) {
    try {
      const data = await fetch(`/comments/?blogid=${webloogBlogId}&postid=${postId}&p=${page}`);
      const text = await data.text();
      const dom = new DOMParser().parseFromString(text, "text/html");
      const lastPage = dom.querySelector(`#navbar a[title="صفحه آخر"]`);
      if (lastPage) {
        await getComment(postId, Number(lastPage.getAttribute("href").split("&p=")[1]));
      } else {
        const boxes = dom.querySelectorAll(".box");
        const lastComment = boxes.length ? boxes[boxes.length - 1] : null;
        if (lastComment) {
          foundComment = true;
          const author = lastComment.querySelector(".author");
          const commentTemplate = `<div class="webloog-comment"><div class="webloog-line"></div><div class="webloog-avatar" style="background:${randomComplexPattern()}">${author?.textContent ? author.textContent?.trim()?.[0] : ""} </div><div class="webloog-head"><div class="webloog-info"><b class="webloog-author">${author?.innerHTML || ""} </b>در مطلب <a class="webloog-post" href="/post/${postId}">${dom.querySelector("#header")?.textContent || ""}</a></div><span class="webloog-date">${lastComment.querySelector(".date")?.textContent || ""} </span><div class="webloog-content">${lastComment.querySelector(".body")?.innerHTML || ""} </div></div></div>`;
          webloogComments.insertAdjacentHTML("beforeend", commentTemplate);
          webloogComments.querySelector(".webloog-loading")?.remove();
          comments -= 1;
        }
      }
    } catch (t) {
      console.log(t);
    }
  }
  function randomColor() {
    const colors = ["#ffb3b3", "#ffe4a8", "#aee9ff", "#9ff3d3", "#b8a6ff", "#ff9ca1", "#ffc9ff", "#a7caff", "#8ff1f1", "#ffb0f2", "#e6eef5", "#9da5ae", "#7ed6d6", "#ffd29d", "#a89be6"];

    return colors[Math.floor(Math.random() * colors.length)];
  }
  function randomGradientLayer() {
    const type = Math.random();
    if (type < 0.4) {
      const angle = Math.floor(Math.random() * 360);
      const c1 = randomColor();
      const c2 = randomColor();
      const c3 = randomColor();
      return `conic-gradient(from ${angle}deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
    } else if (type < 0.7) {
      const c1 = randomColor();
      const c2 = randomColor() + "66";
      const posX = Math.floor(Math.random() * 100);
      const posY = Math.floor(Math.random() * 100);
      return `radial-gradient(circle at ${posX}% ${posY}%, ${c1}, ${c2})`;
    } else {
      const angle = Math.floor(Math.random() * 360);
      const c = randomColor() + "33";
      return `repeating-linear-gradient(${angle}deg, ${c} 0px, ${c} 2px, transparent 2px, transparent 6px)`;
    }
  }
  function randomComplexPattern(layers = 6) {
    let gradients = [];
    for (let i = 0; i < layers; i++) {
      gradients.push(randomGradientLayer());
    }
    return gradients.join(",");
  }
  randomComplexPattern();
  (async () => {
    for (let index = 0; index < BlogComments.length && comments > 0; index += 2) {
      await getComment(BlogComments[index]);
    }
    if (!foundComment) {
      webloogComments.innerHTML = `<div class="webloog-notFound">هیچ نظری یافت نشد</div>`;
    }
  })();
} catch (error) {
  console.log(error);
}
