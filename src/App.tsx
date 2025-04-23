
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Clock, User, MailCheck, CheckCircle2 } from "lucide-react";

const PRIMARY_COLOR = "from-cyan-500 to-blue-500";
const ACCENT_COLOR = "bg-white/80";
const FONT_FAMILY = "font-sans";

function Home() {
  const navigate = useNavigate();
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${PRIMARY_COLOR} ${FONT_FAMILY}`}>
      <div className="bg-white/80 rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center animate-fade-in">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow">Book Your Appointment</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Simple, fast, and beautiful online booking. Reserve your spot in seconds.
        </p>
        <button
          className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          onClick={() => navigate("/book")}
        >
          Book Now
        </button>
      </div>
      <div className="mt-10 text-white/80 text-sm">
        Powered by <span className="font-bold">Booking Website</span>
      </div>
    </div>
  );
}

function BookingForm({ onSubmit, loading }: { onSubmit: (data: any) => void; loading: boolean }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState<{[k: string]: boolean}>({});
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!date || !time || !name || !email) return "All fields are required.";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return "Please enter a valid email.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ date: true, time: true, name: true, email: true });
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onSubmit({ date, time, name, email });
  };

  return (
    <form
      className="flex flex-col gap-6 w-full animate-fade-in"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div>
        <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-500" /> Date
        </label>
        <input
          type="date"
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-cyan-400 transition ${touched.date && !date ? "border-red-400" : "border-gray-300"}`}
          value={date}
          onChange={e => setDate(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, date: true }))}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-500" /> Time
        </label>
        <input
          type="time"
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-cyan-400 transition ${touched.time && !time ? "border-red-400" : "border-gray-300"}`}
          value={time}
          onChange={e => setTime(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, time: true }))}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-500" /> Name
        </label>
        <input
          type="text"
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-cyan-400 transition ${touched.name && !name ? "border-red-400" : "border-gray-300"}`}
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, name: true }))}
          placeholder="Your Name"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
          <MailCheck className="w-5 h-5 text-cyan-500" /> Email
        </label>
        <input
          type="email"
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-cyan-400 transition ${touched.email && (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) ? "border-red-400" : "border-gray-300"}`}
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, email: true }))}
          placeholder="you@email.com"
          required
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm text-center -mt-3">{error}</div>
      )}
      <button
        type="submit"
        className={`mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 disabled:opacity-60`}
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          "Confirm Booking"
        )}
      </button>
    </form>
  );
}

function Book() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("booking", JSON.stringify(data));
      setLoading(false);
      navigate("/confirmation");
    }, 1200); // Simulate network delay
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${PRIMARY_COLOR} ${FONT_FAMILY}`}>
      <div className={`${ACCENT_COLOR} rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center animate-fade-in`}>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h2>
        <p className="text-gray-600 mb-6 text-center">Choose your date, time, and enter your details below.</p>
        <BookingForm onSubmit={handleSubmit} loading={loading} />
        <button
          className="mt-6 text-cyan-600 hover:underline text-sm"
          onClick={() => navigate("/")}
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
}

function Confirmation() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("booking");
    if (data) {
      setBooking(JSON.parse(data));
    }
  }, []);

  if (!booking) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${PRIMARY_COLOR} ${FONT_FAMILY}`}>
        <div className={`${ACCENT_COLOR} rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center animate-fade-in`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Booking Found</h2>
          <p className="text-gray-600 mb-6 text-center">You have not made a booking yet.</p>
          <button
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            onClick={() => navigate("/book")}
          >
            Book Now
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${PRIMARY_COLOR} ${FONT_FAMILY}`}>
      <div className={`${ACCENT_COLOR} rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center animate-fade-in`}>
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-pop" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6 text-center">Your appointment has been booked successfully.</p>
        <div className="w-full bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl p-5 mb-6 shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5 text-cyan-500" /> <span className="font-medium">Date:</span> {booking.date}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-cyan-500" /> <span className="font-medium">Time:</span> {booking.time}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-5 h-5 text-cyan-500" /> <span className="font-medium">Name:</span> {booking.name}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MailCheck className="w-5 h-5 text-cyan-500" /> <span className="font-medium">Email:</span> {booking.email}
          </div>
        </div>
        <button
          className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

// Animations
const style = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(24px);}
  to { opacity: 1; transform: none;}
}
@keyframes pop {
  0% { transform: scale(0.7);}
  80% { transform: scale(1.1);}
  100% { transform: scale(1);}
}
.animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;}
.animate-pop { animation: pop 0.5s cubic-bezier(.4,0,.2,1) both;}
`;

function App() {
  return (
    <Router>
      <style>{style}</style>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;