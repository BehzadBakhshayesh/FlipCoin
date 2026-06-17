import { useEffect, useRef } from "react";

const bufferCache: Record<string, AudioBuffer> = {};

let audioContext: AudioContext | null = null;

function getContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function useSound(url: string, volume = 0.5) {
  const bufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const ctx = getContext();

      if (bufferCache[url]) {
        bufferRef.current = bufferCache[url];
        return;
      }

      const res = await fetch(url);
      const arr = await res.arrayBuffer();
      const buffer = await ctx.decodeAudioData(arr);

      bufferCache[url] = buffer;

      if (mounted) {
        bufferRef.current = buffer;
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [url]);

  const play = () => {
    const ctx = getContext();
    const buffer = bufferRef.current;

    if (!buffer) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const source = ctx.createBufferSource();
    const gain = ctx.createGain();

    gain.gain.value = volume;

    source.buffer = buffer;
    source.connect(gain);
    gain.connect(ctx.destination);

    source.start();
  };

  return play;
}
