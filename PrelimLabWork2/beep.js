// Create audio context once (outside the function)
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function beep() {
    // Resume audio context if it's suspended (required by some browsers)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    // Create oscillator (sound source)
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";      // clean beep
    oscillator.frequency.value = 880; // frequency in Hz (standard beep)

    // Create volume control
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.1; // low volume to avoid harsh sound

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Play sound
    const now = audioCtx.currentTime;
    oscillator.start(now);
    oscillator.stop(now + 0.15); // 150 ms beep
}
