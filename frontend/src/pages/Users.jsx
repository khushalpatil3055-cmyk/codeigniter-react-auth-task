import { useEffect, useState } from 'react';
import API from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users').then(res => setUsers(res.data.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 Auth Users</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            {['ID','Email','First Name','Last Name','Created At'].map(h => (
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id} style={{background: i%2===0 ? '#f9f9f9' : '#fff'}}>
              <td style={styles.td}>{u.id}</td>
              <td style={styles.td}>{u.email}</td>
              <td style={styles.td}>{u.first_name}</td>
              <td style={styles.td}>{u.last_name}</td>
              <td style={styles.td}>{u.created_at}</td>
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