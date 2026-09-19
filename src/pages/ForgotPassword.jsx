// ─── ForgotPassword.jsx ──────────────────────────────────────────────────────
import { Link } from "react-router-dom";

export function ForgotPassword() {
  return (
    <div style={{ margin:0,padding:0,height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"linear-gradient(to right,#ff512f,#dd2476)" }}>
      <div style={{ background:"white",width:360,padding:40,borderRadius:18,textAlign:"center",boxShadow:"0 10px 25px rgba(0,0,0,0.3)" }}>
        <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" width={50} alt="logo" />
        <h2 style={{ margin:"10px 0",fontSize:24,color:"#333" }}>Forgot Password</h2>
        <p style={{ fontSize:14,color:"gray",marginBottom:25 }}>Enter your email and verify OTP to reset password</p>
        {["email","text","password","password"].map((t,i) => (
          <input key={i} type={t} placeholder={["Enter your Email","Enter OTP","New Password","Confirm Password"][i]}
            style={{ width:"90%",padding:12,margin:"10px 0",borderRadius:10,border:"1px solid #ccc",fontSize:14 }} />
        ))}
        <button style={{ width:"95%",padding:12,marginTop:15,border:"none",borderRadius:10,background:"#ff512f",color:"white",fontSize:16,fontWeight:"bold",cursor:"pointer" }}>
          Reset Password
        </button>
        <p style={{ marginTop:20,fontSize:14 }}>Back to <Link to="/login" style={{ color:"#ff512f",fontWeight:"bold" }}>Login</Link></p>
      </div>
    </div>
  );
}
export default ForgotPassword;
