import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// ─── DATA ────────────────────────────────────────────────────────────────────

const westernItems = [
  { name: "Cheese Burger",      desc: "Juicy burger with extra cheese",  price: 149, img: "https://bing.com/th?id=OSK.a943b8e9ee89821e4c3a92aec5421bf9" },
  { name: "Veg Pizza",          desc: "Loaded with fresh veggies",        price: 299, img: "https://images.stockcake.com/public/e/c/c/ecc0baa3-d954-4800-8304-90490b13c28a_large/vegetable-loaded-pizza-stockcake.jpg" },
  { name: "White Sauce Pasta",  desc: "Creamy Italian pasta",             price: 199, img: "https://tse2.mm.bing.net/th/id/OIP.OVxj0u9uood86Jj_7VxWXAHaEW" },
  { name: "Club Sandwich",      desc: "Grilled sandwich with veggies",    price: 129, img: "https://tse2.mm.bing.net/th/id/OIP.-XtPTBZtLHxV0HobCX0jlQHaEK" },
  { name: "French Fries",       desc: "Crispy salted fries",              price: 99,  img: "https://i.pinimg.com/1200x/57/22/00/57220047fc59da5722f2daf2bf683b67.jpg" },
  { name: "Hot Dog",            desc: "American style hotdog",            price: 139, img: "https://i.pinimg.com/736x/33/88/ad/3388ad68b9979e33d67018b914335633.jpg" },
  { name: "Nachos",             desc: "Cheesy mexican nachos",            price: 149, img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d" },
  { name: "Garlic Bread",       desc: "Toasted garlic bread",             price: 119, img: "https://i.pinimg.com/736x/c7/ea/52/c7ea525037dbdc48af0003520fc33163.jpg" },
];

const southItems = [
  { name: "Chicken Dum Biriyani", desc: "", price: 289, img: "https://img.freepik.com/premium-photo/traditional-handi-filled-with-spicy-beef-biriyani_1169880-25765.jpg" },
  { name: "Vegetarian Thali",     desc: "", price: 259, img: "https://www.holidify.com/images/cmsuploads/compressed/Vegetarian_Andhra_Meal_20200107182616.jpg" },
  { name: "Pongal",               desc: "", price: 159, img: "https://www.chefspencil.com/wp-content/uploads/Pongal.jpg.webp" },
  { name: "Sambhar Idli",         desc: "", price: 59,  img: "https://cdn.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_960_720.jpg" },
  { name: "Masala Dosa",          desc: "", price: 89,  img: "https://i.pinimg.com/736x/16/e2/e0/16e2e0c3fec165099a89d8eca33018d7.jpg" },
  { name: "Medu Vada",            desc: "", price: 69,  img: "https://i.pinimg.com/736x/05/6b/b8/056bb8d6274a39a2917b065960ca4baa.jpg" },
  { name: "Upma",                 desc: "", price: 79,  img: "https://i.pinimg.com/1200x/21/83/62/2183628fd7304b80291ec22822909ad8.jpg" },
  { name: "Appam",                desc: "", price: 99,  img: "https://i.pinimg.com/1200x/0d/f8/9b/0df89b42ac5d8c9d36085187938c1fb2.jpg" },
];

const chineseItems = [
  { name: "Veg Hakka Noodles",   desc: "", price: 179, img: "https://i.pinimg.com/1200x/c5/8f/d1/c58fd12b65ef692f88fc641a42eabc6c.jpg" },
  { name: "Chicken Fried Rice",  desc: "", price: 199, img: "https://i.pinimg.com/736x/9b/17/3b/9b173b63301afd246089ef56a2ceeb99.jpg" },
  { name: "Chilli Chicken",      desc: "", price: 229, img: "https://i.pinimg.com/736x/39/c3/04/39c3040e577e670bc46ac67e46825d11.jpg" },
  { name: "Veg Manchurian",      desc: "", price: 189, img: "https://i.pinimg.com/736x/c9/c7/ba/c9c7ba331f1d8fcec9d1e0e7e226b5a8.jpg" },
  { name: "Spring Rolls",        desc: "", price: 149, img: "https://i.pinimg.com/1200x/91/e2/ae/91e2ae4a94859714e7e0781d8f843d97.jpg" },
  { name: "Schezwan Noodles",    desc: "", price: 189, img: "https://i.pinimg.com/1200x/e6/2d/ac/e62dac1c981eabb6e250f29d9dcfe2d0.jpg" },
  { name: "Chicken Manchurian",  desc: "", price: 239, img: "https://i.pinimg.com/736x/e8/d6/ef/e8d6ef6628a1edc093ea81bbfc8a11d4.jpg" },
  { name: "Veg Momos",           desc: "", price: 129, img: "https://i.pinimg.com/736x/fe/c3/b3/fec3b34d5edb094554ed761c0d6f9d17.jpg" },
];

const dessertItems = [
  { name: "Chocolate Cake",       desc: "", price: 199, img: "https://i.pinimg.com/736x/19/66/5e/19665ed5b227df9394216a8b42f043b3.jpg" },
  { name: "Brownie Ice Cream",    desc: "", price: 179, img: "https://i.pinimg.com/736x/2b/bd/8d/2bbd8ddef0efd324f26cadb9b0f4c17d.jpg" },
  { name: "Strawberry Cheesecake",desc: "", price: 229, img: "https://i.pinimg.com/1200x/40/77/60/407760ac36fd10683aef5c639f573d6a.jpg" },
  { name: "Ice Cream Sundae",     desc: "", price: 149, img: "https://i.pinimg.com/1200x/22/a7/d0/22a7d0ce7700f7169b5990609f5d458f.jpg" },
  { name: "Gulab Jamun",          desc: "", price: 99,  img: "https://i.pinimg.com/736x/a9/3d/77/a93d77d3e242262f2c919bf66aef5b39.jpg" },
  { name: "Rasgulla",             desc: "", price: 89,  img: "https://i.pinimg.com/736x/31/fb/61/31fb61d23d041061c567d304d80b36b2.jpg" },
  { name: "Chocolate Donut",      desc: "", price: 119, img: "https://i.pinimg.com/736x/55/f1/c1/55f1c1db9a37a27e3e40eef9cd51cfa0.jpg" },
  { name: "Belgian Waffles",      desc: "", price: 189, img: "https://i.pinimg.com/736x/49/aa/6c/49aa6c473b6b97a182f73d09464cd986.jpg" },
];

const restaurants = [
  { name: "The Waffle Co.",   rating: "4.6", cuisine: "Desserts",        price: "₹400 for two",  loc: "Katpadi, Vellore • 3.2 km from VIT", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/8a/e6/70/caption.jpg?w=1200&h=800&s=1" },
  { name: "Abraj Fine Dining",rating: "4.4", cuisine: "Chinese • Mughlai",price:"₹1200 for two", loc: "Gandhi Nagar, Vellore • 5.6 km from VIT", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/0e/95/c2/the-vellore-kitchen-gandhi.jpg?w=600&h=-1&s=1" },
  { name: "Lacto Nile",       rating: "4.4", cuisine: "Pizza • Fast Food", price:"₹300 for two", loc: "Vellore Fort Road • 7.4 km from VIT", img: "https://cdn.venuelook.com/uploads/space_20580/1566033744_595x400.png" },
  { name: "Biryani House",    rating: "4.2", cuisine: "Biryani • Indian",  price:"₹700 for two", loc: "Katpadi, Vellore • 2.8 km from VIT", img: "https://i.pinimg.com/736x/00/96/44/009644bd6c0cbd849af1d9682f76e8fe.jpg" },
  { name: "Hotel Aryaas",     rating: "4.0", cuisine: "South Indian",      price:"₹350 for two", loc: "Katpadi Road • 3.5 km from VIT", img: "https://i.pinimg.com/736x/df/eb/e0/dfebe0ac26db3c6b3111a8f4df405dac.jpg" },
  { name: "Dragon City",      rating: "3.9", cuisine: "Chinese • Asian",   price:"₹900 for two", loc: "Gandhi Nagar • 6 km from VIT", img: "https://i.pinimg.com/736x/d6/b3/28/d6b328663e0a0c5b04b6a6e70d3005bf.jpg" },
  { name: "Spice Garden",     rating: "3.8", cuisine: "Multi Cuisine",     price:"₹800 for two", loc: "Anna Salai, Vellore • 5 km from VIT", img: "https://i.pinimg.com/1200x/c5/c6/5f/c5c65fb0db0b42f2f1ca173b8fd38c56.jpg" },
  { name: "FB Cakes",         rating: "3.6", cuisine: "Desserts",          price:"₹500 for two", loc: "Green Circle, Vellore • 4.1 km from VIT", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/15/b2/f3/darling-residency.jpg?w=1800&h=1000&s=1" },
];

const slideImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
];

const idliRestaurants = [
  { name:"Udupi Grand",       rating:4.3, time:20, item:"Idli Plate",   price:60, img:"https://i.pinimg.com/736x/6e/ce/8d/6ece8d9a9ad234ea9813cd29397ae44f.jpg" },
  { name:"Idli House",        rating:4.1, time:25, item:"Soft Idli",    price:55, img:"https://i.pinimg.com/736x/e9/e1/29/e9e129fa02c75be25072b6a8901f036a.jpg" },
  { name:"Rameshwaram Cafe",  rating:4.5, time:30, item:"Butter Idli",  price:70, img:"https://i.pinimg.com/1200x/e8/3c/fc/e83cfc3e7cb3dfc5ef0a914148361512.jpg" },
  { name:"Anna Tiffins",      rating:4.2, time:20, item:"Sambar Idli",  price:65, img:"https://i.pinimg.com/1200x/8a/00/0e/8a000e4df80568995accaddd1b6c7618.jpg" },
  { name:"Mini Tiffins",      rating:4.0, time:30, item:"Mini Idli",    price:50, img:"https://i.pinimg.com/1200x/8a/dd/79/8add79ac2e55cc73badadc973e4f19e2.jpg" },
  { name:"Madras Cafe",       rating:4.4, time:25, item:"Ghee Idli",    price:75, img:"https://i.pinimg.com/1200x/47/37/1c/47371cbfd34c020e33cb66c1867db5ea.jpg" },
  { name:"Tiffin Center",     rating:4.1, time:35, item:"Idli Combo",   price:80, img:"https://i.pinimg.com/736x/c6/6f/2b/c66f2b79ca9e8df01d374676334f32ea.jpg" },
  { name:"South Spice",       rating:4.3, time:25, item:"Special Idli", price:70, img:"https://i.pinimg.com/736x/37/1c/ca/371ccade9b34b5fcd4046dd14e2c80f3.jpg" },
];

const dosaRestaurants = [
  { name:"Udupi Grand",      rating:4.3, time:20, item:"Plain Dosa",       price:70,  img:"https://i.pinimg.com/1200x/7f/6d/3e/7f6d3ebdca842e61864b698a277c5418.jpg" },
  { name:"Dosa House",       rating:4.1, time:25, item:"Masala Dosa",      price:90,  img:"https://i.pinimg.com/1200x/99/ee/a0/99eea08c91fdadd332686fa9832d9d47.jpg" },
  { name:"Rameshwaram Cafe", rating:4.5, time:30, item:"Butter Dosa",      price:100, img:"https://i.pinimg.com/1200x/d4/d0/55/d4d05510d95f793fd27855bbe5851f20.jpg" },
  { name:"Anna Tiffins",     rating:4.2, time:20, item:"Sambar Dosa",      price:85,  img:"https://i.pinimg.com/736x/33/cf/50/33cf509e7e5bf09acf1c53128a80cfe5.jpg" },
  { name:"Mini Tiffins",     rating:4.0, time:30, item:"Set Dosa",         price:80,  img:"https://i.pinimg.com/736x/33/cf/50/33cf509e7e5bf09acf1c53128a80cfe5.jpg" },
  { name:"Madras Cafe",      rating:4.4, time:25, item:"Ghee Roast Dosa",  price:110, img:"https://i.pinimg.com/736x/0f/14/94/0f1494af913f7c743346b0fb1c1769bc.jpg" },
  { name:"Tiffin Center",    rating:4.1, time:35, item:"Onion Dosa",       price:95,  img:"https://i.pinimg.com/736x/69/e9/6b/69e96b19c26f337f8b47257aa8e6ad25.jpg" },
  { name:"South Spice",      rating:4.3, time:25, item:"Cheese Dosa",      price:120, img:"https://i.pinimg.com/1200x/7f/6d/3e/7f6d3ebdca842e61864b698a277c5418.jpg" },
];

const pooriRestaurants = [
  { name:"Udupi Grand",      rating:4.4, time:20, item:"Poori Masala",   price:80, img:"https://i.pinimg.com/736x/e4/ae/f0/e4aef028935060cc6cc0feca2b0cad8d.jpg" },
  { name:"Anna Tiffins",     rating:4.2, time:25, item:"Classic Poori",  price:75, img:"https://i.pinimg.com/736x/14/ad/a7/14ada7e62f2203cc9f61c099919a663f.jpg" },
  { name:"Rameshwaram Cafe", rating:4.5, time:30, item:"Butter Poori",   price:95, img:"https://i.pinimg.com/736x/95/c5/8a/95c58a20486f96a9ea1ae25f692e9ef5.jpg" },
  { name:"Mini Tiffins",     rating:4.1, time:22, item:"Mini Poori",     price:70, img:"https://i.pinimg.com/1200x/42/15/6c/42156c1b7f82fd2b10711d76a76f2366.jpg" },
  { name:"Madras Cafe",      rating:4.3, time:28, item:"Ghee Poori",     price:90, img:"https://i.pinimg.com/736x/32/1e/a2/321ea27fdd0b7c5ea4afe998f67985f5.jpg" },
  { name:"Tiffin Center",    rating:4.0, time:30, item:"Poori Combo",    price:85, img:"https://i.pinimg.com/1200x/48/c6/c6/48c6c66434f0fc54f81819f87ef5c7ed.jpg" },
  { name:"South Spice",      rating:4.2, time:26, item:"Special Poori",  price:88, img:"https://i.pinimg.com/736x/33/78/b9/3378b99fdb71d83ccd2204fe4d7fdcb8.jpg" },
  { name:"Breakfast Hub",    rating:4.3, time:24, item:"Masala Poori",   price:92, img:"https://i.pinimg.com/736x/1d/79/15/1d79150a609f6746e08d6b77004c9bd3.jpg" },
];

const vadaRestaurants = [
  { name:"Hotel Aryaas",     rating:4.5, time:15, item:"Medu Vada (2pcs)",  price:60, img:"https://i.pinimg.com/1200x/7c/25/06/7c25062db19fcdb416f9fdc2ee743da5.jpg" },
  { name:"Udupi Grand",      rating:4.2, time:20, item:"Sambar Vada",       price:70, img:"https://i.pinimg.com/1200x/47/00/cd/4700cd26ed2a7c52b8f3c316bc92cc0f.jpg" },
  { name:"Anna Tiffins",     rating:4.0, time:25, item:"Rasa Vada",         price:65, img:"https://i.pinimg.com/736x/b7/55/56/b75556e11e6dbe86985ce167a0838d10.jpg" },
  { name:"Rameshwaram Cafe", rating:4.4, time:18, item:"Ghee Podi Vada",    price:85, img:"https://i.pinimg.com/1200x/85/af/71/85af7123977d6cfe51c6bd386c97e83f.jpg" },
  { name:"Idli House",       rating:4.1, time:22, item:"Curd Vada",         price:75, img:"https://i.pinimg.com/1200x/5b/f8/62/5bf86231d4a5df74857306d2032c804b.jpg" },
  { name:"Madras Cafe",      rating:4.3, time:20, item:"Crunchy Vada Set",  price:60, img:"https://i.pinimg.com/736x/6f/09/2b/6f092bed0994b395c03a452edb9a5e3e.jpg" },
  { name:"Tiffin Center",    rating:3.9, time:30, item:"Masala Vada",       price:55, img:"https://i.pinimg.com/1200x/4f/89/ac/4f89ac26af9fb3f5db1abeb0dd5f7e54.jpg" },
  { name:"South Spice",      rating:4.2, time:15, item:"Vada Sambar Dip",   price:70, img:"https://i.pinimg.com/736x/3f/79/9e/3f799e84791e9a1fd664f0b799d21e00.jpg" },
];

const parathaRestaurants = [
  { name:"Paratha House",  rating:4.6, time:20, item:"Aloo Paratha (2pcs)", price:99,  img:"https://i.pinimg.com/1200x/1c/71/ff/1c71ff0ef16f34b5748c381fe041136b.jpg" },
  { name:"Biryani House",  rating:4.3, time:25, item:"Paneer Paratha",      price:120, img:"https://i.pinimg.com/736x/ac/02/ca/ac02ca9ce46e11710d0d6d66bafb84a5.jpg" },
  { name:"Spice Garden",   rating:4.1, time:30, item:"Gobi Paratha",        price:110, img:"https://i.pinimg.com/736x/96/76/8d/96768d83089609691c67fd30eb776002.jpg" },
  { name:"Dragon City",    rating:4.4, time:22, item:"Mixed Paratha",       price:130, img:"https://i.pinimg.com/736x/4e/67/15/4e6715cdcaa78d87130385c9ee103479.jpg" },
  { name:"Hotel Aryaas",   rating:4.0, time:28, item:"Onion Paratha",       price:105, img:"https://i.pinimg.com/736x/c6/7c/a8/c67ca8259e0ac22b9839bcfb909d7f37.jpg" },
  { name:"Breakfast Hub",  rating:4.2, time:24, item:"Methi Paratha",       price:115, img:"https://i.pinimg.com/1200x/d9/77/9f/d9779fb9dcbe23ea71e253daa72358c3.jpg" },
  { name:"Udupi Grand",    rating:4.5, time:20, item:"Lacha Paratha",       price:80,  img:"https://i.pinimg.com/1200x/72/5f/00/725f00eb3226ad5ff965e7ba44902059.jpg" },
  { name:"Tiffin Center",  rating:3.9, time:35, item:"Plain Paratha",       price:60,  img:"https://i.pinimg.com/736x/5c/d5/df/5cd5df6b94ddf9fa2b2682ab11f47f55.jpg" },
];

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

const FALLBACK_IMAGE = `${import.meta.env.BASE_URL}fallback-food.svg`;
const handleImageError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = FALLBACK_IMAGE;
};

function FoodCard({ item, onAdd }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd(item.name, item.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <div className="card">
      <img src={item.img} alt={item.name} onError={handleImageError} />
      <h3>{item.name}</h3>
      {item.desc && <p>{item.desc}</p>}
      <h4>₹{item.price}</h4>
      <button onClick={handleAdd} style={added ? { background: "#1faa59" } : {}}>
        {added ? "✓ Added!" : "Add to Cart"}
      </button>
    </div>
  );
}

function ScrollSection({ title, items, sectionId, onAdd }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (!ref.current) return;
    const card = ref.current.querySelector(".card");
    const cardWidth = card ? card.offsetWidth + 25 : 300;
    ref.current.scrollBy({ left: dir * cardWidth * 4, behavior: "smooth" });
  };
  return (
    <>
      <h2 className="heading">{title}</h2>
      <div className="scroll-container">
        <button className="scroll-btn" onClick={() => scroll(-1)}>❮</button>
        <div className="products" id={sectionId} ref={ref}>
          {items.map((item) => (
            <FoodCard key={item.name} item={item} onAdd={onAdd} />
          ))}
        </div>
        <button className="scroll-btn" onClick={() => scroll(1)}>❯</button>
      </div>
    </>
  );
}

function RestaurantSubSection({ title, data, sectionId, onAdd }) {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (sectionRef.current) {
      setTimeout(() => sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }, []);
  return (
    <section id={sectionId} ref={sectionRef} style={{ paddingBottom: "50px" }}>
      <h2 className="section-title">{title}</h2>
      <div className="restaurant-grid">
        {data.map((r) => (
          <div key={r.name + r.item} className="card" data-rating={r.rating} data-time={r.time}>
            <img src={r.img} alt={r.name} onError={handleImageError} />
            <h3>{r.name}</h3>
            <p>⭐{r.rating} • {r.time}-{r.time + 5} mins</p>
            <p>South Indian</p>
            <h4>{r.item} ₹{r.price}</h4>
            <button onClick={() => onAdd(r.item, r.price)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── MAIN HOME COMPONENT ──────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Slideshow
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSlideIdx((i) => (i + 1) % slideImages.length), 3000);
    return () => clearInterval(timer);
  }, []);

  // Delivery location
  const [location, setLocation] = useState("VIT Main Gate...");
  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) {
      setLocation(saved);
    } else {
      const entered = prompt("Enter your delivery location:");
      if (entered) {
        localStorage.setItem("userLocation", entered);
        setLocation(entered);
      }
    }
  }, []);

  // Search
  const [search, setSearch] = useState("");

  // Food section toggle
  const [activeSection, setActiveSection] = useState(null);

  // Cart
  const addToCart = (name, price) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((i) => i.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
  };

  // Filter items by search
  const filterItems = (items) =>
    search ? items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())) : items;

  const foodCategories = [
    { label: "Idli",   img: "https://i.pinimg.com/1200x/71/5c/c5/715cc593120f0853f175d584c79adcd8.jpg", section: "idli" },
    { label: "Dosa",   img: "https://i.pinimg.com/736x/da/26/07/da2607596434e098807784328419a85d.jpg", section: "dosa" },
    { label: "Poori",  img: "https://i.pinimg.com/1200x/57/42/69/574269d8065f3e0190eb8c3d23cb1141.jpg", section: "poori" },
    { label: "Vada",   img: "https://th.bing.com/th/id/OIP.shuOlFjY-7f_sLtDxAfJRwHaE8?w=306&h=204", section: "vada" },
    { label: "Paratha",img: "https://img.freepik.com/premium-photo/crunchy-aloo-paratha-delicacy-popular-street-food-aloo-paratha-alu-paratha-image_1174497-51132.jpg?w=2000", section: "paratha" },
  ];

  const sectionDataMap = {
    idli:   { title: "Restaurants serving Idli",   data: idliRestaurants },
    dosa:   { title: "Restaurants serving Dosa",   data: dosaRestaurants },
    poori:  { title: "Restaurants serving Poori",  data: pooriRestaurants },
    vada:   { title: "Restaurants serving Vada",   data: vadaRestaurants },
    paratha:{ title: "Restaurants serving Paratha",data: parathaRestaurants },
  };

  return (
    <>
      {/* ── INLINE STYLES (from proje.css) ─────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

        * { margin:0; padding:0; box-sizing:border-box; font-family:'Poppins',sans-serif; }
        body { background:#f8f8f8; overflow-x:hidden; }

        /* Sidebar overlay */
        .sidebar-overlay {
          position:fixed; inset:0; background:rgba(0,0,0,0.4);
          z-index:2999; display:none;
        }
        .sidebar-overlay.open { display:block; }

        /* Sidebar */
        .sidebar {
          position:fixed; top:0; left:-260px; width:260px; height:100%;
          background:linear-gradient(to bottom,#2b1055,#6a11cb);
          box-shadow:3px 0 18px rgba(0,0,0,0.35);
          padding-top:80px; transition:left 0.4s ease; z-index:3000;
        }
        .sidebar.open { left:0; }
        .sidebar a {
          display:block; padding:15px 25px; text-decoration:none;
          color:white; font-size:16px; font-weight:500; transition:0.3s;
        }
        .sidebar a:hover {
          background:rgba(255,255,255,0.15);
          border-left:4px solid #ffcc00; padding-left:21px;
        }
        .close-btn {
          position:absolute; top:20px; right:20px;
          font-size:24px; cursor:pointer; color:white; background:none; border:none;
        }

        /* Navbar */
        .navbar {
          position:sticky; top:0; z-index:2900;
          background:rgb(33,17,139); padding:15px 30px;
          display:flex; align-items:center; gap:15px;
          color:white; box-shadow:0 2px 10px rgba(0,0,0,0.2);
        }
        .menu-btn { font-size:28px; cursor:pointer; color:white; background:none; border:none; }
        .logo-img { width:35px; height:35px; }
        .logo-text { font-size:22px; color:orange; }
        .navlinks { margin-left:auto; list-style:none; display:flex; align-items:center; gap:20px; }
        .navlinks a { color:white; text-decoration:none; font-size:15px; transition:0.3s; }
        .navlinks a:hover { color:orchid; }
        .search-box input {
          padding:8px 15px; border-radius:20px; border:none;
          outline:none; width:200px; font-size:14px;
        }

        /* Strips */
        .welcome-strip {
          background:linear-gradient(to right,#2b1055,#6a11cb);
          color:white; padding:30px 20px; text-align:center;
        }
        .welcome-strip h2 { font-size:24px; font-weight:600; }
        .delivery-display {
          width:100%;
          background:linear-gradient(to right,#2b1055,#6a11cb);
          padding:14px 60px; color:white; font-size:15px; font-weight:500;
        }
        .delivery-display span { font-weight:600; color:#ffcc00; }

        /* Slideshow */
        .slideshow-container { width:100%; height:250px; overflow:hidden; }
        .slideshow-container img { width:100%; height:100%; object-fit:cover; display:block; transition:0.5s; }

        /* Headings */
        .heading { text-align:center; margin:40px 0 20px; font-size:26px; color:#222; }
        .section-title { font-size:28px; font-weight:bold; margin:40px 40px 25px; }

        /* Scroll section */
        .scroll-container { display:flex; align-items:center; position:relative; }
        .products { display:flex; overflow-x:hidden; scroll-behavior:smooth; gap:25px; flex:1; }
        .scroll-btn {
          background:#ff5a1f; color:white; border:none; font-size:22px;
          padding:10px 15px; cursor:pointer; border-radius:50%; margin:10px; flex-shrink:0;
        }

        /* Cards */
        .card {
          background:white; border-radius:15px; padding:20px; text-align:center;
          box-shadow:0 5px 15px rgba(0,0,0,0.08); transition:0.3s;
          position:relative; min-width:220px; flex-shrink:0;
        }
        .card:hover { transform:translateY(-8px); box-shadow:0 8px 25px rgba(0,0,0,0.15); }
        .card img { width:100%; height:160px; object-fit:cover; border-radius:12px; }
        .card h3 { margin:15px 0 5px; font-size:18px; }
        .card p { color:#777; font-size:13px; margin-bottom:10px; }
        .card h4 { color:#1faa59; font-size:18px; margin-bottom:15px; }
        .card button {
          width:100%; padding:10px; background:#111; color:white;
          border:none; border-radius:8px; cursor:pointer; font-weight:500; transition:0.3s;
        }
        .card button:hover { background:orange; }

        /* Restaurant slider */
        .slider {
          display:flex; gap:20px; overflow-x:auto; padding:10px 40px 30px;
          scroll-behavior:smooth;
        }
        .slider::-webkit-scrollbar { height:6px; }
        .slider::-webkit-scrollbar-thumb { background:#ccc; border-radius:10px; }
        .slider .card { min-width:300px; }
        .card-img { position:relative; }
        .card-img img { width:100%; height:190px; object-fit:cover; border-radius:12px 12px 0 0; }
        .card-img h2 {
          position:absolute; bottom:12px; left:15px; color:white;
          font-size:20px; margin:0; text-shadow:0 2px 6px rgba(0,0,0,0.6);
        }
        .rating {
          position:absolute; bottom:15px; right:15px; background:#1faa59;
          color:white; padding:5px 10px; border-radius:10px; font-size:14px; font-weight:bold;
        }
        .card-content { padding:18px; text-align:left; }
        .info { display:flex; justify-content:space-between; font-size:14px; color:gray; margin-bottom:10px; }
        .location-text { font-size:14px; margin-bottom:15px; color:#444; }
        .offer-btn {
          background:#19a463; color:white; font-size:14px; padding:10px 18px;
          border-radius:10px; font-weight:bold; cursor:pointer; transition:0.3s;
          text-decoration:none; display:inline-block;
        }
        .offer-btn:hover { background:#148a53; }

        /* Food grid */
        .food-header h2 { text-align:center; margin:50px 0 30px; font-size:28px; }
        .food-grid {
          display:grid; grid-template-columns:repeat(5,1fr);
          gap:30px; padding:0 40px 50px; justify-items:center;
        }
        .food-item { text-align:center; cursor:pointer; }
        .food-item img {
          width:110px; height:110px; border-radius:50%; object-fit:cover;
          box-shadow:0 5px 15px rgba(0,0,0,0.1); transition:0.3s;
        }
        .food-item img:hover { transform:scale(1.1); }
        .food-item p { margin-top:10px; font-weight:500; }

        /* Restaurant grid */
        .restaurant-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:25px; margin-top:30px; padding:20px 40px;
        }

        /* Footer */
        .copyright-footer {
          background:rgb(33,17,139); padding:30px; text-align:center;
          color:white; font-size:14px;
        }
        .copyright-footer a { color:orange; text-decoration:none; margin-left:10px; }

        /* Responsive */
        @media (max-width:1100px) {
          .restaurant-grid { grid-template-columns:repeat(2,1fr); }
          .food-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:768px) {
          .restaurant-grid { grid-template-columns:1fr; }
          .food-grid { grid-template-columns:repeat(2,1fr); }
          .welcome-strip h2 { font-size:18px; }
          .navlinks li:not(.search-box) { display:none; }
        }
      `}</style>

      {/* ── SIDEBAR ──────────────────────────────────────── */}
      <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>
        <Link to="/certificates"  onClick={() => setSidebarOpen(false)}>📜 Certificates</Link>
        <Link to="/newsroom"      onClick={() => setSidebarOpen(false)}>📰 News Room</Link>
        <Link to="/location"      onClick={() => setSidebarOpen(false)}>📍 Location</Link>
        <Link to="/account"       onClick={() => setSidebarOpen(false)}>👤 Account</Link>
        <Link to="/cart"          onClick={() => setSidebarOpen(false)}>🛒 Cart</Link>
        <Link to="/track"         onClick={() => setSidebarOpen(false)}>🚴 Track Your Order</Link>
      </div>

      {/* ── NAVBAR ───────────────────────────────────────── */}
      <nav className="navbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
        <img src="https://cdn-icons-png.flaticon.com/512/7541/7541708.png" className="logo-img" alt="Logo" />
        <b className="logo-text">FoodExpress</b>
        <ul className="navlinks">
          <li className="search-box">
            <input
              type="text"
              placeholder="Search food or restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </li>
          <li><Link to="/policy" style={{ color: "white", textDecoration: "none" }}>Privacy Policy</Link></li>
          <li><Link to="/care"   style={{ color: "white", textDecoration: "none" }}>Customer Care</Link></li>
          <li><Link to="/login"  style={{ color: "white", textDecoration: "none" }}>Login</Link></li>
        </ul>
      </nav>

      {/* ── WELCOME STRIP ────────────────────────────────── */}
      <div className="welcome-strip">
        <h2>Welcome to FoodExpress - "Express delivery, delicious every time."</h2>
      </div>

      {/* ── SLIDESHOW ────────────────────────────────────── */}
      <div className="slideshow-container">
        <img src={slideImages[slideIdx]} alt="food banner" onError={handleImageError} />
      </div>

      {/* ── DELIVERY LOCATION ────────────────────────────── */}
      <div className="delivery-display">
        Delivering to <span>{location}</span>
      </div>

      {/* ── FOOD SECTIONS ────────────────────────────────── */}
      <ScrollSection title="Most Popular Western Snacks Near you"     items={filterItems(westernItems)}  sectionId="west"    onAdd={addToCart} />
      <ScrollSection title="South Indian EXPRESS Specials Near you"   items={filterItems(southItems)}    sectionId="south"   onAdd={addToCart} />
      <ScrollSection title="Chinese EXPRESS Specials Near You"        items={filterItems(chineseItems)}  sectionId="chinese" onAdd={addToCart} />
      <ScrollSection title="Desserts EXPRESS Specials Near You"       items={filterItems(dessertItems)}  sectionId="desserts"onAdd={addToCart} />

      {/* ── RESTAURANT SLIDER ────────────────────────────── */}
      <div className="section-title">Discover best restaurants near VIT University, Vellore</div>
      <div className="slider">
        {restaurants.map((r) => (
          <div className="card" key={r.name}>
            <div className="card-img">
              <img src={r.img} alt={r.name} onError={handleImageError} />
              <h2>{r.name}</h2>
              <div className="rating">⭐ {r.rating}</div>
            </div>
            <div className="card-content">
              <div className="info">
                <span>{r.cuisine}</span>
                <span>{r.price}</span>
              </div>
              <div className="location-text">{r.loc}</div>
              <Link to="/book" className="offer-btn">Book Now</Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOD CATEGORY GRID ───────────────────────────── */}
      <div className="food-header"><h2>Order our best food options</h2></div>
      <div className="food-grid">
        {foodCategories.map((f) => (
          <div
            key={f.label}
            className="food-item"
            onClick={() => setActiveSection(activeSection === f.section ? null : f.section)}
          >
            <img src={f.img} alt={f.label} onError={handleImageError} />
            <p>{f.label}</p>
          </div>
        ))}
      </div>

      {/* ── DYNAMIC RESTAURANT SUBSECTION ───────────────── */}
      {activeSection && sectionDataMap[activeSection] && (
        <RestaurantSubSection
          key={activeSection}
          title={sectionDataMap[activeSection].title}
          data={sectionDataMap[activeSection].data}
          sectionId={`${activeSection}-section`}
          onAdd={addToCart}
        />
      )}

      {/* ── FOOTER ───────────────────────────────────────── */}
      <div className="copyright-footer">
        <p>© 2026 FoodExpress. All rights reserved.
          <Link to="/terms">Terms of Service</Link>
        </p>
      </div>
    </>
  );
}
