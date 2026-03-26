import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="Email"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button style={styles.btn} type="submit">Login</button>
        </form>
        <p style={{textAlign:'center', marginTop:'10px'}}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'90vh', background:'#f0f4f8' },
  card:      { background:'#fff', padding:'40px', borderRadius:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', width:'350px' },
  title:     { textAlign:'center', marginBottom:'20px', color:'#1e3a5f' },
  input:     { width:'100%', padding:'10px', margin:'8px 0', borderRadius:'6px', border:'1px solid #ccc', boxSizing:'border-box' },
  btn:       { width:'100%', padding:'12px', background:'#1e3a5f', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer', marginTop:'10px' },
  error:     { color:'red', textAlign:'center' },
};