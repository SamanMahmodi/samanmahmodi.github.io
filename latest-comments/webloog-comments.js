const script = document.currentScript;
let comments = script.getAttribute("data-comments") ? Number(script.getAttribute("data-comments")) : 5;
const webloogBlogId = script.getAttribute("data-blog");
const webloogTheme = script.getAttribute("data-theme") && "light";
const _style = `
<style>
  [data-theme="light"] {
    --body: #ffffff;
    --border: #dddddd;
    --link: #4763ff;
    --text: #111111;
    --muted: #555555;
  }
  [data-theme="dark"] {
    --body: #1c1c1e;
    --border: #39393b;
    --link: #8c9dfd;
    --text: #f5f5f5;
    --muted: #aaaaaa;
  }
  [data-theme="sunset"] {
    --body: #fff2e6;
    --border: #ff8c42;
    --link: #ff3e00;
    --text: #663300;
    --muted: #cc6600;
  }
  [data-theme="ocean"] {
    --body: #e0f7fa;
    --border: #00acc1;
    --link: #00838f;
    --text: #004d40;
    --muted: #006064;
  }
  [data-theme="forest"] {
    --body: #e8f5e9;
    --border: #66bb6a;
    --link: #2e7d32;
    --text: #1b5e20;
    --muted: #4caf50;
  }
  [data-theme="candy"] {
    --body: #fff0f5;
    --border: #ff69b4;
    --link: #ff1493;
    --text: #660033;
    --muted: #cc3366;
  }
  [data-theme="pastel"] {
    --body: #fff7f8;
    --border: #ffdede;
    --link: #ffb6b9;
    --text: #333333;
    --muted: #888888;
  }
  [data-theme="golden"] {
    --body: #fff8e1;
    --border: #ffc107;
    --link: #ff6f00;
    --text: #5d4037;
    --muted: #8d6e63;
  }
  [data-theme="cherry"] {
    --body: #fff0f5;
    --border: #ffb7c5;
    --link: #ff69b4;
    --text: #660033;
    --muted: #cc6699;
  }
  .webloog-wrap * {
    box-sizing: border-box;
    font-size: 11pt!important;
  }
  .webloog-wrap {
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    background-color: var(--body);
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    max-width: 576px;
    margin: auto;
    font-size: 11pt!important;
    color: var(--text);
  }
  .webloog-heading {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border-bottom: 1px solid var(--border);
    gap: 10px;
    padding: 20px;
  }
  .webloog-heading button {
    margin-right: auto;
    cursor: pointer;
  }
  .webloog-loading {
    animation: pulse 2s infinite;
    padding: 20px;
    text-align: center;
  }
  .webloog-comments:has(.webloog-comment) .webloog-loading {
    display: none;
  }
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
  .webloog-comment {
    padding: 20px 10px 20px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 10px;
    position: relative;
  }
  .webloog-comment:last-of-type {
    border: none;
  }
  .webloog-avatar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    line-height: 0 !important;
    width: 40px;
    height: 40px;
    user-select: none;
    border-radius: 50%;
    overflow: hidden;
    font-weight: bold;
    background-color: var(--border);
    flex-shrink: 0;
    color: white;
    text-shadow: 1px 1px 1px #000;
    z-index: 1;
    font-size: 13pt!important;
  }
  .webloog-line {
    height: 100%;
    width: 0;
    border-right: 1px dashed var(--border);
    position: absolute;
    top: 0;
    right: 29px;
    z-index: 0;
  }
  .webloog-head {
    display: flex;
    flex-direction: column;
  }
  .webloog-date {
    margin-bottom: 10px;
    font-size: 9pt!important;
    color: var(--muted);
  }
  .webloog-info {
    margin-bottom: 5px;
    color: var(--muted);
  }
  .webloog-info b {
    color: var(--text) !important;
  }
  .webloog-content .reply {
    position: relative;
    padding: 20px;
    border-radius: 10px;
    max-width: max-content;
    margin-top: 20px;
    background-color: color-mix(in srgb, var(--border) 40%, transparent);
  }
  .webloog-content .reply::before {
    content: "";
    position: absolute;
    right: -31px;
    top: 50%;
    width: 31px;
    height: 0;
    border-top: 1px dashed var(--border);
  }
  .webloog-content .reply .rt {
    font-weight: 700;
    padding-left: 5px;
  }
  .webloog-author a {
    color: var(--link)!important;
  }
</style>
`;
const _dom = `
<div class="webloog-wrap" data-theme="${webloogTheme}">
  <div class="webloog-heading">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0867 21.3877L13.6288 20.4718C14.0492 19.7614 14.2595 19.4062 14.5972 19.2098C14.9349 19.0134 15.36 19.0061 16.2104 18.9915C17.4658 18.9698 18.2531 18.8929 18.9134 18.6194C20.1386 18.1119 21.1119 17.1386 21.6194 15.9134C22 14.9946 22 13.8297 22 11.5V10.5C22 10.1303 22 9.78153 21.9989 9.45187C21.9976 9.02454 21.4751 8.78307 21.0971 8.9825C20.4709 9.31294 19.7573 9.5 19 9.5C16.5147 9.5 14.5 7.48528 14.5 5C14.5 4.24271 14.6871 3.52911 15.0175 2.90288C15.2169 2.52494 14.9755 2.00244 14.5481 2.00106C14.2185 2 13.8697 2 13.5 2H10.5C7.22657 2 5.58985 2 4.38751 2.7368C3.71473 3.14908 3.14908 3.71473 2.7368 4.38751C2 5.58985 2 7.22657 2 10.5V11.5C2 13.8297 2 14.9946 2.3806 15.9134C2.88807 17.1386 3.86144 18.1119 5.08658 18.6194C5.74689 18.8929 6.53422 18.9698 7.78958 18.9915C8.63992 19.0061 9.06509 19.0134 9.40279 19.2098C9.74049 19.4063 9.95073 19.7614 10.3712 20.4718L10.9133 21.3877C11.3965 22.204 12.6035 22.204 13.0867 21.3877Z" fill="currentColor"/><circle cx="19" cy="5" r="3" fill="var(--link)"/></svg>
    <div>آخرین نظرات کاربران</div>
  </div>
  <div class="webloog-comments">
    <div class="webloog-loading">درحال بارگذاری نظرات..</div>
  </div>
  <div style="padding: 20px; border-top: 1px solid var(--border); text-align: center">
    <a href="http://webloog.ir/post/66" style="opacity: 1 !important; display: inline-block !important; position: relative !important" title="دریافت کد آخرین نظرات بلاگفا | webloog.ir">طراحی شده توسط وبلاگ‌ :: webloog</a>
  </div>
  <div></div>
</div>
`;
script.insertAdjacentHTML("beforebegin", _style + _dom);
const webloogComments = document.querySelector(".webloog-comments");
async function getComment(postId, page = 1) {
  try {
    const data = await fetch(`/comments/?blogid=${webloogBlogId}&postid=${postId}&p=${page}`);
    const text = await data.text();
    const dom = new DOMParser().parseFromString(text, "text/html");
    const lastPage = dom.querySelector(`#navbar a[title="صفحه آخر"]`);
    if (lastPage) {
      await getComment(postId, lastPage.getAttribute("href").split("&=p")[1]);
    } else {
      const lastComment = dom.querySelector(".box:last-of-type");
      if (lastComment) {
        const author = lastComment.querySelector(".author");

        const commentTemplate = `
         <div class="webloog-comment">
            <div class="webloog-line"></div>
            <div class="webloog-avatar" style="background:${randomComplexPattern()}">
               ${author?.textContent ? author.textContent[0] : ""}
            </div>
            <div class="webloog-head">
              <div class="webloog-info">
                <b class="webloog-author">
                  ${author?.innerHTML || ""}
                </b>
                در مطلب
                <b>
                  <a href="/post/${postId}">${dom.querySelector("#header")?.textContent || ""}</a>
                </b>
              </div>
              <span class="webloog-date">
                ${lastComment.querySelector(".date")?.textContent || ""}
              </span>
              <div class="webloog-content">
                ${lastComment.querySelector(".body")?.innerHTML || ""}
              </div>
            </div>
          </div>
        `;
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
  const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#5f27cd", "#ee5253", "#ff9ff3", "#54a0ff", "#00d2d3", "#f368e0", "#c8d6e5", "#576574", "#01a3a4", "#ff9f43", "#341f97"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomGradientLayer() {
  const type = Math.random();
  if (type < 0.4) {
    // conic
    const angle = Math.floor(Math.random() * 360);
    const c1 = randomColor();
    const c2 = randomColor();
    const c3 = randomColor();
    return `conic-gradient(from ${angle}deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
  } else if (type < 0.7) {
    // radial
    const c1 = randomColor();
    const c2 = randomColor() + "66"; // نیمه شفاف
    const posX = Math.floor(Math.random() * 100);
    const posY = Math.floor(Math.random() * 100);
    return `radial-gradient(circle at ${posX}% ${posY}%, ${c1}, ${c2})`;
  } else {
    // linear thin lines
    const angle = Math.floor(Math.random() * 360);
    const c = randomColor() + "33"; // خیلی شفاف
    return `repeating-linear-gradient(${angle}deg, ${c} 0px, ${c} 2px, transparent 2px, transparent 6px)`;
  }
}
function randomComplexPattern(layers = 6) {
  let gradients = [];
  for (let i = 0; i < layers; i++) {
    gradients.push(randomGradientLayer());
  }
  console.log(gradients.join(","));
  return gradients.join(",");
}
randomComplexPattern();
(async () => {
  for (let index = 0; index < BlogComments.length && comments > 0; index += 2) {
    await getComment(BlogComments[index]);
  }
})();
