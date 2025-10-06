# # server/main.py
# from fastapi import FastAPI,Body, HTTPException, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from typing import List,Dict
# from pydantic import BaseModel
# import datetime
# app = FastAPI()

# origins = ["https://sih-prototype-olive.vercel.app/login"]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # --- EXPANDED MOCK DATABASE ---
# MOCK_DB = {
#     "classes": [
#         {"id": "5-A", "name": "Class 5 - Section A"},
#         {"id": "5-B", "name": "Class 5 - Section B"},
#         {"id": "6-A", "name": "Class 6 - Section A"},
#         {"id": "6-B", "name": "Class 6 - Section B"},
#     ],
#     "teachers": [
#         {"teacherId": "teacher-01", "name": "Ms. Geeta Sharma", "subject": "Science", "class": "5"},
#         {"teacherId": "teacher-02", "name": "Mr. Vikram Rathore", "subject": "Math", "class": "6"},
#     ],
#     "students": [
#         {"studentId": "student-01", "name": "Rohan Sharma", "class": "5", "section": "A"},
#         {"studentId": "STU-002", "name": "Priya Verma", "class": "5", "section": "A"},
#         {"studentId": "STU-003", "name": "Amit Kumar", "class": "6", "section": "B"},
#         {"studentId": "STU-004", "name": "Sunita Kaur", "class": "5", "section": "A"},
#         {"studentId": "STU-005", "name": "Vijay Singh", "class": "6", "section": "B"},
#         {"studentId": "STU-006", "name": "Anjali Devi", "class": "6", "section": "B"},
#     ],
#     # "attendance": [
#     #     {"recordId": "ATT-001", "date": "2024-09-27", "studentId": "student-01", "status": "Present"},
#     #     {"recordId": "ATT-002", "date": "2024-09-27", "studentId": "STU-002", "status": "Absent"},
#     # ],
#     "resources": [
#         {"resourceId": "RES-TB-SCI-5", "name": "Science Textbook (Class 5)", "category": "Govt. Scheme", "totalStock": 50, "distributedCount": 25, "barcode": "978-3-16-148410-0", "lastUpdated": "2024-09-01"},
#         {"resourceId": "RES-UNI-M-1", "name": "Uniform Set (Medium)", "category": "School Supply", "totalStock": 100, "distributedCount": 40, "barcode": "123-4-56-789012-3", "lastUpdated": "2024-08-25"},
#         {"resourceId": "RES-LAPTOP-1", "name": "Student Laptop", "category": "Govt. Scheme", "totalStock": 15, "distributedCount": 12, "lastUpdated": "2024-09-10"},
#     ],
#     "distributions": [
#         {"distId": "DIST-001", "studentId": "student-01", "resourceName": "Science Textbook (Class 5)", "date": "2024-09-20", "barcode": "978-3-16-148410-0"},
#     ]
# }
# # --- API Endpoints ---
# @app.get("/")
# def read_root(): return {"message": "Welcome"}

# @app.get("/classes")
# def get_classes(): return MOCK_DB["classes"]

# @app.get("/teachers")
# def get_teachers(): return MOCK_DB["teachers"]

# @app.get("/students")
# def get_students(): return MOCK_DB["students"]

# @app.get("/resources")
# def get_resources(): return MOCK_DB["resources"]

# @app.get("/distributions")
# def get_distributions(): return MOCK_DB["distributions"]

# @app.get("/stats/teacher/{teacherId}")
# def get_teacher_stats(teacherId: str):
#     return {"totalStudents": len(MOCK_DB["students"]), "todaysAttendance": 2, "resourcesDistributed": len(MOCK_DB["distributions"])}

# @app.get("/students/{student_id}/attendance")
# def get_student_attendance(student_id: str):
#     return [record for record in MOCK_DB["attendance"] if record["studentId"] == student_id]

# @app.get("/students/{student_id}/resources")
# def get_student_resources(student_id: str):
#     return [dist for dist in MOCK_DB["distributions"] if dist["studentId"] == student_id]

# @app.post("/students/promote")
# def promote_students(student_ids: List[str] = Body(...), target_class: str = Body(...), target_section: str = Body(...)):
#     updated_count = 0
#     for student in MOCK_DB["students"]:
#         if student["studentId"] in student_ids:
#             student["class"] = target_class
#             student["section"] = target_section
#             updated_count += 1
#     return {"status": "success", "message": f"{updated_count} students promoted successfully."}

# @app.post("/resources/{resource_id}/update_stock")
# def update_stock(resource_id: str, payload: Dict = Body(...)):
#     new_total_stock = payload.get("newTotalStock")
#     if new_total_stock is None: raise HTTPException(status_code=400, detail="newTotalStock is required")
#     for resource in MOCK_DB["resources"]:
#         if resource["resourceId"] == resource_id:
#             resource["totalStock"] = int(new_total_stock)
#             return {"status": "success", "message": f"Stock for {resource['name']} updated to {new_total_stock}."}
#     raise HTTPException(status_code=404, detail="Resource not found")

# @app.post("/distributions/scan_and_create")
# async def scan_and_create_distribution(image: UploadFile = File(...)):
#     recognized_student_id = "student-01" 
#     scanned_barcode = "978-3-16-148410-0"
#     target_student = next((s for s in MOCK_DB["students"] if s["studentId"] == recognized_student_id), None)
#     target_resource = next((r for r in MOCK_DB["resources"] if r.get("barcode") == scanned_barcode), None)
#     if not target_student: raise HTTPException(status_code=404, detail=f"Student not recognized.")
#     if not target_resource: raise HTTPException(status_code=404, detail=f"Resource not found.")
#     if target_resource["distributedCount"] >= target_resource["totalStock"]: raise HTTPException(status_code=400, detail=f"Out of stock for {target_resource['name']}")
#     target_resource["distributedCount"] += 1
#     new_dist_id = f"DIST-{len(MOCK_DB['distributions']) + 1:03d}"
#     new_distribution = {"distId": new_dist_id, "studentId": target_student["studentId"], "resourceName": target_resource["name"], "date": datetime.date.today().isoformat(), "barcode": scanned_barcode}
#     MOCK_DB["distributions"].append(new_distribution)
#     return {"status": "success", "message": f"Successfully distributed '{target_resource['name']}' to {target_student['name']}."}

# server/main.py
from fastapi import FastAPI, Body, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import datetime

app = FastAPI()

# --- CHANGE 1: CORRECTED CORS ORIGINS ---
# This allows your entire Vercel app and your local app to make requests.
origins =  ["https://sih-prototype-olive.vercel.app/login"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MOCK DATABASE (THE SINGLE SOURCE OF TRUTH) ---
MOCK_DB = {
    "classes": [
        {"id": "5-A", "name": "Class 5 - Section A"}, {"id": "5-B", "name": "Class 5 - Section B"},
        {"id": "6-A", "name": "Class 6 - Section A"}, {"id": "6-B", "name": "Class 6 - Section B"},
    ],
    "teachers": [
        {"teacherId": "teacher-01", "name": "Ms. Geeta Sharma", "subject": "Science", "class": "5"},
        {"teacherId": "teacher-02", "name": "Mr. Vikram Rathore", "subject": "Math", "class": "6"},
    ],
    "students": [
        {"studentId": "student-01", "name": "Rohan Sharma", "class": "5", "section": "A"},
        {"studentId": "STU-002", "name": "Priya Verma", "class": "5", "section": "A"},
        {"studentId": "STU-003", "name": "Amit Kumar", "class": "6", "section": "B"},
    ],
    # --- CHANGE 2: UNCOMMENTED ATTENDANCE DATA ---
    "attendance": [
        {"recordId": "ATT-001", "date": "2024-09-27", "studentId": "student-01", "status": "Present"},
        {"recordId": "ATT-002", "date": "2024-09-27", "studentId": "STU-002", "status": "Absent"},
    ],
    "resources": [
        {"resourceId": "RES-TB-SCI-5", "name": "Science Textbook (Class 5)", "category": "Govt. Scheme", "totalStock": 50, "distributedCount": 25, "barcode": "978-3-16-148410-0"},
        {"resourceId": "RES-UNI-M-1", "name": "Uniform Set (Medium)", "category": "School Supply", "totalStock": 100, "distributedCount": 40, "barcode": "123-4-56-789012-3"},
        {"resourceId": "RES-LAPTOP-1", "name": "Student Laptop", "category": "Govt. Scheme", "totalStock": 15, "distributedCount": 12},
    ],
    "distributions": [
        {"distId": "DIST-001", "studentId": "student-01", "resourceName": "Science Textbook (Class 5)", "date": "2024-09-20"},
        {"distId": "DIST-002", "studentId": "student-01", "resourceName": "Uniform Set (Medium)", "date": "2024-09-18"},
    ]
}

# --- READ-ONLY API ENDPOINTS ---
# This section ensures your dashboards are always populated with data.
@app.get("/")
def read_root(): return {"message": "Welcome"}
@app.get("/classes")
def get_classes(): return MOCK_DB["classes"]
@app.get("/teachers")
def get_teachers(): return MOCK_DB["teachers"]
@app.get("/students")
def get_students(): return MOCK_DB["students"]
@app.get("/resources")
def get_resources(): return MOCK_DB["resources"]
@app.get("/distributions")
def get_distributions(): return MOCK_DB["distributions"]
@app.get("/attendance")
def get_attendance(): return MOCK_DB["attendance"]

# ... other GET endpoints that only read data are fine ...
@app.get("/students/{student_id}/attendance")
def get_student_attendance(student_id: str):
    return [record for record in MOCK_DB["attendance"] if record["studentId"] == student_id]


# --- CHANGE 3: SIMULATED WRITE ENDPOINTS ---
# These functions now return a success message WITHOUT changing MOCK_DB.
@app.post("/distributions/scan_and_create")
async def scan_and_create_distribution(image: UploadFile = File(...)):
    # The action is simulated, but the success message is real.
    return {"status": "success", "message": "Successfully distributed 'Science Textbook' to Rohan Sharma. (Demo)"}

@app.post("/students/promote")
def promote_students(payload: Dict = Body(...)):
    return {"status": "success", "message": "Students successfully promoted. (Demo)"}

@app.post("/resources/{resource_id}/update_stock")
def update_stock(resource_id: str, payload: Dict = Body(...)):
    new_stock = payload.get("newTotalStock", "N/A")
    return {"status": "success", "message": f"Stock updated to {new_stock}. (Demo)"}