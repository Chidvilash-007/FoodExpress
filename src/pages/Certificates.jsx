import { Link } from "react-router-dom";

export default function Certificates() {
  const certs = [
    { img: "/fssai.png",   title: "FSSAI Approved",       desc: "Certified by the Food Safety and Standards Authority of India for hygiene and safety." },
    { img: "/iso.png",     title: "ISO Quality Certified", desc: "Recognized for maintaining international standards in food quality management." },
    { img: "/organic.png", title: "Organic Food Partner",  desc: "Partnered with certified organic suppliers to provide healthy meal options." },
    { img: "/trust.png",   title: "Trusted Food Brand",    desc: "Awarded for excellent customer satisfaction and reliable delivery service." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; font-family:"Poppins",sans-serif; }

        .cert-navbar {
          display:flex; justify-content:space-between; align-items:center;
          padding:18px 60px; background:white;
          box-shadow:0px 6px 20px rgba(0,0,0,0.08); position:sticky; top:0;
        }
        .cert-logo { display:flex; align-items:center; gap:12px; }
        .cert-logo img { width:45px; height:45px; }
        .cert-logo h2 { font-size:22px; font-weight:600; color:#ff5a1f; }
        .cert-nav a { text-decoration:none; margin-left:25px; font-weight:500; color:#333; transition:0.3s; }
        .cert-nav a:hover { color:#ff5a1f; }
        .cert-nav a.active { color:#ff5a1f; border-bottom:2px solid #ff5a1f; padding-bottom:4px; }

        .cert-page-title { text-align:center; padding:60px 20px 30px; }
        .cert-page-title h1 { font-size:42px; font-weight:600; margin-bottom:15px; color:#111; }
        .cert-page-title p { max-width:650px; margin:auto; font-size:16px; color:#555; }

        .certs-container { display:grid; grid-template-columns:repeat(2,1fr); gap:35px; padding:50px 80px; background:#f9fafc; }

        .cert-card { background:white; border-radius:18px; padding:20px; text-align:center; box-shadow:0px 10px 25px rgba(0,0,0,0.08); transition:0.3s; }
        .cert-card:hover { transform:translateY(-8px); }
        .cert-card img { width:100%; height:720px; object-fit:cover; border-radius:14px; margin-bottom:18px; }
        .cert-card h3 { font-size:22px; font-weight:600; margin-bottom:10px; color:#ff5a1f; }
        .cert-card p  { font-size:14px; color:#555; line-height:1.5; }

        .cert-footer { text-align:center; padding:20px; background:white; margin-top:40px; font-size:14px; color:gray; }
      `}</style>

      <header className="cert-navbar">
        <div className="cert-logo">
          <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" alt="FoodExpress Logo" />
          <h2>FoodExpress</h2>
        </div>
        <nav className="cert-nav">
          <Link to="/home">Home</Link>
          <Link to="/newsroom">Newsroom</Link>
          <Link to="/certificates" className="active">Certificates</Link>
          <Link to="/care">Customer Care</Link>
        </nav>
      </header>

      <section className="cert-page-title">
        <h1>Our Certifications</h1>
        <p>FoodExpress is committed to delivering safe, hygienic, and premium quality food. These certificates represent our trust and standards.</p>
      </section>

      <section className="certs-container">
        {certs.map((c) => (
          <div className="cert-card" key={c.title}>
            <img src={c.img} alt={c.title} />
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </section>

      <footer className="cert-footer">
        <p>© 2026 FoodExpress. All Rights Reserved.</p>
      </footer>
    </>
  );
}
