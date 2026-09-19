import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const S = {
  body: { minHeight:"100vh", background:"linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover", display:"flex", justifyContent:"center", alignItems:"center", padding:20 },
  box: { width:500, maxWidth:"100%", padding:40, borderRadius:25, background:"rgba(255,255,255,0.95)", boxShadow:"0 15px 40px rgba(0,0,0,0.4)" },
  group: { display:"flex", alignItems:"center", gap:15, marginBottom:20 },
  label: { fontSize:14, fontWeight:600, flex:"0 0 120px", textAlign:"left", color:"#333" },
  input: { flex:1, padding:"12px 15px", borderRadius:12, border:"1px solid #ddd", fontSize:14 },
  btn: { marginTop:10, padding:15, border:"none", borderRadius:14, background:"#ff5a1f", color:"white", fontWeight:600, fontSize:16, cursor:"pointer", width:"100%" },
};

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"" });
  const [msg, setMsg] = useState({ type:"", text:"" });
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userProfile"));
    if (saved) setForm(saved);
  }, []);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, password } = form;
    if (!name || !email || !phone || !password) { setMsg({ type:"error", text:"All fields are required!" }); return; }
    if (!email.includes("@")) { setMsg({ type:"error", text:"Enter a valid email!" }); return; }
    if (phone.length !== 10 || isNaN(phone)) { setMsg({ type:"error", text:"Phone must be 10 digits!" }); return; }
    localStorage.setItem("userProfile", JSON.stringify(form));
    setMsg({ type:"success", text:"Profile Updated Successfully ✅" });
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div style={S.body}>
      <div style={S.box}>
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:10, marginBottom:20 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={50} alt="logo" />
          <h2 style={{ color:"#ff5a1f", fontWeight:600 }}>FoodExpress</h2>
        </div>
        <h3 style={{ textAlign:"center", marginBottom:25, fontWeight:600, fontSize:24 }}>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          {[["Full Name","name","text"],["Email Address","email","email"],["Phone Number","phone","tel"],["Password","password","password"]].map(([label,key,type]) => (
            <div key={key} style={S.group}>
              <label style={S.label}>{label}</label>
              <input style={S.input} type={type} placeholder={`Enter ${label.toLowerCase()}`} value={form[key]} onChange={update(key)} required />
            </div>
          ))}
          <button type="submit" style={S.btn}>Save Changes</button>
          {msg.text && <p style={{ textAlign:"center", marginTop:10, color: msg.type==="success"?"#2ecc71":"#e74c3c", fontWeight:500 }}>{msg.text}</p>}
        </form>
        <div style={{ textAlign:"center", marginTop:25 }}>
          <Link to="/account" style={{ fontSize:14, color:"#777" }}>← Back to My Account</Link>
        </div>
      </div>
    </div>
  );
}
