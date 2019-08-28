
import Config from '../config/config';
import axios from 'axios';

const QuranAPI ={
    "listAyat": [
            "Surat Al Fatihah (Pembukaan)",
            "Surat Al Baqarah (Sapi Betina)",
            "Surat Ali 'Imran (Keluarga 'Imran)",
            "Surat An Nisa' (Wanita)",
            "Surat Al Ma'idah (Hidangan)",
            "Surat Al An'am (Binatang Ternak)",
            "Surat Al A'raf  (Tempat Tertinggi)",
            "Surat Al Anfal (Rampasan Perang)",
            "Surat At Taubah (Pengampunan)",
            "Surat Yunus (Nabi Yunus A.S.)",
            "Surat Hud (Nabi Huud A.S.)",
            "Surat Yusuf (Nabi Yusuf A.S.)",
            "Surat Ar Ra'd (Guruh)",
            "Surat Ibrahim (Nabi Ibrahim A.S.)",
            "Surat Al Hijr (Daerah Pegunungan)",
            "Surat An Nahl (Lebah)",
            "Surat Al Israa' (Memperjalankan Di Malam Hari)",
            "Surat Al Kahfi (Gua)",
            "Surat Maryam (Maryam)",
            "Surat Thaha (Thaahaa)",
            "Surat Al Anbiya' (Kisah Para Nabi)",
            "Surat Al Hajj (Ibadah Haji)",
            "Surat Al Mu'minun (Orang Mukmin)",
            "Surat An Nur (Cahaya)",
            "Surat Al Furqaan (Pembeda)",
            "Surat Asy Syu'ara' (Penyair)",
            "Surat An Naml (Semut)",
            "Surat Al Qashash (Cerita)",
            "Surat Al 'Ankabuut (Laba-Laba)",
            "Surat Ar Ruum (Bangsa Rumawi)",
            "Surat Luqman (Luqman)",
            "Surat As Sajdah ((Sujud)",
            "Surat Al Ahzab (Golongan Yang Bersekutu)",
            "Surat Saba' (Kaum Saba')",
            "Surat Fathir (Pencipta)",
            "Surat Yaasiin",
            "Surat Ash Shaffat (Yang Bershaf-Shaf)",
            "Surat Shaad",
            "Surat Az Zumar (Rombongan-Rombongan)",
            "Surat Al Mu'min (Orang Yang Beriman)",
            "Surat Fushshilat (Yang Dijelaskan)",
            "Surat Asy Syuura (Musyawarah)",
            "Surat Az Zukhruf (Perhiasan)",
            "Surat Ad Dukhaan (Kabut)",
            "Surat Al Jaatsiyah (Yang Berlutut)",
            "Surat Al Ahqaaf (Bukit Pasir)",
            "Surat Muhammad (Nabi Muhammad SAW)",
            "Surat Al Fath (Kemenangan)",
            "Surat Al Hujuraat (Kamar-Kamar)",
            "Surat Qaaf",
            "Surat Adz Dzaariyaat (Angin Yang Menerbangkan)",
            "Surat Ath Thuur (Bukit)",
            "Surat An Najm (Bintang)",
            "Surat Al Qamar (Bulan)",
            "Surat Ar Rahmaan (Yang Maha Pemurah)",
            "Surat Al Waaqi'ah (Hari Kiamat)",
            "Surat Al Hadid (Besi)",
            "Surat Al Mujadilah (Wanita Yang Mengajukan Gugatan)",
            "Surat Al Hasyr (Pengusiran)",
            "Surat Al Mumtahanah (Wanita Yang Diuji)",
            "Surat Ash Shaff (Barisan)",
            "Surat Al Jumu'ah (Hari Jum'at)",
            "Surat Al-Munafiqun (Orang-Orang Munafik)",
            "Surat At Taghabun (Hari Ditampakkan Kesalahan-Kesalahan)",
            "Surat Ath Thalaaq (Talak)",
            "Surat At Tahrim (Mengharamkan)",
            "Surat Al Mulk (Kerajaan)",
            "Surat Al Qalam (Pena)",
            "Surat Al Haqqah (Kiamat)",
            "Surat Al Ma'arij (Tempat-Tempat Naik)",
            "Surat Nuh (Nabi Nuh A.S)",
            "Surat Al Jin (Jin)",
            "Surat Al Muzzammil (Orang Yang Berselimut)",
            "Surat Al Muddatstsir (Orang Yang Berselimut)",
            "Surat Al Qiyamah (Hari Kiamat)",
            "Surat Al Insaan (Manusia)",
            "Surat Al Mursalat (Malaikat-Malaikat Yang Diutus)",
            "Surat An Naba´ (Berita Besar)",
            "Surat An Naazi´ (Malaikat-Malaikat Yang Mencabut)",
            "Surat 'Abasa (Bermuka Masam)",
            "Surat At Takwir (Menggulung)",
            "Surat Al Infithar (Terbelah)",
            "Surat Al Muthaffifiin (Orang-Orang Yang Curang)",
            "Surat Al Insyiqaaq (Terbelah)",
            "Surat Al Buruuj (Gugusan Bintang)",
            "Surat Ath Thaariq (Yang Datang Di Malam Hari)",
            "Surat Al A´Laa (Yang Paling Tinggi)",
            "Surat Al Ghaasyiyah (Hari Kiamat)",
            "Surat Al Fajr (Fajar)",
            "Surat Al Balad (Negeri)",
            "Surat Asy Syams (Matahari)",
            "Surat Al Lail (Malam)",
            "Surat Adh Dhuhaa (Waktu Dhuha)",
            "Surat Alam Nasyrah /Al Insyirah (Bukankah Kami Telah Melapangkan)",
            "Surat At Tiin (Buah Tin)",
           " Surat Al 'Alaq (Segumpal Darah)",
            "Surat Al Qadr (Kemuliaan)",
            "Surat Al Bayyinah (Bukti Yang Nyata)",
            "Surat Al Zalzalah (Goncangan)",
            "Surat Al 'Adiyat (Kuda Perang Yang Berlari Kencang)",
            "Surat Al Qari'ah (Hari Kiamat)",
            "Surat At Takatsur (Bermegah-Megahan)",
            "Surat Al 'Ashr (Masa)",
            "Surat Al Humazah (Pengumpat)",
            "Surat Al Fiil (Gajah)",
            "Surat Quraisy (Suku Quraisy)",
            "Surat Al Ma'un (Barang-Barang Yang Berguna)",
            "Surat Al Kautsar (Nikmat Yang Banyak)",
            "Surat Al Kafirun (Orang-Orang Kafir)",
            "Surat An Nashr (Pertolongan)",
            "Surat Al Lahab (Gejolak Api)",
            "Surat Al Ikhlas (Memurnikan Keesaan Allah)",
            "Surat Al Falaq (Waktu Subuh)",
            "Surat An Naas (Manusia)"
        ],
        loadListAllSurah: async () => {
            const result = await axios.get('http://api.alquran.cloud/quran/id.indonesian');
            return result;
        },
        loadSurah: async (surahNumber) => {
            const { data } = await axios.get(`http://api.alquran.cloud/surah/${surahNumber}/quran-uthmani`)
            const { code } = data;
            if(code === 200){
                console.log(data.data.ayahs)
                const surah = data.data.ayahs;
                var temp = surah[0].text;        
                var r;
                console.log((temp.indexOf('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ') > -1) );
                if((temp.indexOf('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ') > -1) && (surahNumber !== 1))
                {
                    r = temp.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '');
                    surah[0].text = r;
                }
                console.log(surah);
                return surah;
            }
            return [];
        },
}
    
    

export default QuranAPI;