import { Link } from "react-router-dom";

const menuItems = [
  ["📦 My Orders", "/myorders"],
  ["📍 Saved Addresses", "/savedaddress"],
  ["💳 Payment Methods", "/payment"],
  ["⚙️ Account Settings", "/accsettings"],
];

export default function Account() {
  return (
    <div style={{ minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",
      background:"linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover" }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes borderMove { 0%{background-position:0% 50%} 100%{background-position:100% 50%} }
        .acc-box::before { content:""; position:absolute; inset:-2px; border-radius:32px; padding:2px;
          background:linear-gradient(45deg,#ff5a1f,#ffcc70,#ff5a1f); background-size:300% 300%;
          animation:borderMove 6s linear infinite;
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; z-index:-1; }
        .menu-link:hover { background:linear-gradient(45deg,#ff5a1f,#ff9966)!important; transform:translateX(6px); box-shadow:0 12px 25px rgba(255,90,31,0.4); }
        .back-btn:hover { background:rgba(255,255,255,0.35)!important; transform:scale(1.03); }
        .logout-btn:hover { transform:scale(1.03); box-shadow:0 12px 25px rgba(255,0,0,0.4); }
      `}</style>

      <div className="acc-box" style={{ width:460,padding:45,borderRadius:30,background:"rgba(255,255,255,0.08)",
        backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.25)",boxShadow:"0 25px 60px rgba(0,0,0,0.6)",
        textAlign:"center",color:"white",position:"relative",animation:"fadeIn 0.7s ease" }}>

        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginBottom:30 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={55} style={{ filter:"drop-shadow(0 0 8px #ff5a1f)" }} alt="logo" />
          <h2 style={{ fontSize:30,fontWeight:700,color:"#ffcc70" }}>FoodExpress</h2>
        </div>

        <div style={{ marginBottom:30 }}>
          <img src="https://static.vecteezy.com/system/resources/previews/013/042/571/large_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
            width={100} height={100} style={{ borderRadius:"50%",border:"3px solid #ff5a1f" }} alt="avatar" />
          <h3 style={{ fontSize:22,margin:"12px 0 5px" }}>Hello, Customer 👋</h3>
          <p style={{ fontSize:14,opacity:0.8,marginBottom:0 }}>customer@foodexpress.com</p>
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:15 }}>
          {menuItems.map(([label, to]) => (
            <Link key={to} to={to} className="menu-link" style={{ textDecoration:"none",padding:"15px 18px",
              borderRadius:18,fontSize:15,fontWeight:500,background:"rgba(255,255,255,0.12)",
              color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"0.3s" }}>
              {label} <span>➝</span>
            </Link>
          ))}
        </div>

        <Link to="/home" className="back-btn" style={{ marginTop:20,padding:14,width:"100%",borderRadius:16,fontWeight:600,
          textDecoration:"none",display:"block",transition:"0.3s",background:"rgba(255,255,255,0.2)",color:"white" }}>
          ⬅ Go Back
        </Link>
        <Link to="/login" className="logout-btn" style={{ marginTop:10,padding:14,width:"100%",borderRadius:16,fontWeight:600,
          textDecoration:"none",display:"block",transition:"0.3s",background:"linear-gradient(45deg,#ff2e2e,#ff5a5a)",color:"white" }}>
          Logout
        </Link>
      </div>
    </div>
  );
}
