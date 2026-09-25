// Tiny synthesized UI sounds — no audio files, and only ever played after the
// visitor has interacted with the phone (browser autoplay rules + courtesy).
let ctx: AudioContext | null = null;

function tone(
	freqs: Array<[number, number]>,
	{ gain = 0.05, length = 0.09 } = {},
) {
	try {
		ctx ??= new AudioContext();
		const t0 = ctx.currentTime;
		freqs.forEach(([from, to], i) => {
			if (!ctx) return;
			const start = t0 + i * length * 0.9;
			const osc = ctx.createOscillator();
			const g = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(from, start);
			osc.frequency.exponentialRampToValueAtTime(to, start + length);
			g.gain.setValueAtTime(0, start);
			g.gain.linearRampToValueAtTime(gain, start + 0.008);
			g.gain.exponentialRampToValueAtTime(0.0001, start + length);
			osc.connect(g).connect(ctx.destination);
			osc.start(start);
			osc.stop(start + length + 0.02);
		});
	} catch {
		// Audio is decoration; never let it break the demo.
	}
}

export const sounds = {
	send: () => tone([[520, 880]], { gain: 0.04, length: 0.07 }),
	receive: () =>
		tone(
			[
				[760, 760],
				[1020, 1020],
			],
			{ gain: 0.035, length: 0.07 },
		),
	notify: () =>
		tone(
			[
				[880, 880],
				[1175, 1175],
			],
			{ gain: 0.045, length: 0.11 },
		),
};

export function haptic(ms = 8) {
	try {
		navigator.vibrate?.(ms);
	} catch {}
}
