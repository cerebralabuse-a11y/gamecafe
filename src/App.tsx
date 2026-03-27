/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  motion, 
  useScroll, 
  useTransform,
  useInView 
} from "motion/react";
import { 
  Gamepad2, 
  ArrowUpRight, 
  Trophy, 
  Download, 
  Users, 
  Home, 
  Gamepad, 
  Info,
  ChevronRight,
  Star,
  Calendar,
  Clock,
  TrendingUp
} from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const games = [
  { id: 1, title: "Assassin's Creed Rogue", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop", color: "bg-gaming-mint" },
  { id: 2, title: "Battlefield 2042", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop", color: "bg-gaming-lavender" },
  { id: 3, title: "Cyberpunk 2077", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop", color: "bg-gaming-mint" },
];

const leaderboard = [
  { rank: "#1.", name: "Killer Master", avatar: "https://i.pravatar.cc/150?u=killer", hours: "1,240h" },
  { rank: "#2.", name: "Shakh Danial", avatar: "https://i.pravatar.cc/150?u=shakh", hours: "980h" },
  { rank: "#3.", name: "Tanu Mark", avatar: "https://i.pravatar.cc/150?u=tanu", hours: "850h" },
];

const peakHoursData = [
  { time: '10:00', players: 12 },
  { time: '12:00', players: 25 },
  { time: '14:00', players: 45 },
  { time: '16:00', players: 80 },
  { time: '18:00', players: 120 },
  { time: '20:00', players: 150 },
  { time: '22:00', players: 110 },
  { time: '00:00', players: 40 },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6 AM to 11 PM

export default function App() {
  const bookingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const chartContainerRef = useRef(null);
  const isChartInView = useInView(chartContainerRef, { once: true, amount: 0.3 });

  const heatmapData = useMemo(() => {
    return days.map(day => ({
      day,
      slots: hours.map(hour => ({
        hour,
        booked: Math.random() > 0.6,
        intensity: Math.floor(Math.random() * 4) // 0 to 3 for color intensity
      }))
    }));
  }, []);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gaming-black p-4 md:p-8 font-sans">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between bg-white/5 backdrop-blur-2xl rounded-[2rem] px-8 py-4 mb-8 sticky top-4 z-50 border border-white/10 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] overflow-hidden group"
      >
        {/* Liquid Sheen Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        
        <div className="flex items-center gap-2 relative z-10">
          <div className="bg-white text-black w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl italic shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            G
          </div>
          <span className="font-bold text-xl tracking-tighter text-white drop-shadow-sm">GAMESCAPE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60 relative z-10">
          <a href="#" className="hover:text-white transition-all hover:scale-105">Home</a>
          <a href="#" className="hover:text-white transition-all hover:scale-105">Collection</a>
          <a href="#" className="hover:text-white transition-all hover:scale-105">Downloads</a>
          <a href="#" className="hover:text-white transition-all hover:scale-105">About Us</a>
        </div>

        <button 
          onClick={scrollToBooking}
          className="relative z-10 bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-white/90 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          Book a Slot
        </button>
      </motion.nav>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-7 bg-gaming-card-light bento-card p-10 flex flex-col justify-between min-h-[450px] relative overflow-hidden"
        >
          <div className="relative z-10">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tighter mb-6"
            >
              Join the Gaming <br /> Revolution Now
            </motion.h1>
            <p className="text-black/60 max-w-md text-lg leading-relaxed">
              Immerse yourself in a world of endless gaming possibilities on our platform, where fun and competition collide to redefine your gaming experience.
            </p>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 group hover:pr-10 transition-all">
              Explore Now
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Decorative Element */}
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
            <Star className="w-full h-full text-black animate-spin-slow" />
          </div>
        </motion.div>

        {/* Featured Card - Gamescape 3D Style */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 perspective-1000"
        >
          <motion.div
            whileHover={{ rotateX: 10, rotateY: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bento-card bg-zinc-900 relative group cursor-pointer h-full min-h-[450px] overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Main Image */}
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
              alt="Gamescape" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Neon Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            
            <div className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-20">
              <ArrowUpRight className="text-white" />
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between z-20">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">System Online</span>
                </div>
                <h2 className="text-4xl font-bold mb-2 tracking-tighter">Gamescape</h2>
                <p className="text-white/60 text-sm max-w-[220px]">
                  Step into our custom-built isometric gaming world.
                </p>
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                Enter Hub
              </button>
            </div>

            {/* Subtle Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10" />
          </motion.div>
        </motion.div>

        {/* Games We Have */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 bg-gaming-mint bento-card p-8 border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-black">Games We Have</h3>
            <button className="text-black/60 font-medium hover:text-black flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game, idx) => (
              <motion.div 
                key={game.id}
                whileHover={{ y: -5 }}
                className={`${game.color === 'bg-gaming-lavender' ? 'bg-indigo-100/60' : 'bg-white/40'} rounded-3xl p-4 flex flex-col gap-4 border border-black/5`}
              >
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex items-center justify-between px-2">
                  <span className="text-black font-bold truncate text-sm">{game.title}</span>
                  <button className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-black hover:text-white transition-colors">
                    Play
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 bg-gaming-lavender bento-card p-8 flex flex-col justify-between border border-white/10 shadow-[0_0_30px_rgba(224,231,255,0.2)]"
        >
          <div className="relative">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-black text-white p-2.5 rounded-xl shadow-lg">
                <Trophy size={20} />
              </div>
              <h3 className="text-2xl font-bold text-black tracking-tight">Leaderboard</h3>
            </div>

            <div className="space-y-4">
              {leaderboard.map((user, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 bg-white/40 p-3.5 rounded-2xl border border-white/20 shadow-sm hover:bg-white/60 transition-colors cursor-pointer"
                >
                  <span className="text-black/40 font-bold w-8 text-sm">{user.rank}</span>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                  <div className="flex flex-col">
                    <span className="text-black font-bold leading-none text-sm">{user.name}</span>
                    <span className="text-black/40 text-[10px] font-bold mt-1.5 uppercase tracking-wider">{user.hours} Played</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center relative">
             <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 bg-black/5 rounded-full flex items-center justify-center"
             >
                <Users size={48} className="text-black/20" />
             </motion.div>
             {/* Astronaut placeholder circle */}
             <div className="absolute -right-4 bottom-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl" />
          </div>
        </motion.div>

      </div>

      {/* Booking Dashboard Section */}
      <div ref={bookingRef} className="mt-24 max-w-7xl mx-auto perspective-1000">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ rotateX: 2, rotateY: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-zinc-900/40 backdrop-blur-3xl bento-card p-8 md:p-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          {/* Liquid Background Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gaming-mint/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gaming-lavender/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Booking Dashboard</h2>
              <p className="text-white/40 max-w-md">Real-time availability heatmap and peak hour analytics for our pro stations.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                <Calendar size={18} className="text-gaming-mint" />
                <span className="text-sm font-medium">March 27, 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                <Clock size={18} className="text-gaming-lavender" />
                <span className="text-sm font-medium">14:17 UTC</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Heatmap Section */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp size={20} className="text-gaming-mint" />
                  Availability Heatmap
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-zinc-800" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-900/40" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-700/60" />
                    <div className="w-3 h-3 rounded-sm bg-gaming-mint shadow-[0_0_10px_rgba(209,250,229,0.5)]" />
                  </div>
                  <span>More</span>
                </div>
              </div>

              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="min-w-[600px]">
                  <div className="flex mb-3 ml-10">
                    {hours.map(h => (
                      <div key={h} className="flex-1 text-[10px] font-bold text-white/20 text-center">
                        {h}:00
                      </div>
                    ))}
                  </div>
                  {heatmapData.map((row, i) => (
                    <div key={i} className="flex items-center mb-2">
                      <div className="w-10 text-[10px] font-bold text-white/40 uppercase tracking-tighter">{row.day}</div>
                      <div className="flex-1 flex gap-1.5">
                        {row.slots.map((slot, j) => (
                          <motion.div
                            key={j}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              delay: (i * 0.02) + (j * 0.01) 
                            }}
                            whileHover={{ 
                              scale: 1.4, 
                              zIndex: 10,
                              boxShadow: "0 0 15px currentColor"
                            }}
                            className={`flex-1 aspect-square rounded-md cursor-pointer transition-all duration-300 ${
                              slot.intensity === 0 ? 'bg-zinc-800 text-zinc-800' :
                              slot.intensity === 1 ? 'bg-emerald-900/40 text-emerald-900' :
                              slot.intensity === 2 ? 'bg-emerald-700/60 text-emerald-700' :
                              'bg-gaming-mint text-gaming-mint'
                            }`}
                            title={`${row.day} ${slot.hour}:00 - ${slot.booked ? 'Booked' : 'Available'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Peak Hours Chart Section */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 shadow-xl flex flex-col">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Users size={20} className="text-gaming-lavender" />
                Peak Hour Traffic
              </h3>
              
              <div ref={chartContainerRef} className="flex-1 min-h-[250px] w-full">
                {isChartInView && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={peakHoursData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis 
                        dataKey="time" 
                        stroke="#ffffff20" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#ffffff20" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <Tooltip 
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ 
                          backgroundColor: 'rgba(24, 24, 27, 0.8)', 
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          fontSize: '12px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                        itemStyle={{ color: '#e0e7ff' }}
                      />
                      <Bar 
                        dataKey="players" 
                        radius={[8, 8, 0, 0]}
                        animationDuration={2000}
                        animationBegin={200}
                      >
                        {peakHoursData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.players > 100 ? '#e0e7ff' : '#e0e7ff30'} 
                            className="transition-all duration-500 hover:fill-white"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="mt-8 p-5 bg-gaming-lavender/5 rounded-3xl border border-gaming-lavender/10 backdrop-blur-sm">
                <p className="text-[10px] font-bold text-gaming-lavender uppercase tracking-[0.2em] mb-2">Pro Analytics</p>
                <p className="text-sm text-white/50 leading-relaxed">
                  Peak hours are between 6 PM and 10 PM. We recommend booking at least 24 hours in advance for weekends.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scrollable Section for extra animations */}
      <div className="mt-24 max-w-7xl mx-auto space-y-32 pb-32">
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: <Gamepad />, title: "Pro Gear", desc: "Latest RTX 4090 builds for the ultimate frame rates." },
            { icon: <Users />, title: "Community", desc: "Join tournaments and meet local pro gamers." },
            { icon: <Download />, title: "Fast Fiber", desc: "10Gbps dedicated lines for zero lag gaming." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem] text-center"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-white/40">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.div 
          style={{ opacity, scale }}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Level Up?</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
              Book your station now and experience gaming like never before. High-end PCs, ergonomic chairs, and the best snacks in town.
            </p>
            <button className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all">
              Book a Station
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-400 rounded-full blur-[120px]" />
          </div>
        </motion.div>
      </div>

      {/* Customer Marquee Section */}
      <div className="mt-32 overflow-hidden py-12 border-y border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <h3 className="text-3xl font-bold tracking-tighter flex items-center gap-3">
            <Users className="text-gaming-mint" />
            Our Happy Community
          </h3>
          <p className="text-white/40 mt-2">Join thousands of gamers who call Gamescape their second home.</p>
        </div>
        
        <div className="flex relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { seed: "gamer1", name: "Alex R." },
                  { seed: "gamer2", name: "Sarah J." },
                  { seed: "gamer3", name: "Mike D." },
                  { seed: "gamer4", name: "Elena K." },
                  { seed: "gamer5", name: "Chris P." },
                  { seed: "gamer6", name: "Jordan M." },
                  { seed: "gamer7", name: "Taylor S." },
                  { seed: "gamer8", name: "Morgan L." },
                ].map((customer, idx) => (
                  <div 
                    key={idx} 
                    className="w-[300px] h-[400px] rounded-[2rem] overflow-hidden relative group shrink-0"
                  >
                    <img 
                      src={`https://picsum.photos/seed/${customer.seed}/400/600`} 
                      alt="Happy Customer" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-bold text-white text-lg">{customer.name}</p>
                      <p className="text-gaming-mint text-xs font-bold uppercase tracking-widest">Pro Member</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto border-t border-white/5 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center gap-8 text-white/40 text-sm">
        <div className="flex items-center gap-2">
          <Gamepad2 size={20} />
          <span className="font-bold text-white uppercase tracking-tighter">Gamescape</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p>© 2026 Gamescape Gaming Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
