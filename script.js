const songDatabase = {
    songs: [
        {
            id: 1,
            title: "Chandrullo unde kundelu",
            artist: "Shankar Mahadevan",
            cover: "https://res.cloudinary.com/dykzuljjr/image/upload/v1743418357/images_c9cebr.jpg",
            file: "https://res.cloudinary.com/dykzuljjr/video/upload/v1743418367/04_-_Chandrullo_Unde_Kundelu_-_SenSongsMp3.co_w0qnnr.mp3"
        },
        {
            id: 2,
            title: "hanuman",
            artist: "Test Artist 2",
            cover: "https://picsum.photos/200?2",
            file: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
        },
        {
            id: 3,
            title: "Test Song 3",
            artist: "Test Artist 3",
            cover: "https://picsum.photos/200?3",
            file: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
        },
        {
            id: 4,
            title: "Test Song 4",
            artist: "Test Artist 4",
            cover: "https://picsum.photos/200?4",
            file: "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav"
        },
        {
            id: 5,
            title: "Radhika",
            artist: "Test Artist 5",
            cover: "https://picsum.photos/200?5",
            file: "https://res.cloudinary.com/dykzuljjr/video/upload/v1743345915/Radhika_verm5t.mp3"
        }
    ],

    searchSongs: function(searchTerm) {
        if (!searchTerm) return [];
        
        searchTerm = searchTerm.toLowerCase();
        return this.songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        );
    },

    getSongById: function(id) {
        return this.songs.find(song => song.id === id);
    },

    getRandomSongs: function(count) {
        const shuffled = [...this.songs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }
};

window.songDatabase = songDatabase;
