import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>🎓 TeacherApp</span>
      <div>
        {token ? (
          <>
            <Link style={styles.link} to="/users">Users</Link>
            <Link style={styles.link} to="/teachers">Teachers</Link>
            <button style={styles.btn} onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav:   { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 30px', background:'#1e3a5f', color:'#fff' },
  brand: { fontSize:'1.3rem', fontWeight:'bold' },
  link:  { color:'#fff', marginRight:'15px', textDecoration:'none' },
  btn:   { background:'#e74c3c', color:'#fff', border:'none', padding:'7px 15px', borderRadius:'5px', cursor:'pointer' },
}; 