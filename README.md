# React Music Player with Visual Equalizer

A modern **React-based music player** with a **searchable playlist**, **audio controls**, **animated album art**, **volume control**, and **visual equalizer**. The app fetches songs from **iTunes API** and provides a smooth, interactive UI using **Tailwind CSS** and **Framer Motion**.

---

## Features

### 1. Playlist & Search

* Search for songs using the iTunes API.
* Fetch top 10 songs for any query.
* Display songs with album art, track name, and artist.
* Click on a song to play it instantly.
* Scrollable playlist with smooth hover effects.

### 2. Main Player

* Large **album cover** with rotation animation.
* **Song info** display: track name and artist.
* Play, pause, skip forward/back, shuffle, and repeat buttons.
* Clickable **progress bar** to seek within the song.
* Current time / total duration display.

### 3. Volume & Audio Controls

* Adjustable **volume slider**.
* Shuffle and repeat modes with visual indicators.

### 4. Visual Equalizer

* 5-band **visual EQ sliders** (Bass, Low Mid, Mid, High Mid, Treble).
* Animated waveform reacts to EQ sliders (simulated visual effect).
* Album cover pulses based on EQ settings.

### 5. Animations

* Album cover rotation while playing.
* Smooth waveform animation.
* Tailwind CSS hover and transition effects for interactive UI.

---

## Tech Stack

* **React** – UI and state management.
* **Framer Motion** – Animations for album cover and waveform.
* **Tailwind CSS** – Responsive and modern UI design.
* **iTunes API** – Fetch music tracks.
* **React Hooks** – `useState`, `useEffect`, `useRef` for state and DOM handling.

---

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/react-music-player.git
   cd react-music-player
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. **Search Songs**

   * Type a keyword (artist, album, or song) into the search bar.
   * Click the search icon or press enter to fetch songs.

2. **Play Music**

   * Click a song in the playlist.
   * Press **Play/Pause** to start/stop playback.
   * Use **Next/Previous** buttons to switch songs.
   * **Shuffle/Repeat** buttons toggle modes.

3. **Adjust Volume**

   * Use the slider to increase or decrease volume.

4. **Equalizer**

   * Drag the 5 EQ sliders to adjust bass, mid, and treble levels.
   * Watch the album cover pulse and waveform animate according to the EQ sliders.

5. **Seek**

   * Click on the progress bar to jump to any point in the song.

---

## Folder Structure

```
react-music-player/
│

│
├─ src/
│   ├─ page/
│   │   └─ MusicPlayer.jsx
│   ├─ App.jsx
│   ├─ main.jsx
│   └─ index.css
│___index.html
├─ package.json
└─ README.md
```

---

## Future Improvements

* Implement **real audio filtering** using Web Audio API.
* Add support for **more music APIs** (Spotify, SoundCloud, etc.).
* Save playlists locally or to a backend.
* Enhance waveform with **real-time audio visualization**.
* Mobile responsiveness improvements.

---

## Screenshots

![Music Player](https://via.placeholder.com/500x300?text=Music+Player+Screenshot)

---

## License

This project is **open-source** and free to use.
Feel free to modify and distribute.
