# server/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- EXPANDED MOCK DATABASE ---
MOCK_DB = {
    "teachers": [
        {"teacherId": "teacher-01", "name": "Ms. Geeta Sharma", "subject": "Science", "class": "5"},
        {"teacherId": "teacher-02", "name": "Mr. Vikram Rathore", "subject": "Math", "class": "6"},
    ],
    "students": [
        {"studentId": "student-01", "name": "Rohan Sharma", "class": "5", "section": "A"},
        {"studentId": "STU-002", "name": "Priya Verma", "class": "5", "section": "A"},
        {"studentId": "STU-003", "name": "Amit Kumar", "class": "6", "section": "B"},
        {"studentId": "STU-004", "name": "Sunita Kaur", "class": "5", "section": "A"},
        {"studentId": "STU-005", "name": "Vijay Singh", "class": "6", "section": "B"},
        {"studentId": "STU-006", "name": "Anjali Devi", "class": "6", "section": "B"},
    ],
    # ... (attendance, resources, distributions data remains the same) ...
    "attendance": [
        {"recordId": "ATT-001", "date": "2024-09-27", "studentId": "student-01", "status": "Present"},
        {"recordId": "ATT-002", "date": "2024-09-27", "studentId": "STU-002", "status": "Absent"},
        {"recordId": "ATT-003", "date": "2024-09-27", "studentId": "STU-004", "status": "Present"},
    ],
    "resources": [
        {"resourceId": "RES-TB-SCI-5", "name": "Science Textbook (Class 5)", "category": "Govt. Scheme", "totalStock": 50, "distributedCount": 25},
        {"resourceId": "RES-UNI-M-1", "name": "Uniform Set (Medium)", "category": "School Supply", "totalStock": 100, "distributedCount": 40},
    ],
    "distributions": [
        {"distId": "DIST-001", "studentId": "student-01", "resourceName": "Science Textbook (Class 5)", "date": "2024-09-20", "barcode": "978-3-16-148410-0"},
        {"distId": "DIST-002", "studentId": "STU-002", "resourceName": "Uniform Set (Medium)", "date": "2024-09-18", "barcode": "123-4-56-789012-3"},
    ]
}

# --- API ENDPOINTS ---
@app.get("/")
def read_root(): return {"message": "Welcome to the Rural School App API"}

@app.get("/teachers")
def get_teachers(): return MOCK_DB["teachers"]

@app.get("/students")
def get_students(): return MOCK_DB["students"]

@app.get("/resources")
def get_resources(): return MOCK_DB["resources"]

@app.get("/distributions")
def get_distributions(): return MOCK_DB["distributions"]

@app.get("/stats/teacher/{teacherId}")
def get_teacher_stats(teacherId: str):
    return {"totalStudents": 6, "todaysAttendance": 2, "resourcesDistributed": 15, "syncStatus": "synced"}
@app.get("/students/{student_id}/attendance")
def get_student_attendance(student_id: str):
    return [record for record in MOCK_DB["attendance"] if record["studentId"] == student_id]
@app.get("/students/{student_id}/resources")
def get_student_resources(student_id: str):
    return [dist for dist in MOCK_DB["distributions"] if dist["studentId"] == student_id]