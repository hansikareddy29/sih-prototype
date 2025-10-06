// app/(app)/admin/promote-students/page.tsx
'use client';
import withRoleGuard from '../../../components/withRoleGuard';
import { useEffect, useState, useMemo } from 'react';
import api from '../../../api/axios';
import styles from '../../Dashboard.module.css';
import { FaArrowRight } from 'react-icons/fa';

interface Student {
  studentId: string;
  name: string;
  class: string;
  section: string;
}

interface SchoolClass {
  id: string;
  name: string;
}

function PromoteStudentsPage() {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [allClasses, setAllClasses] = useState<SchoolClass[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [sourceClassId, setSourceClassId] = useState('5-A');
  const [targetClass, setTargetClass] = useState('6');
  const [targetSection, setTargetSection] = useState('A');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all necessary data on component mount
    const fetchData = async () => {
      try {
        const [studentsRes, classesRes] = await Promise.all([
          api.get('/students'),
          api.get('/classes'),
        ]);
        setAllStudents(studentsRes.data);
        setAllClasses(classesRes.data);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // useMemo will re-calculate the filtered list ONLY when dependencies change
  const filteredStudents = useMemo(() => {
    const [cls, sec] = sourceClassId.split('-');
    return allStudents.filter(s => s.class === cls && s.section === sec);
  }, [sourceClassId, allStudents]);
  
  // Effect to clear selection when the source class changes
  useEffect(() => {
    setSelectedStudents(new Set());
  }, [sourceClassId]);

  const handleSelectStudent = (studentId: string) => {
    const newSelection = new Set(selectedStudents);
    newSelection.has(studentId) ? newSelection.delete(studentId) : newSelection.add(studentId);
    setSelectedStudents(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.studentId)));
    }
  };

  const handlePromote = async () => {
    if (selectedStudents.size === 0) return;
    try {
      const response = await api.post('/students/promote', {
        student_ids: Array.from(selectedStudents),
        target_class: targetClass,
        target_section: targetSection,
      });
      alert(response.data.message);
      // In a real app, you would refetch the student list here to see the changes
      setSelectedStudents(new Set());
    } catch (error) {
      alert("An error occurred during promotion.");
    }
  };

  if (isLoading) {
    return <div className={styles.container}><p>Loading student data...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Promote Students</h1>
      <p className={styles.subtitle}>Upgrade existing students to their new class for the academic year.</p>
      
      <div className={styles.pageGrid}>
        {/* Left Column: Flow Control */}
        <div className={`${styles.card} ${styles.flowCard}`}>
          <div className={styles.flowSection}>
            <h3>1. Select Current Class</h3>
            <select value={sourceClassId} onChange={e => setSourceClassId(e.target.value)} className={styles.select}>
              {allClasses.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
            </select>
          </div>

          <div className={styles.flowArrow}>
            <FaArrowRight size={24} />
          </div>

          <div className={styles.flowSection}>
            <h3>2. Select New Class</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select value={targetClass} onChange={e => setTargetClass(e.target.value)} className={styles.select}>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
              </select>
              <select value={targetSection} onChange={e => setTargetSection(e.target.value)} className={styles.select}>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Student List */}
        <div className={styles.card}>
          <h3>Students in {allClasses.find(c => c.id === sourceClassId)?.name} ({filteredStudents.length})</h3>
          <div className={styles.studentList}>
            <div className={styles.studentListHeader}>
              <input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.size > 0 && selectedStudents.size === filteredStudents.length} />
              <span>Name</span>
              <span style={{textAlign: 'right'}}>Update Photo</span>
            </div>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div key={student.studentId} className={styles.studentListItem}>
                  <input type="checkbox" checked={selectedStudents.has(student.studentId)} onChange={() => handleSelectStudent(student.studentId)} />
                  <span>{student.name}</span>
                  <button className={styles.smallButton}>Optional</button>
                </div>
              ))
            ) : (
              <p style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>No students found in this class.</p>
            )}
          </div>
        </div>
      </div>

      <button onClick={handlePromote} className={styles.promoteButton} disabled={selectedStudents.size === 0}>
        Promote {selectedStudents.size} Selected Student(s)
      </button>
    </div>
  );
}
export default withRoleGuard(['admin'])(PromoteStudentsPage);