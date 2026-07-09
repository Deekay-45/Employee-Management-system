from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://127.0.0.1:3001", "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Employee(BaseModel):
    id:int
    name:str
    age:int
    desig:str
    exp:float

db: List[Employee]=[
    Employee(id=1,name="ravi",age=22,desig="SDE1",exp=2.2),
    Employee(id=2,name="mavi",age=23,desig="SDE3",exp=1.2),
    Employee(id=4,name="kon",age=33,desig="Product Manager",exp=1)

]

#print(db)


@app.get("/all")
def getItems():
    return db

@app.get("/employee/{id}")
def getItem(id:int):
    for em in db:
        if(em.id==id):
            return em
    return {}

@app.post("/create-emp")
def create_emp(employ:Employee):
    for em in db:
        if em.id==employ.id:
            return {"Error" : "Already exist"}

    db.append(employ)
    return db

@app.put("/update-emp/{id}")
def update_emp(id:int, employ:Employee):
    for idx, em in enumerate(db):
        if em.id == id:
            db[idx] = employ
            return db
    return {"Error": "Employee not found"}

@app.delete("/delete-emp/{id}")
def delete_emp(id:int):
    for em in db:
        if em.id==id:
            db.remove(em)
    return db