import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Search,
  Repeat,
  Shuffle,
} from "lucide-react";

export default function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState("eminem");
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // Visual EQ: 5 bands
  const [eq, setEq] = useState({
    bass: 0,
    lowMid: 0,
    mid: 0,
    highMid: 0,
    treble: 0,
  });

  const audioRef = useRef(null);
  const controls = useAnimation();
  const eqControls = useAnimation();

  // Fetch songs
  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch(
          `https://itunes.apple.com/search?term=${query}&media=music&limit=10`
        );
        const data = await res.json();
        setSongs(data.results);
        if (data.results.length > 0) setCurrentSong(0);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSongs();
  }, []);

  // Album rotation
  useEffect(() => {
    if (!isPlaying) return;
    controls.start({
      rotate: 360,
      transition: { repeat: Infinity, duration: 12, ease: "linear" },
    });
    return () => controls.stop();
  }, [isPlaying, controls]);

  // Simulate EQ effect on album cover
  useEffect(() => {
    const total = Object.values(eq).reduce((a, b) => a + b, 0);
    const scale = 1 + total / 50; // scale based on slider values
    eqControls.start({ scale, transition: { duration: 0.2 } });
  }, [eq, eqControls]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!songs.length) return;
    if (shuffle) setCurrentSong(Math.floor(Math.random() * songs.length));
    else setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    if (!songs.length) return;
    setCurrentSong((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handleSeek = (e) => {
    if (!audioRef.current?.duration) return;
    const value = (e.nativeEvent.offsetX / e.target.clientWidth) * audioRef.current.duration;
    audioRef.current.currentTime = value;
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Create waveform bars dynamically
  const waveformBars = Array.from({ length: 30 }).map((_, i) => {
    const height = Math.random() * 20 + Object.values(eq).reduce((a, b) => a + b, 0) / 2;
    return (
      <motion.div
        key={i}
        className="w-1 bg-[#1DB954] mx-0.5 rounded"
        style={{ height }}
        animate={{ height: Math.random() * 30 + Object.values(eq).reduce((a, b) => a + b, 0) / 2 }}
        transition={{ repeat: Infinity, duration: 0.3, repeatType: "mirror", ease: "easeInOut" }}
      />
    );
  });

  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-[#1E1E1E] flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-4">Music</h2>
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-[#2A2A2A] rounded-full px-3 py-1 text-sm text-white focus:outline-none"
          />
          <button
            onClick={async () => {
              try {
                const res = await fetch(
                  `https://itunes.apple.com/search?term=${query}&media=music&limit=10`
                );
                const data = await res.json();
                setSongs(data.results);
                if (data.results.length > 0) setCurrentSong(0);
              } catch (err) {
                console.error(err);
              }
            }}
            className="p-2 rounded-full bg-[#3A3A3A] hover:bg-[#4A4A4A] transition"
          >
            <Search size={16} />
          </button>
        </div>

        <h3 className="font-semibold mb-2">Playlist</h3>
        <ul className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
          {songs.map((song, idx) => (
            <li
              key={idx}
              onClick={() => setCurrentSong(idx)}
              className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition ${
                idx === currentSong ? "bg-[#292929]" : "hover:bg-[#2A2A2A]"
              }`}
            >
              <img
                src={song.artworkUrl60}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col truncate">
                <span className="text-sm truncate">{song.trackName}</span>
                <span className="text-xs text-gray-400 truncate">
                  {song.artistName}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Player */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {songs[currentSong] && (
          <>
            {/* Album Cover + Waveform */}
            <div className="relative mb-6">
              <motion.div
                animate={eqControls}
                className="absolute inset-0 flex justify-center items-center space-x-1"
              >
                {waveformBars}
              </motion.div>
              <motion.img
                src={songs[currentSong].artworkUrl100}
                alt=""
                className="w-64 h-64 rounded-full shadow-2xl object-cover relative z-10"
              />
            </div>

            <h2 className="text-xl font-bold mb-1 text-center truncate">
              {songs[currentSong].trackName}
            </h2>
            <p className="text-gray-400 text-sm mb-4 text-center truncate">
              {songs[currentSong].artistName}
            </p>

            {/* Audio */}
            <audio
              ref={audioRef}
              src={songs[currentSong].previewUrl}
              onTimeUpdate={() => {
                if (!audioRef.current?.duration) return;
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
              }}
              onEnded={() => (repeat ? (audioRef.current.currentTime = 0) : handleNext())}
              autoPlay={isPlaying}
            />

            {/* Progress */}
            <div
              className="w-full max-w-md h-1.5 bg-[#2A2A2A] rounded-full mb-6 cursor-pointer"
              onClick={handleSeek}
            >
              <motion.div
                className="h-1.5 bg-[#1DB954]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            <div className="flex justify-between w-full max-w-md text-xs mb-4">
              <span>{formatTime(audioRef.current?.currentTime)}</span>
              <span>{formatTime(audioRef.current?.duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 mb-4">
              <button onClick={() => setShuffle(!shuffle)} className={`${shuffle ? "text-[#1DB954]" : ""}`}>
                <Shuffle size={20} />
              </button>
              <button onClick={handlePrev} className="p-2 rounded-full hover:bg-[#2A2A2A] transition">
                <SkipBack size={28} />
              </button>
              <button onClick={togglePlay} className="p-4 rounded-full bg-[#1DB954] hover:bg-[#1ed760] transition">
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button onClick={handleNext} className="p-2 rounded-full hover:bg-[#2A2A2A] transition">
                <SkipForward size={28} />
              </button>
              <button onClick={() => setRepeat(!repeat)} className={`${repeat ? "text-[#1DB954]" : ""}`}>
                <Repeat size={20} />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center space-x-2 w-full max-w-md mb-4">
              <Volume2 />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (audioRef.current) audioRef.current.volume = Number(e.target.value);
                }}
                className="w-full accent-[#1DB954]"
              />
            </div>

            {/* Visual EQ */}
            <div className="w-full max-w-md bg-[#1E1E1E] p-4 rounded-lg space-y-2">
              <h3 className="text-sm font-semibold mb-2">Equalizer (Visual)</h3>
              <div className="grid grid-cols-5 gap-2 items-end h-24">
                {Object.keys(eq).map((band) => (
                  <div key={band} className="flex flex-col items-center">
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      value={eq[band]}
                      onChange={(e) =>
                        setEq((prev) => ({ ...prev, [band]: Number(e.target.value) }))
                      }
                      className="w-15 p-4 h-full accent-[#1DB954] rotate-[-90deg]  mb-2"
                    />
                    <span className="text-xs">{band}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
