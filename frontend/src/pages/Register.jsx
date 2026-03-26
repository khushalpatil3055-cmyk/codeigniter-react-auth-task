import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const [form, setForm] = useState({
    email:'', first_name:'', last_name:'', password:'',
    university_name:'', gender:'male', year_joined:'', subject:'', phone:''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/users');
   } catch (err) {
  // Log the full error to the console so you can see the PHP error page
  console.error("Full Error Object:", err);

  // Update the error state to show the actual server message
  const serverMessage = err.response?.data?.message || "Check Console for 500 Error details";
  setError(serverMessage);
}
  };

  const f = (field) => ({ value: form[field], onChange: e => setForm({...form, [field]: e.target.value}) });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {[['email','Email','email'],['first_name','First Name','text'],['last_name','Last Name','text'],
            ['password','Password','password'],['university_name','University Name','text'],
            ['year_joined','Year Joined','number'],['subject','Subject','text'],['phone','Phone','text']
          ].map(([field, placeholder, type]) => (
            <input key={field} style={styles.input} type={type} placeholder={placeholder} {...f(field)} required />
          ))}
          <select style={styles.input} {...f('gender')}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button style={styles.btn} type="submit">Register</button>
        </form>
        <p style={{textAlign:'center', marginTop:'10px'}}>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', padding:'40px', background:'#f0f4f8', minHeight:'90vh' },
  card:      { background:'#fff', padding:'40px', borderRadius:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', width:'400px' },
  title:     { textAlign:'center', marginBottom:'20px', color:'#1e3a5f' },
  input:     { width:'100%', padding:'10px', margin:'6px 0', borderRadius:'6px', border:'1px solid #ccc', boxSizing:'border-box' },
  btn:       { width:'100%', padding:'12px', background:'#1e3a5f', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer', marginTop:'10px' },
  error:     { color:'red', fontSize:'12px' },
};