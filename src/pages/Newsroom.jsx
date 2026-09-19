import { Link } from "react-router-dom";

const news = [
  {
    img: "/1.png", tag: "healthy", tagLabel: "Healthy Meals",
    title: "Fresh & Nutritious Food Options",
    desc: "Balanced meals made with farm-fresh ingredients for students and fitness lovers.",
    bullets: ["Boosts immunity", "High-protein recipes", "Clean everyday meals"],
  },
  {
    img: "/2.png", tag: "delivery", tagLabel: "Fast Delivery",
    title: "Hot Meals Delivered in 30 Minutes",
    desc: "Our upgraded delivery network ensures faster, fresher meals.",
    bullets: ["Live tracking", "Reliable partners", "Guaranteed freshness"],
  },
  {
    img: "/3.png", tag: "offers", tagLabel: "Special Offers",
    title: "Festival Combos & Daily Discounts",
    desc: "Enjoy exclusive discounts, family packs, and exciting weekly offers.",
    bullets: ["Weekly deals", "Student combos", "Affordable meals"],
  },
  {
    img: "/4.png", tag: "healthy", tagLabel: "Healthy Meals",
    title: "Organic Food Market Rising",
    desc: "Customers are choosing organic meals for better health and premium taste.",
    bullets: ["Eco-friendly", "Premium quality", "Higher nutrition"],
  },
  {
    img: "https://thumbs.dreamstime.com/b/autonomous-delivery-pods-leaving-urban-hub-groceries-goods-modern-logistics-featuring-fleet-self-driving-departing-351799687.jpg",
    tag: "delivery", tagLabel: "Fast Delivery",
    title: "New Delivery Hubs Across Cities",
    desc: "FoodExpress expands delivery hubs to reduce waiting time.",
    bullets: ["Quicker service", "More coverage", "Better customer support"],
  },
  {
    img: "https://tse2.mm.bing.net/th/id/OIP.w8vjqgumoTwYuGKDhhVDFgHaD4?w=323&h=180&c=7",
    tag: "healthy", tagLabel: "Healthy Meals",
    title: "Vegan Food Trend Increasing",
    desc: "Plant-based meals are growing rapidly among young customers.",
    bullets: ["Dairy-free", "High fiber", "Heart-friendly meals"],
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWhD52T04fx5RlfQ0f77vYXMS7DTneHuS8ag&s",
    tag: "delivery", tagLabel: "Fast Delivery",
    title: "AI Tracking Improves Delivery Speed",
    desc: "Smart delivery routes ensure meals arrive quicker than ever.",
    bullets: ["Accurate ETA", "Less delay", "Optimized routes"],
  },
  {
    img: "https://chicagopizza.in/wp-content/uploads/2025/12/Red-White-Simple-Minimalist-Illustrative-Pizza-Promotion-Banner-scaled.jpg",
    tag: "offers", tagLabel: "Special Offers",
    title: "Midnight Cravings Discount",
    desc: "Late-night orders now come with exciting discount coupons.",
    bullets: ["Night delivery", "Special combos", "Affordable snacks"],
  },
];

const tagColors = { healthy: "#2e7d32", delivery: "#ff6a00", offers: "#d81b60" };

export default function Newsroom() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; font-family:"Poppins",Arial,sans-serif; }
        body { background:#fffaf3; color:#222; }

        .nr-nav {
          background:white; display:flex; justify-content:space-between; align-items:center;
          padding:18px 60px; box-shadow:0 3px 15px rgba(0,0,0,0.08); position:sticky; top:0; z-index:1000;
        }
        .nr-logo img { width:40px; cursor:pointer; }
        .nr-nav-links a { text-decoration:none; margin-left:25px; font-weight:600; color:#222; transition:0.3s; }
        .nr-nav-links a:hover { color:#ff6a00; }

        .nr-hero {
          background:linear-gradient(to right,#111,#2c2c2c);
          padding:90px 20px; text-align:center; color:white;
        }
        .nr-hero h1 { font-size:60px; margin-bottom:15px; letter-spacing:1px; }
        .nr-hero p  { font-size:18px; max-width:720px; margin:auto; opacity:0.85; }

        .nr-container {
          max-width:1200px; margin:70px auto; padding:20px;
          display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:35px;
        }

        .nr-card {
          background:white; border-radius:22px; overflow:hidden;
          box-shadow:0 12px 28px rgba(0,0,0,0.1); transition:0.4s ease;
        }
        .nr-card:hover { transform:translateY(-14px); box-shadow:0 20px 45px rgba(0,0,0,0.18); }
        .nr-card img { width:100%; height:230px; object-fit:cover; }

        .nr-content { padding:28px; }
        .nr-tag {
          display:inline-block; padding:7px 16px; border-radius:25px;
          font-size:13px; font-weight:700; margin-bottom:14px; color:white; letter-spacing:0.5px;
        }
        .nr-content h2 { font-size:23px; margin:12px 0; color:#111; }
        .nr-content p  { font-size:15px; line-height:1.7; color:#555; }
        .nr-benefits { margin-top:18px; padding-left:20px; }
        .nr-benefits li { margin-bottom:9px; font-size:14px; color:#333; }

        .nr-footer {
          margin-top:90px; background:#111; color:white;
          text-align:center; padding:28px; font-size:15px;
        }
        .nr-footer a { color:#ff6a00; margin:0 10px; text-decoration:none; font-weight:600; }
        .nr-footer a:hover { text-decoration:underline; }
      `}</style>

      {/* Navbar */}
      <nav className="nr-nav">
        <div className="nr-logo">
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" alt="FoodExpress Logo" />
        </div>
        <div className="nr-nav-links">
          <Link to="/home">Home</Link>
          <Link to="/care">Support</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="nr-hero">
        <h1>FoodExpress Newsroom</h1>
        <p>Stay updated with the latest food trends, healthy meal launches, premium delivery upgrades, and exciting FoodExpress offers.</p>
      </section>

      {/* News Grid */}
      <div className="nr-container">
        {news.map((n, i) => (
          <div className="nr-card" key={i}>
            <img src={n.img} alt={n.title} />
            <div className="nr-content">
              <span className="nr-tag" style={{ background: tagColors[n.tag] }}>{n.tagLabel}</span>
              <h2>{n.title}</h2>
              <p>{n.desc}</p>
              <ul className="nr-benefits">
                {n.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="nr-footer">
        © 2026 FoodExpress. All Rights Reserved. |
        <Link to="/policy">Privacy Policy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/care">Support</Link>
      </footer>
    </>
  );
}
