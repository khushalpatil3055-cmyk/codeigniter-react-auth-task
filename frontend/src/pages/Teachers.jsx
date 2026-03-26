import { useEffect, useState } from 'react';
import API from '../api';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    API.get('/teachers').then(res => setTeachers(res.data.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎓 Teachers</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            {['ID','Name','Email','University','Gender','Year Joined','Subject','Phone'].map(h => (
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teachers.map((t, i) => (
            <tr key={t.id} style={{background: i%2===0 ? '#f9f9f9' : '#fff'}}>
              <td style={styles.td}>{t.id}</td>
              <td style={styles.td}>{t.first_name} {t.last_name}</td>
              <td style={styles.td}>{t.email}</td>
              <td style={styles.td}>{t.university_name}</td>
              <td style={styles.td}>{t.gender}</td>
              <td style={styles.td}>{t.year_joined}</td>
              <td style={styles.td}>{t.subject}</td>
              <td style={styles.td}>{t.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding:'30px' },
  title:     { color:'#1e3a5f', marginBottom:'20px' },
  table:     { width:'100%', borderCollapse:'collapse', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', borderRadius:'8px', overflow:'hidden' },
  thead:     { background:'#1e3a5f', color:'#fff' },
  th:        { padding:'12px 15px', textAlign:'left' },
  td:        { padding:'12px 15px', borderBottom:'1px solid #eee' },
};