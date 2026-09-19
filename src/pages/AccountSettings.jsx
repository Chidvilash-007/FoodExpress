import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const S = {
  body:{ height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",
    background:"linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover" },
  box:{ width:460,padding:40,borderRadius:25,background:"rgba(255,255,255,0.95)",boxShadow:"0 12px 35px rgba(0,0,0,0.4)" },
  input:{ padding:12,borderRadius:10,border:"1px solid #ddd",width:"100%",marginBottom:15,boxSizing:"border-box",fontSize:14 },
  btn:{ padding:14,border:"none",borderRadius:12,background:"#ff5a1f",color:"white",fontWeight:"bold",cursor:"pointer",width:"100%" },
};

export default function AccountSettings() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (user) setForm(user);
  }, []);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, password } = form;
    if (!name || !email || !phone || !password) { alert("Please fill all fields!"); return; }
    if (!email.includes("@")) { alert("Enter valid email!"); return; }
    if (phone.length < 10) { alert("Enter valid phone number!"); return; }
    localStorage.setItem("userProfile", JSON.stringify(form));
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <div style={S.body}>
      <div style={S.box}>
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginBottom:20 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={50} alt="logo" />
          <h2 style={{ color:"#ff5a1f" }}>FoodExpress</h2>
        </div>
        <h3 style={{ textAlign:"center",marginBottom:25 }}>⚙️ Account Settings</h3>
        <form onSubmit={handleSubmit}>
          <input style={S.input} type="text" placeholder="Full Name" value={form.name} onChange={update("name")} />
          <input style={S.input} type="email" placeholder="Email Address" value={form.email} onChange={update("email")} />
          <input style={S.input} type="text" placeholder="Phone Number" value={form.phone} onChange={update("phone")} />
          <input style={S.input} type="password" placeholder="New Password" value={form.password} onChange={update("password")} />
          <button type="submit" style={S.btn}>Save Changes</button>
        </form>
        {show && <p style={{ marginTop:10,color:"green",textAlign:"center" }}>✅ Profile Updated Successfully!</p>}
        <div style={{ textAlign:"center",marginTop:15 }}>
          <Link to="/account" style={{ color:"#555" }}>⬅ Back to My Account</Link>
        </div>
      </div>
    </div>
  );
}
