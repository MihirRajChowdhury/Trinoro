"use client";
import { useState, useRef, useCallback } from "react";

const BEAT_PRESETS = [
  { label: "Focus", left: 220, right: 230 },
  { label: "Relax", left: 200, right: 210 },
  { label: "Sleep", left: 180, right: 186 },
  { label: "Deep", left: 150, right: 158 },
];
const BREATH_PRESETS = [
  { label: "Box (4-4-4-4)", pattern: [4, 4, 4, 4] },
  { label: "4-7-8", pattern: [4, 7, 8] },
  { label: "Calm (5-5)", pattern: [5, 5] },
];

export default function BinauralBreathControls({ onBinauralActive }: { onBinauralActive?: (active: boolean) => void }) {
  const [mode, setMode] = useState<'binaural' | 'breath' | null>(null);
  const [beat, setBeat] = useState(BEAT_PRESETS[0]);
  const [breath, setBreath] = useState(BREATH_PRESETS[0]);
  const [binauralActive, setBinauralActive] = useState(false);
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('');
  const [breathTimer, setBreathTimer] = useState(0);

  // Audio context and oscillators for binaural beats
  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const mergerRef = useRef<ChannelMergerNode | null>(null);

  // Breath timer refs
  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathIsRunningRef = useRef(false);

  const startBinauralBeats = useCallback(async () => {
    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioContextRef.current;

      // Create oscillators
      leftOscillatorRef.current = ctx.createOscillator();
      rightOscillatorRef.current = ctx.createOscillator();

      // Create gain nodes for volume control
      leftGainRef.current = ctx.createGain();
      rightGainRef.current = ctx.createGain();

      // Create channel merger for stereo output
      mergerRef.current = ctx.createChannelMerger(2);

      // Set frequencies
      leftOscillatorRef.current.frequency.setValueAtTime(beat.left, ctx.currentTime);
      rightOscillatorRef.current.frequency.setValueAtTime(beat.right, ctx.currentTime);

      // Set wave type to sine for pure tones
      leftOscillatorRef.current.type = 'sine';
      rightOscillatorRef.current.type = 'sine';

      // Set volume (start low for comfort)
      leftGainRef.current.gain.setValueAtTime(0.1, ctx.currentTime);
      rightGainRef.current.gain.setValueAtTime(0.1, ctx.currentTime);

      // Connect audio nodes
      leftOscillatorRef.current.connect(leftGainRef.current);
      rightOscillatorRef.current.connect(rightGainRef.current);
      leftGainRef.current.connect(mergerRef.current, 0, 0); // Left channel
      rightGainRef.current.connect(mergerRef.current, 0, 1); // Right channel
      mergerRef.current.connect(ctx.destination);

      // Start oscillators
      leftOscillatorRef.current.start();
      rightOscillatorRef.current.start();

      setBinauralActive(true);
      if (onBinauralActive) onBinauralActive(true);
    } catch (error) {
      console.error('Error starting binaural beats:', error);
      alert('Error starting audio. Please make sure to interact with the page first (click somewhere) before starting audio.');
    }
  }, [beat, onBinauralActive]);

  const stopBinauralBeats = useCallback(() => {
    try {
      if (leftOscillatorRef.current) {
        leftOscillatorRef.current.stop();
        leftOscillatorRef.current = null;
      }
      if (rightOscillatorRef.current) {
        rightOscillatorRef.current.stop();
        rightOscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    } catch (error) {
      console.error('Error stopping binaural beats:', error);
    }

    setBinauralActive(false);
    if (onBinauralActive) onBinauralActive(false);
  }, [onBinauralActive]);

  const startBreathSync = useCallback(() => {
    if (breathIsRunningRef.current) return; // Prevent multiple instances
    
    const pattern = breath.pattern;
    const phases = pattern.length === 3 ? ['Inhale', 'Hold', 'Exhale'] : 
                   pattern.length === 4 ? ['Inhale', 'Hold', 'Exhale', 'Hold'] :
                   ['Inhale', 'Exhale'];

    let currentPhaseIndex = 0;
    let currentTimer = 0;
    
    breathIsRunningRef.current = true;
    setBreathActive(true);

    const tick = () => {
      if (!breathIsRunningRef.current) return;

      // If current timer reaches 0, move to next phase
      if (currentTimer <= 0) {
        currentPhaseIndex = (currentPhaseIndex + 1) % pattern.length;
        currentTimer = pattern[currentPhaseIndex];
        setBreathPhase(phases[currentPhaseIndex]);
      }

      setBreathTimer(currentTimer);
      currentTimer -= 1;
    };

    // Initialize first phase
    currentTimer = pattern[0];
    setBreathPhase(phases[0]);
    setBreathTimer(currentTimer);
    currentTimer -= 1;

    // Run the breathing cycle
    breathIntervalRef.current = setInterval(tick, 1000);
  }, [breath.pattern]);

  const stopBreathSync = useCallback(() => {
    breathIsRunningRef.current = false;
    if (breathIntervalRef.current) {
      clearInterval(breathIntervalRef.current);
      breathIntervalRef.current = null;
    }
    setBreathActive(false);
    setBreathPhase('');
    setBreathTimer(0);
  }, []);

  const handleModeChange = (newMode: 'binaural' | 'breath') => {
    // Stop any active sessions when switching modes
    if (binauralActive) stopBinauralBeats();
    if (breathActive) stopBreathSync();
    setMode(newMode);
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 shadow-lg dark:shadow-purple-900/30 border border-emerald-100/60 dark:border-purple-900/60 flex flex-col gap-4 items-center">
      <div className="flex gap-4 mb-2">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-purple-700 ${mode === 'binaural' ? 'bg-emerald-400 text-white dark:bg-purple-700' : 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-200 border border-emerald-200 dark:border-purple-800'}`}
          onClick={() => handleModeChange('binaural')}
        >
          Binaural Beats
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-all text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-purple-700 ${mode === 'breath' ? 'bg-purple-400 text-white dark:bg-emerald-700' : 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-emerald-800'}`}
          onClick={() => handleModeChange('breath')}
        >
          Breath Sync
        </button>
      </div>

      {mode === 'binaural' && (
        <div className="w-full flex flex-col gap-3 items-center">
          <label className="font-medium text-emerald-700 dark:text-emerald-200">Goal</label>
          <select
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-purple-800 text-emerald-700 dark:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-purple-700"
            value={beat.label}
            onChange={e => setBeat(BEAT_PRESETS.find(b => b.label === e.target.value) || BEAT_PRESETS[0])}
            disabled={binauralActive}
          >
            {BEAT_PRESETS.map(b => (
              <option key={b.label} value={b.label}>{b.label}</option>
            ))}
          </select>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {beat.left}Hz / {beat.right}Hz (Beat: {Math.abs(beat.right - beat.left)}Hz)
          </div>
          <button
            className="mt-2 px-6 py-2 rounded-full bg-gradient-to-br from-emerald-400 to-purple-400 dark:from-purple-700 dark:to-emerald-500 text-white font-semibold shadow-md hover:from-emerald-500 hover:to-purple-500 dark:hover:from-purple-600 dark:hover:to-emerald-400 transition"
            onClick={binauralActive ? stopBinauralBeats : startBinauralBeats}
          >
            {binauralActive ? "Stop Binaural Beats" : "Start Binaural Beats"}
          </button>
          {binauralActive && (
            <div className="text-sm text-center text-emerald-600 dark:text-emerald-300 mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
              ♪ Binaural beats playing - use headphones for best effect
            </div>
          )}
          <div className="text-xs text-center text-purple-500 dark:text-purple-200 mt-2">
            When Binaural Beats are active, ambient sounds are disabled for best effect.
          </div>
        </div>
      )}

      {mode === 'breath' && (
        <div className="w-full flex flex-col gap-3 items-center">
          <label className="font-medium text-purple-700 dark:text-purple-200">Pattern</label>
          <select
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-emerald-800 text-purple-700 dark:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-emerald-700"
            value={breath.label}
            onChange={e => setBreath(BREATH_PRESETS.find(b => b.label === e.target.value) || BREATH_PRESETS[0])}
            disabled={breathActive}
          >
            {BREATH_PRESETS.map(b => (
              <option key={b.label} value={b.label}>{b.label}</option>
            ))}
          </select>
          <div className="text-sm text-slate-600 dark:text-slate-300">Pattern: {breath.pattern.join("-")}s</div>
          
          {breathActive && (
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-300 mb-2">{breathPhase}</div>
              <div className="text-4xl font-mono text-purple-700 dark:text-purple-200">{breathTimer}</div>
            </div>
          )}
          
          <button 
            className="mt-2 px-6 py-2 rounded-full bg-gradient-to-br from-purple-400 to-emerald-400 dark:from-emerald-700 dark:to-purple-500 text-white font-semibold shadow-md hover:from-purple-500 hover:to-emerald-500 dark:hover:from-emerald-600 dark:hover:to-purple-400 transition"
            onClick={breathActive ? stopBreathSync : startBreathSync}
          >
            {breathActive ? "Stop Breath Sync" : "Start Breath Sync"}
          </button>
        </div>
      )}

      {!mode && (
        <div className="text-slate-600 dark:text-slate-300 text-center">
          Choose a mode to begin: Binaural Beats or Breath Sync.
        </div>
      )}
    </div>
  );
}