import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section style={{
      position: "relative", height: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center", overflow: "hidden",
      color: "white", textAlign: "center",
      background: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover"
    }}>
      <div>
        <h1 style={{ fontSize: "3rem", margin: 0 }}>Food Express</h1>
        <p>Delicious Food, Delivered Fast</p>
        <p>Order from your favorite restaurants</p>
        <br />
        <Link to="/home" style={{
          display: "inline-block", padding: "15px 30px",
          background: "#ff4757", color: "white", textDecoration: "none",
          borderRadius: "50px", fontWeight: "bold", transition: "0.3s"
        }}>Order Now</Link>
      </div>
    </section>
  );
}
