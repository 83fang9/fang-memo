async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT", //수정은 PUT
    headers: {
      "Content-Type": "application/json",
    }, //리퀘스트바디형식
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "edit";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
}

//서버에서 가져오는 get (CRUD중 R])
async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  //jsonRes -> [{id:123, constent:'불라불라'}]
  const ul = document.querySelector("#memo-ul");
  ul.innerText = ""; // 읽을때 ul을 초기화 시켜줘서 중복써지기 방지
  //['a', 'b', 'c'].forEach(함수) -> a,b,c에 대한 각각 함수를 적용하여 3개를 호출함
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    //서버전달 (post) CRUD 중 C의 과정
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }), //서버는 문자열로만 보내기 때문에 스트링화 하여 보낸다
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault(); //submit하면 바로 리다이렉트 되서 콘솔로그가 너무 눈깜박할 사이에 사라짐 -> 고거 방지
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

//memo-form안에서 submit이라는 이벤트가 발생시 -> createMemo를 실행한다
const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
