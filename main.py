from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
# staticfiles = index, css, java 등의 파일들을 의미한다

#서버에 리퀘스트바디로 받으려면 먼저 이렇게 class로 형식을 설정해야 한다. 자바에서 스트링화하여 보냈기 때문에 형식은 str
class Memo(BaseModel):
    id:str
    content:str
    
memos = []  #배열선언

app = FastAPI()

@app.post('/memos')
def creat_memo(memo:Memo):
    memos.append(memo)
    return '추가 성공했습니다'

@app.get('/memos')
def read_memo():
    return memos

@app.put('/memos/{memo_id}')
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id == req_memo.id:
            memo.content=req_memo.content
            return '성공했습니다'
    return '그런메모는 없습니다' 

@app.delete('/memos/{memo_id}')
def delete_memo(memo_id):
    for index,memo in enumerate(memos):   #for문에서 index, memo 함께쓰려면 enumerate로 감싸줘야됨
        if memo.id == memo_id:
            memos.pop(index)
            return '성공했습니다'
    return '없습니다' 
    

# FastAPI 홈페이지에서 찾을 수 있다
app.mount("/", StaticFiles(directory="static", html=True), name="static")
