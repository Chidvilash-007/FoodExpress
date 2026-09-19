import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const S = {
  body: { height:"100vh", display:"flex", justifyContent:"center", alignItems:"center",
    background:"linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover" },
  box: { background:"rgba(255,255,255,0.95)", width:380, padding:40, borderRadius:25,
    textAlign:"center", boxShadow:"0 15px 40px rgba(0,0,0,0.4)" },
  input: { width:"100%", padding:14, margin:"12px 0", borderRadius:12, border:"1px solid #ddd", fontSize:14, boxSizing:"border-box" },
  btn: { width:"100%", padding:14, marginTop:15, border:"none", borderRadius:14,
    background:"#ff5a1f", color:"white", fontSize:16, fontWeight:600, cursor:"pointer" },
  err: { color:"red", fontSize:13, marginTop:8 },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("userProfile"));
    if (!saved) { setError("No account found. Please Sign Up."); return; }
    if (email === saved.email && password === saved.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div style={S.body}>
      <div style={S.box}>
        <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" alt="logo" width={50} />
        <h3 style={{ marginBottom:25, fontWeight:600 }}>Welcome Back 👋</h3>
        <form onSubmit={handleSubmit}>
          <input style={S.input} type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input style={S.input} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <div style={{ textAlign:"right", fontSize:13 }}>
            <Link to="/forgot" style={{ color:"#ff5a1f", fontWeight:500 }}>Forgot Password?</Link>
          </div>
          <button style={S.btn} type="submit">Login</button>
          {error && <p style={S.err}>{error}</p>}
        </form>
        <p style={{ marginTop:18, fontSize:14 }}>
          Don't have an account? <Link to="/signup" style={{ color:"#ff5a1f", fontWeight:600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
