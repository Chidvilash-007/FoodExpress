import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// ─── Location ─────────────────────────────────────────────────────────────────
export function Location() {
  const [loc, setLoc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLoc(`Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)}`);
      });
    }
  }, []);

  const confirmLocation = () => {
    if (!loc) { alert("Please select a location."); return; }
    localStorage.setItem("userLocation", loc);
    navigate("/home");
  };

  const suggestions = ["VIT University, Vellore","Katpadi, Vellore","Gandhi Nagar, Vellore","Green Circle, Vellore"];

  return (
    <div style={{ height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden",background:"#0f0f0f",position:"relative" }}>
      <style>{`
        @keyframes float { from{transform:translateY(100vh)} to{transform:translateY(-10vh)} }
        @keyframes borderMove { 0%{background-position:0% 50%} 100%{background-position:100% 50%} }
        .loc-box::before { content:""; position:absolute; inset:-2px; border-radius:30px; padding:2px;
          background:linear-gradient(45deg,#ff5a1f,#ffcc70,#ff5a1f); background-size:300% 300%;
          animation:borderMove 6s linear infinite;
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; z-index:-1; }
        .sugg-item:hover { background:rgba(255,255,255,0.25)!important; transform:translateX(6px); }
        .btn-loc:hover { transform:translateY(-3px); box-shadow:0 15px 30px rgba(255,90,31,0.4); }
      `}</style>

      {[...Array(20)].map((_,i) => (
        <div key={i} style={{ position:"absolute",width:6,height:6,background:"#ff9966",borderRadius:"50%",opacity:0.4,
          left:`${Math.random()*100}vw`,animation:`float ${5+Math.random()*5}s ${Math.random()*5}s infinite linear` }} />
      ))}

      <div className="loc-box" style={{ width:480,maxWidth:"95%",padding:45,borderRadius:28,background:"rgba(255,255,255,0.08)",
        backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.2)",textAlign:"center",color:"white",position:"relative" }}>
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginBottom:15 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={50} style={{ filter:"drop-shadow(0 0 10px #ff5a1f)" }} alt="logo" />
          <h2 style={{ fontSize:30,fontWeight:700,color:"#ffcc70" }}>FoodExpress</h2>
        </div>
        <p style={{ opacity:0.85,marginBottom:28 }}>Select your delivery location to continue</p>

        <div style={{ display:"flex",alignItems:"center",background:"rgba(255,255,255,0.15)",padding:"14px 18px",borderRadius:16,marginBottom:20 }}>
          📍
          <input type="text" value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Enter your area, street, or city..."
            style={{ border:"none",outline:"none",background:"transparent",flex:1,color:"white",paddingLeft:10 }} />
        </div>

        <button className="btn-loc" onClick={() => { navigator.geolocation?.getCurrentPosition(p => setLoc(`Lat: ${p.coords.latitude.toFixed(4)}, Long: ${p.coords.longitude.toFixed(4)}`)); }}
          style={{ width:"100%",padding:14,border:"none",borderRadius:16,fontWeight:600,cursor:"pointer",marginBottom:15,transition:"0.3s",background:"linear-gradient(45deg,#ff5a1f,#ff9966)",color:"white" }}>
          Use Current Location
        </button>
        <button className="btn-loc" onClick={confirmLocation}
          style={{ width:"100%",padding:14,border:"none",borderRadius:16,fontWeight:600,cursor:"pointer",marginBottom:15,transition:"0.3s",background:"rgba(255,255,255,0.2)",color:"white" }}>
          Confirm Location
        </button>

        <div style={{ textAlign:"left" }}>
          <h3 style={{ marginBottom:15 }}>Nearby Locations</h3>
          {suggestions.map(s => (
            <div key={s} className="sugg-item" onClick={()=>setLoc(s)}
              style={{ padding:12,borderRadius:12,background:"rgba(255,255,255,0.12)",marginBottom:10,cursor:"pointer",transition:"0.3s" }}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BookTable ────────────────────────────────────────────────────────────────
export function BookTable() {
  const [form, setForm] = useState({ name:"", phone:"", date:"", time:"", guests:"" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const update = (k) => (e) => setForm({...form,[k]:e.target.value});

  const bookSpot = () => {
    if (Object.values(form).some(v=>!v)) { alert("Please fill all details!"); return; }
    setSuccess(true);
    setTimeout(() => navigate("/home"), 2000);
  };

  return (
    <div style={{ minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",
      background:"linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1552566626-52f8b828add9') center/cover" }}>
      <div style={{ width:420,padding:40,borderRadius:20,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(18px)",
        border:"1px solid rgba(255,255,255,0.2)",color:"white",boxShadow:"0 20px 50px rgba(0,0,0,0.6)" }}>
        <h2 style={{ textAlign:"center",marginBottom:25,color:"#ffcc70" }}>Reserve Your Table</h2>
        {[["Full Name","name","text"],["Phone Number","phone","tel"],["Date","date","date"],["Time","time","time"]].map(([ph,k,t])=>(
          <div key={k} style={{ marginBottom:15 }}>
            <input type={t} placeholder={ph} value={form[k]} onChange={update(k)}
              style={{ width:"100%",padding:10,borderRadius:10,border:"none",outline:"none",boxSizing:"border-box" }} />
          </div>
        ))}
        <div style={{ marginBottom:15 }}>
          <select value={form.guests} onChange={update("guests")} style={{ width:"100%",padding:10,borderRadius:10,border:"none",outline:"none" }}>
            <option value="">Select Number of Guests</option>
            {["1","2","3","4","5+"].map(g=><option key={g}>{g}</option>)}
          </select>
        </div>
        <button onClick={bookSpot} style={{ width:"100%",padding:12,borderRadius:12,border:"none",
          background:"linear-gradient(45deg,#ff5a1f,#ff9966)",color:"white",fontWeight:600,cursor:"pointer",transition:"0.3s" }}>
          Book Spot
        </button>
        {success && <div style={{ marginTop:15,textAlign:"center",color:"#7CFC00",fontWeight:500 }}>🎉 Your Table Has Been Successfully Reserved!</div>}
      </div>
    </div>
  );
}

// ─── CustomerCare ─────────────────────────────────────────────────────────────
export function CustomerCare() {
  return (
    <div style={{ fontFamily:"Arial,sans-serif",background:"#f5f5f5",margin:0,padding:0 }}>
      <div style={{ maxWidth:850,margin:"50px auto",background:"white",padding:40,borderRadius:10,boxShadow:"0 0 10px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign:"center",marginTop:30 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={150} alt="FoodExpress Logo" />
        </div>
        <h1 style={{ textAlign:"center",color:"#3f44b5",marginBottom:25 }}>Customer Care</h1>
        <p style={{ lineHeight:1.6,color:"#555",textAlign:"center" }}>Need help with your order? FoodExpress Customer Care is always here for you.</p>
        <div style={{ marginTop:30,textAlign:"center",padding:20,borderRadius:10,background:"#eef0ff" }}>
          <h2>Contact Us</h2>
          <p><strong>Email:</strong> support@foodexpress.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Working Hours:</strong> 9 AM - 10 PM (All Days)</p>
        </div>
        <p style={{ lineHeight:1.6,color:"#555",textAlign:"center",marginTop:20 }}>For order issues, refunds, delivery delays, or feedback, feel free to reach out anytime.</p>
      </div>
      <footer style={{ textAlign:"center",background:"#3f44b5",color:"white",padding:15,marginTop:40 }}>
        © 2026 FoodExpress. All Rights Reserved.
      </footer>
    </div>
  );
}

// ─── Certificates ─────────────────────────────────────────────────────────────
const certData = [
  { img:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/FSSAI_Logo.svg/1200px-FSSAI_Logo.svg.png", title:"FSSAI Approved", desc:"Certified by the Food Safety and Standards Authority of India for hygiene and safety." },
  { img:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/ISO_logo_%28red_square%29.svg/240px-ISO_logo_%28red_square%29.svg.png", title:"ISO Quality Certified", desc:"Recognized for maintaining international standards in food quality management." },
  { img:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=500", title:"Organic Food Partner", desc:"Partnered with certified organic suppliers to provide healthy meal options." },
  { img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500", title:"Trusted Food Brand", desc:"Awarded for excellent customer satisfaction and reliable delivery service." },
];

export function Certificates() {
  return (
    <div style={{ fontFamily:"'Poppins',sans-serif",margin:0,background:"#f9fafc",color:"#222" }}>
      <header style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 60px",background:"white",boxShadow:"0 6px 20px rgba(0,0,0,0.08)",position:"sticky",top:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={45} alt="logo" />
          <h2 style={{ fontSize:22,fontWeight:600,color:"#ff5a1f" }}>FoodExpress</h2>
        </div>
        <nav>
          <Link to="/home" style={{ textDecoration:"none",marginLeft:25,fontWeight:500,color:"#333" }}>Home</Link>
          <Link to="/newsroom" style={{ textDecoration:"none",marginLeft:25,fontWeight:500,color:"#333" }}>Newsroom</Link>
          <Link to="/care" style={{ textDecoration:"none",marginLeft:25,fontWeight:500,color:"#333" }}>Customer Care</Link>
        </nav>
      </header>
      <section style={{ textAlign:"center",padding:"60px 20px 30px" }}>
        <h1 style={{ fontSize:42,fontWeight:600,marginBottom:15,color:"#111" }}>Our Certifications</h1>
        <p style={{ maxWidth:650,margin:"auto",fontSize:16,color:"#555" }}>
          FoodExpress is committed to delivering safe, hygienic, and premium quality food. These certificates represent our trust and standards.
        </p>
      </section>
      <section style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:35,padding:"50px 80px" }}>
        {certData.map((c) => (
          <div key={c.title} style={{ background:"white",borderRadius:18,padding:20,textAlign:"center",boxShadow:"0 10px 25px rgba(0,0,0,0.08)",transition:"0.3s" }}>
            <img src={c.img} alt={c.title} style={{ width:"100%",height:200,objectFit:"contain",borderRadius:14,marginBottom:18 }} />
            <h3 style={{ fontSize:22,fontWeight:600,marginBottom:10,color:"#ff5a1f" }}>{c.title}</h3>
            <p style={{ fontSize:14,color:"#555",lineHeight:1.5 }}>{c.desc}</p>
          </div>
        ))}
      </section>
      <footer style={{ textAlign:"center",padding:20,background:"white",marginTop:40,fontSize:14,color:"gray" }}>
        © 2026 FoodExpress. All Rights Reserved.
      </footer>
    </div>
  );
}

// ─── Newsroom ─────────────────────────────────────────────────────────────────
const news = [
  { tag:"healthy",tagClass:"Healthy Meals",title:"Fresh & Nutritious Food Options",desc:"Balanced meals made with farm-fresh ingredients for students and fitness lovers.",bullets:["Boosts immunity","High-protein recipes","Clean everyday meals"],img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
  { tag:"delivery",tagClass:"Fast Delivery",title:"Hot Meals Delivered in 30 Minutes",desc:"Our upgraded delivery network ensures faster, fresher meals.",bullets:["Live tracking","Reliable partners","Guaranteed freshness"],img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { tag:"offers",tagClass:"Special Offers",title:"Festival Combos & Daily Discounts",desc:"Enjoy exclusive discounts, family packs, and exciting weekly offers.",bullets:["Weekly deals","Student combos","Affordable meals"],img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" },
  { tag:"healthy",tagClass:"Healthy Meals",title:"Organic Food Market Rising",desc:"Customers are choosing organic meals for better health and premium taste.",bullets:["Eco-friendly","Premium quality","Higher nutrition"],img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
  { tag:"delivery",tagClass:"Fast Delivery",title:"New Delivery Hubs Across Cities",desc:"FoodExpress expands delivery hubs to reduce waiting time.",bullets:["Quicker service","More coverage","Better customer support"],img:"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400" },
  { tag:"offers",tagClass:"Special Offers",title:"Weekend Mega Sale is Live",desc:"Order your favorite meals with up to 50% off this weekend.",bullets:["Huge discounts","Family packs","Limited time offer"],img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400" },
];

const tagColors = { healthy:"#2e7d32", delivery:"#ff6a00", offers:"#d81b60" };

export function Newsroom() {
  return (
    <div style={{ margin:0,fontFamily:'"Poppins",Arial,sans-serif',background:"#fffaf3",color:"#222" }}>
      <nav style={{ background:"white",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 60px",boxShadow:"0 3px 15px rgba(0,0,0,0.08)",position:"sticky",top:0,zIndex:1000 }}>
        <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={40} alt="logo" style={{ cursor:"pointer" }} />
        <div>
          <Link to="/home" style={{ textDecoration:"none",marginLeft:25,fontWeight:600,color:"#222" }}>Home</Link>
          <Link to="/care" style={{ textDecoration:"none",marginLeft:25,fontWeight:600,color:"#222" }}>Support</Link>
        </div>
      </nav>
      <section style={{ background:"linear-gradient(to right,#111,#2c2c2c)",padding:"90px 20px",textAlign:"center",color:"white" }}>
        <h1 style={{ fontSize:60,marginBottom:15,letterSpacing:1 }}>FoodExpress Newsroom</h1>
        <p style={{ fontSize:18,maxWidth:720,margin:"auto",opacity:0.85 }}>
          Stay updated with the latest food trends, healthy meal launches, premium delivery upgrades, and exciting FoodExpress offers.
        </p>
      </section>
      <div style={{ maxWidth:1200,margin:"70px auto",padding:20,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:35 }}>
        {news.map((n) => (
          <div key={n.title} style={{ background:"white",borderRadius:22,overflow:"hidden",boxShadow:"0 12px 28px rgba(0,0,0,0.1)",transition:"0.4s" }}>
            <img src={n.img} alt={n.title} style={{ width:"100%",height:230,objectFit:"cover" }} />
            <div style={{ padding:28 }}>
              <span style={{ display:"inline-block",padding:"7px 16px",borderRadius:25,fontSize:13,fontWeight:700,marginBottom:14,color:"white",background:tagColors[n.tag] }}>{n.tagClass}</span>
              <h2 style={{ fontSize:23,margin:"12px 0",color:"#111" }}>{n.title}</h2>
              <p style={{ fontSize:15,lineHeight:1.7,color:"#555" }}>{n.desc}</p>
              <ul style={{ marginTop:18,paddingLeft:20 }}>
                {n.bullets.map(b=><li key={b} style={{ marginBottom:9,fontSize:14,color:"#333" }}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <footer style={{ marginTop:90,background:"#111",color:"white",textAlign:"center",padding:28,fontSize:15 }}>
        © 2026 FoodExpress. All Rights Reserved.
      </footer>
    </div>
  );
}

// ─── Policy ───────────────────────────────────────────────────────────────────
export function Policy() {
  return (
    <div style={{ fontFamily:"Arial,sans-serif",background:"#f5f5f5",margin:0,padding:0 }}>
      <div style={{ textAlign:"center",marginTop:30 }}>
        <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={150} alt="FoodExpress Logo" />
      </div>
      <div style={{ maxWidth:900,margin:"30px auto",background:"white",padding:40,borderRadius:10,boxShadow:"0 0 10px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign:"center",color:"#3f44b5",marginBottom:25 }}>Privacy Policy</h1>
        <p><strong>FoodExpress</strong> values your privacy. This Privacy Policy explains how we collect, use, and protect your information.</p>
        <h2>1. Information We Collect</h2>
        <p>We may collect personal details such as your name, phone number, email, delivery address, and payment information.</p>
        <h2>2. Data Protection</h2>
        <p>FoodExpress ensures your data is stored securely and not shared with others.</p>
        <h2>3. Contact</h2>
        <p>Email us at: <strong>support@foodexpress.com</strong></p>
      </div>
      <footer style={{ textAlign:"center",background:"#3f44b5",color:"white",padding:15,marginTop:40 }}>
        © 2026 FoodExpress. All Rights Reserved.
      </footer>
    </div>
  );
}

// ─── Terms ────────────────────────────────────────────────────────────────────
export function Terms() {
  return (
    <div style={{ fontFamily:"Arial,sans-serif",margin:0,padding:0,background:"#f5f5f5" }}>
      <div style={{ textAlign:"center",marginTop:30 }}>
        <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={150} alt="FoodExpress Logo" />
      </div>
      <div style={{ maxWidth:900,margin:"50px auto",background:"white",padding:40,borderRadius:10,boxShadow:"0 0 10px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign:"center",color:"#3f44b5",marginBottom:30 }}>Terms of Use</h1>
        {[
          ["1. Acceptance of Terms","By accessing or using FoodExpress services, you confirm that you accept these terms and agree to comply with them."],
          ["2. Use of Service","You agree to use FoodExpress only for lawful purposes and in a way that does not violate the rights of others."],
          ["4. Orders & Payments","All orders placed through FoodExpress are subject to availability and confirmation. Payments must be completed before delivery."],
          ["5. Cancellation & Refund Policy","Orders once confirmed may not be canceled in certain cases. Refunds are processed based on our cancellation and refund policy."],
          ["9. Contact Us","If you have any questions about these Terms, you can contact us at: support@foodexpress.com"],
        ].map(([h,p])=>(
          <div key={h}><h2 style={{ color:"#333",marginTop:25 }}>{h}</h2><p style={{ lineHeight:1.6,color:"#555" }}>{p}</p></div>
        ))}
      </div>
      <footer style={{ textAlign:"center",padding:15,background:"#3f44b5",color:"white",marginTop:40 }}>
        © 2026 FoodExpress. All Rights Reserved.
      </footer>
    </div>
  );
}
