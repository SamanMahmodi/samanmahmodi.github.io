const script = document.currentScript;
let comments = script.getAttribute("data-comments") ? Number(script.getAttribute("data-comments")) : 5;
const blogId = script.getAttribute("data-blog");
const _style = `
<style>
.webloog-wrap * {box-sizing:border-box;}
.webloog-wrap {
    display:flex;
    flex-direction:column;
    gap:10px;
    background-color:#eee;
    padding:20px;
    border-radius:10px;
    overflow:hidden;
}
.webloog-heading {
    font-weight:700;
    border-bottom:1px solid #ddd;
    padding-bottom:10px;
}
.webloog-loading {
    animation:  pulse 2s infinite
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
</style>
`;
const _dom = `
<div class="webloog-wrap">
    <h6 class="webloog-heading">
        جدیدترین نظرات کاربران
    </h6>
   <div class="webloog-comments">
    <div class="webloog-loading">
        درحال بارگذاری نظرات..
    </div>
   </div>
</div>
`;
script.insertAdjacentHTML("beforebegin", _style + _dom);
const webloogComments = document.querySelector(".webloog-comments");
async function getComment(postId, page = 1) {
  try {
    const data = await fetch(`/comments/?blogid=${blogId}&postid=${postId}&p=${page}`);
    const text = await data.text();
    const dom = new DOMParser().parseFromString(text, "text/html");
    const lastPage = dom.querySelector(`#navbar a[title="صفحه آخر"]`);
    if (lastPage) {
      getComment(postId, lastPage.getAttribute("href").split("&=p")[1]);
    } else {
      const lastComment = dom.querySelector(".box");
      if (lastComment) {
        const author = lastComment.querySelector(".author");
        const commentTemplate = `
        <div class="webloog-comment">
            <div class="webloog-heading">
                <div class="webloog-avatar">
                        ${author.textContent ? author.textContent[0] : ""}
                </div>
                <div class="webloog-details">
                    <div class="webloog-info">
                        ${author.innerHTML}
                         در پست 
                        <a href="/post/${postId}">${dom.querySelector("#header").textContent}</a>
                    </div>
                    <div class="webloog-date">
                        ${lastComment.querySelector(".date").textContent}
                    </div>
                </div>
            </div>
            <div class="webloog-content">
                ${lastComment.querySelector(".body").innerHTML}
            </div>
        </div>
        `;
        webloogComments.insertAdjacentHTML("beforeend", commentTemplate);
        comments -= 1;
      }
    }
  } catch (t) {
    console.log(t);
  }
}
for (let index = 0; index < BlogComments.length && comments > 0; index += 2) {
  getComment(BlogComments[index]);
}
