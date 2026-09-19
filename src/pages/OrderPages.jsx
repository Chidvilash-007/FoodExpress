import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── Shared background style ─────────────────────────────────────────────────
const bgStyle = {
  minHeight:"100vh", padding:40, color:"white",
  background:"linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover",
};

// ─── MyOrders ─────────────────────────────────────────────────────────────────
export function MyOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const o = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders([...o].reverse());
  }, []);

  return (
    <div style={bgStyle}>
      <h2 style={{ textAlign:"center",marginBottom:30,color:"#ffcc70" }}>📦 My Orders</h2>
      {orders.length === 0
        ? <p style={{ textAlign:"center" }}>No orders yet 😢</p>
        : orders.map((o) => (
            <div key={o.id} style={{ background:"rgba(255,255,255,0.1)",padding:20,borderRadius:15,marginBottom:15 }}>
              <h4>Order ID: {o.id}</h4>
              <p><b>Items:</b> {o.items}</p>
              <p><b>Amount:</b> {o.amount}</p>
              <p><b>Date:</b> {o.date}</p>
              <p><b>Status:</b> {o.status}</p>
            </div>
          ))
      }
      <Link to="/home" style={{ display:"block",marginTop:20,textAlign:"center",textDecoration:"none",color:"#ffcc70" }}>⬅ Back to Home</Link>
    </div>
  );
}

// ─── SavedAddresses ───────────────────────────────────────────────────────────
export function SavedAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [addr, setAddr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAddresses(JSON.parse(localStorage.getItem("addresses")) || []);
  }, []);

  const saveAddress = () => {
    if (!title || !addr) { alert("Fill all fields"); return; }
    const updated = [...addresses, { title, address: addr }];
    localStorage.setItem("addresses", JSON.stringify(updated));
    setAddresses(updated);
    setPopup(false); setTitle(""); setAddr("");
  };

  const selectAddress = (a) => {
    localStorage.setItem("userLocation", a.address);
    navigate("/home");
  };

  const boxStyle = { width:520,padding:40,borderRadius:25,background:"rgba(255,255,255,0.95)",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",position:"relative" };

  return (
    <div style={{ minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",
      background:"linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover" }}>
      <div style={boxStyle}>
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginBottom:20 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={55} alt="logo" />
          <h2 style={{ fontSize:28,color:"#ff5a1f" }}>FoodExpress</h2>
        </div>
        <h3 style={{ textAlign:"center",marginBottom:25,fontSize:22 }}>Saved Addresses</h3>

        {addresses.map((item, i) => (
          <div key={i} onClick={() => selectAddress(item)} style={{ background:"white",padding:16,borderRadius:16,
            border:"1px solid #eee",marginBottom:15,cursor:"pointer",transition:"0.3s" }}>
            <h4>{item.title}</h4>
            <p style={{ fontSize:14,color:"gray" }}>{item.address}</p>
          </div>
        ))}

        <button onClick={() => setPopup(true)} style={{ width:"100%",padding:14,border:"none",borderRadius:15,
          background:"linear-gradient(45deg,#ff5a1f,#ff9966)",color:"white",fontWeight:"bold",cursor:"pointer",marginTop:10 }}>
          + Add New Address
        </button>
        <div style={{ textAlign:"center",marginTop:18 }}>
          <Link to="/account" style={{ textDecoration:"none",color:"gray" }}>⬅ Back to My Account</Link>
        </div>
      </div>

      {popup && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",justifyContent:"center",alignItems:"center" }}>
          <div style={{ background:"white",padding:30,borderRadius:20,width:400 }}>
            <h3>Add Address</h3>
            <input type="text" placeholder="Home / Work / Hostel" value={title} onChange={e=>setTitle(e.target.value)}
              style={{ width:"100%",padding:10,marginBottom:15,borderRadius:10,border:"1px solid #ccc",boxSizing:"border-box" }} />
            <input type="text" placeholder="Enter full address" value={addr} onChange={e=>setAddr(e.target.value)}
              style={{ width:"100%",padding:10,marginBottom:15,borderRadius:10,border:"1px solid #ccc",boxSizing:"border-box" }} />
            <button onClick={saveAddress} style={{ width:"100%",padding:12,background:"linear-gradient(45deg,#ff5a1f,#ff9966)",
              color:"white",border:"none",borderRadius:12,cursor:"pointer",fontWeight:"bold" }}>Save Address</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Payment ─────────────────────────────────────────────────────────────────
export function Payment() {
  const [method, setMethod] = useState("");
  const [cardNum, setCardNum] = useState(""); const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState(""); const [cardCVV, setCardCVV] = useState("");
  const [upiId, setUpiId] = useState("");
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const processPayment = () => {
    if (!method) { alert("Please select a payment method!"); return; }
    if (method === "card") {
      if (cardNum.length !== 16 || !cardName || !cardExp || cardCVV.length !== 3) { alert("Enter valid card details!"); return; }
    }
    if (method === "upi" && !upiId.includes("@")) { alert("Enter valid UPI ID!"); return; }
    const order = { id:"ORD"+Math.floor(Math.random()*100000), paymentMethod:method.toUpperCase(),
      items:"Burger + Fries", amount:"₹249", date:new Date().toLocaleString(), status:"Preparing" };
    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    existing.push(order);
    localStorage.setItem("orders", JSON.stringify(existing));
    setPopup(true);
  };

  const methodStyle = (m) => ({
    padding:15,borderRadius:15,background: method===m ? "linear-gradient(45deg,#ff5a1f,#ff9966)" : "rgba(255,255,255,0.12)",
    marginBottom:12,cursor:"pointer",transition:"0.3s",border: method===m ? "2px solid #ff5a1f" : "2px solid transparent"
  });

  return (
    <div style={{ minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",
      background:"linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover" }}>
      <div style={{ width:520,padding:40,borderRadius:25,background:"rgba(255,255,255,0.08)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.2)",color:"white" }}>
        <h2 style={{ textAlign:"center",marginBottom:25,color:"#ffcc70" }}>Secure Payment</h2>
        <div style={methodStyle("card")} onClick={()=>setMethod("card")}>💳 Credit / Debit Card</div>
        <div style={methodStyle("upi")} onClick={()=>setMethod("upi")}>📲 UPI Payment</div>
        <div style={methodStyle("cod")} onClick={()=>setMethod("cod")}>💵 Cash on Delivery</div>

        {method==="card" && (
          <div style={{ marginTop:20 }}>
            {[["Card Number (16 digits)",cardNum,setCardNum,"text"],["Card Holder Name",cardName,setCardName,"text"],
              ["Expiry Date (MM/YY)",cardExp,setCardExp,"text"],["CVV (3 digits)",cardCVV,setCardCVV,"text"]].map(([ph,val,fn,t])=>(
              <input key={ph} type={t} placeholder={ph} value={val} onChange={e=>fn(e.target.value)}
                style={{ width:"100%",padding:12,marginTop:10,borderRadius:10,border:"none",boxSizing:"border-box",fontSize:14 }} />
            ))}
          </div>
        )}
        {method==="upi" && (
          <input type="text" placeholder="Enter UPI ID (example@upi)" value={upiId} onChange={e=>setUpiId(e.target.value)}
            style={{ width:"100%",padding:12,marginTop:10,borderRadius:10,border:"none",boxSizing:"border-box",fontSize:14 }} />
        )}

        <button onClick={processPayment} style={{ width:"100%",padding:14,marginTop:20,border:"none",borderRadius:15,
          fontWeight:600,fontSize:16,color:"white",background:"linear-gradient(45deg,#ff5a1f,#ffcc70)",cursor:"pointer" }}>
          Place Order
        </button>
      </div>

      {popup && (
        <>
          <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.6)" }} />
          <div style={{ position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
            background:"white",padding:40,borderRadius:20,textAlign:"center",color:"#333",zIndex:100 }}>
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Your food is being prepared 🚀</p>
            <button onClick={()=>navigate("/myorders")}
              style={{ padding:"10px 20px",background:"#ff5a1f",color:"white",border:"none",borderRadius:8,cursor:"pointer",marginTop:15 }}>
              View My Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export function Cart() {
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setCart(JSON.parse(localStorage.getItem("cart")) || []); }, []);

  const save = (c) => { localStorage.setItem("cart", JSON.stringify(c)); setCart(c); };
  const increase = (i) => { const c=[...cart]; c[i].quantity++; save(c); };
  const decrease = (i) => { const c=[...cart]; if(c[i].quantity>1) c[i].quantity--; else c.splice(i,1); save(c); };
  const remove = (i) => { const c=[...cart]; c.splice(i,1); save(c); };
  const clearCart = () => { localStorage.removeItem("cart"); setCart([]); };
  const checkout = () => {
    if (!cart.length) { alert("Your cart is empty!"); return; }
    localStorage.setItem("pendingOrder", JSON.stringify(cart));
    navigate("/payment");
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div style={{ minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",padding:20,
      background:"linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover" }}>
      <div style={{ width:750,maxWidth:"95%",padding:45,borderRadius:25,background:"rgba(255,255,255,0.12)",
        backdropFilter:"blur(18px)",border:"1px solid rgba(255,255,255,0.2)",color:"white" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:30 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={50} alt="logo" />
          <h2 style={{ fontSize:30,color:"#ffcc70" }}>FoodExpress Cart</h2>
        </div>

        {cart.length === 0
          ? <p style={{ textAlign:"center",fontSize:18,opacity:0.8 }}>Your Cart is Empty</p>
          : <>
              {cart.map((item, i) => (
                <div key={i} style={{ padding:18,marginBottom:15,borderRadius:15,background:"rgba(255,255,255,0.18)",
                  border:"1px solid rgba(255,255,255,0.25)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div>
                    <h4 style={{ marginBottom:5 }}>{item.name}</h4>
                    <div style={{ fontSize:14,opacity:0.9 }}>₹{item.price}</div>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <button onClick={()=>decrease(i)} style={{ width:28,height:28,borderRadius:"50%",border:"none",cursor:"pointer",background:"linear-gradient(45deg,#ff5a1f,#ff9966)",color:"white",fontWeight:"bold" }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={()=>increase(i)} style={{ width:28,height:28,borderRadius:"50%",border:"none",cursor:"pointer",background:"linear-gradient(45deg,#ff5a1f,#ff9966)",color:"white",fontWeight:"bold" }}>+</button>
                  </div>
                  <button onClick={()=>remove(i)} style={{ background:"#ff3b3b",border:"none",padding:"6px 10px",borderRadius:8,cursor:"pointer",color:"white",fontSize:12 }}>Remove</button>
                </div>
              ))}
              <div style={{ fontSize:20,fontWeight:"bold",margin:"15px 0",color:"#ffcc70",textAlign:"right" }}>Total: ₹{total}</div>
            </>
        }

        <div style={{ textAlign:"center" }}>
          {[["Buy Now",checkout],["Clear Cart",clearCart]].map(([label,fn])=>(
            <button key={label} onClick={fn} style={{ margin:8,padding:"12px 22px",borderRadius:12,border:"none",cursor:"pointer",
              fontWeight:600,color:"white",background:"linear-gradient(45deg,#ff5a1f,#ff9966)",transition:"0.3s" }}>{label}</button>
          ))}
          <Link to="/home"><button style={{ margin:8,padding:"12px 22px",borderRadius:12,border:"none",cursor:"pointer",fontWeight:600,color:"white",background:"rgba(255,255,255,0.25)" }}>Continue Shopping</button></Link>
        </div>
      </div>
    </div>
  );
}

// ─── TrackOrder ───────────────────────────────────────────────────────────────
export function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [steps, setSteps] = useState([false,false,false,false]);
  const [statusMsg, setStatusMsg] = useState("Waiting for tracking...");
  const [showRider, setShowRider] = useState(false);

  const messages = ["Order Placed Successfully ✅","Food is being prepared 👨‍🍳","Rider is on the way 🚴‍♂️","Order Delivered 🎉 Enjoy!"];

  const trackOrder = () => {
    if (!orderId || !orderId.startsWith("FX")) { alert("Enter valid Order ID (FX1234)"); return; }
    setSteps([false,false,false,false]); setShowRider(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < 4) {
        setSteps(prev => { const n=[...prev]; n[i]=true; return n; });
        setStatusMsg(messages[i]); i++;
      } else { clearInterval(interval); setShowRider(true); }
    }, 1500);
  };

  return (
    <div style={{ minHeight:"100vh",display:"flex",flexDirection:"column",
      background:"linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover" }}>
      <div style={{ background:"transparent",color:"white",padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={40} alt="logo" />
          <h2>FoodExpress</h2>
        </div>
        <Link to="/home" style={{ background:"#ff5a1f",color:"white",padding:"8px 15px",borderRadius:8,textDecoration:"none",fontWeight:500 }}>⬅ Back</Link>
      </div>

      <div style={{ width:700,margin:"40px auto",background:"rgba(255,255,255,0.95)",padding:35,borderRadius:25,boxShadow:"0 15px 40px rgba(0,0,0,0.4)" }}>
        <h1 style={{ textAlign:"center",marginBottom:25,fontWeight:600 }}>Track Your Order 🚀</h1>
        <div style={{ textAlign:"center",marginBottom:25 }}>
          <input type="text" value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="Enter Order ID (FX1234)"
            style={{ width:"55%",padding:14,borderRadius:12,border:"1px solid #ddd",marginRight:10 }} />
          <button onClick={trackOrder} style={{ padding:"14px 18px",border:"none",background:"#ff5a1f",color:"white",fontWeight:600,borderRadius:12,cursor:"pointer" }}>Track</button>
        </div>

        {[["Order Details","Order ID: FX1234","Order Date: 04 March 2026","Payment: UPI","Total: ₹499"],
          ["Restaurant","Name: Spice Garden","Location: Katpadi, Vellore"],
          ["Delivery Address","VIT University Hostel, Katpadi"]].map(([title,...lines]) => (
          <div key={title} style={{ marginTop:20,padding:15,borderRadius:12,background:"#fff4ef" }}>
            <h3 style={{ marginBottom:8,color:"#ff5a1f" }}>{title}</h3>
            {lines.map(l=><p key={l}>{l}</p>)}
          </div>
        ))}

        <div style={{ marginTop:20,padding:12,borderRadius:10,background:"#ffe5d9",fontWeight:600,textAlign:"center" }}>{statusMsg}</div>

        <div style={{ marginTop:30 }}>
          {["Order Placed ✅","Preparing 👨‍🍳","Out for Delivery 🚴‍♂️","Delivered 🎉"].map((s,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",marginBottom:18,opacity:steps[i]?1:0.5,transition:"0.4s" }}>
              <div style={{ width:25,height:25,borderRadius:"50%",background:steps[i]?"#ff5a1f":"#ddd",marginRight:15,transition:"0.4s" }} />
              <p>{s}</p>
            </div>
          ))}
        </div>

        {showRider && (
          <div style={{ marginTop:30,padding:20,borderRadius:15,background:"#fff4ef" }}>
            <h3>Delivery Partner</h3>
            <p><b>Name:</b> Rahul Sharma</p>
            <p><b>Phone:</b> +91 98765 43210</p>
            <p><b>ETA:</b> 25 Minutes</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
