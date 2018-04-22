const SFX = () => {
    console.log('bijon');
    const audio = new Audio('/sfx/notif.mp3')
    audio.loop = false;
    return audio;
};
export default SFX;