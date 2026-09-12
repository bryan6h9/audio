// ==========================================
// REPRODUCTOR DE MÚSICA - bryan6h9 Music
// ==========================================

// ELEMENTOS DEL DOM
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progress = document.getElementById("progress");
const songName = document.getElementById("songName");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const searchInput = document.getElementById("searchInput");
const catalog = document.getElementById("catalog");
const navButtons = document.getElementById("navButtons");
const volumeControl = document.getElementById("volume");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");
const coverImg = document.getElementById("coverImg");
const player = document.querySelector(".player");

let currentPlaylistIndex = -1;
let currentPlaylistSource = null;     // 'genre', 'playlist', o null
let currentPlaylistNameActive = null; // nombre de la playlist o género activo
let currentPlaylistSongs = [];         // array de canciones de la playlist actual

// ==========================================
// DATOS: CANCIONES INDEPENDIENTES
// ==========================================
let songs = [
    { name: "Sorry", artist: "Justin Bieber", file: "music/Justin Bieber - Sorry.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
    { name: "Baile inolvidable", artist: "Bad Bunny", file: "music/song2.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
    { name: "Bckpckbyz", artist: "Peso Pluma", file: "music/song3.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
    { name: "Otro atardecer", artist: "Bad Bunny", file: "music/Bad Bunny - Otro Atardecer.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
    { name: "Stay", artist: "Kid Laroi", file: "music/song5.mp3", cover: "covers/stay.jpeg", genre: "Pop" }
];

// ==========================================
// DATOS: ÁLBUMES
// ==========================================
let albums = {
    "Purpose": {
        name: "Purpose",
        artist: "Justin Bieber",
        cover: "covers/sorry.jpeg",
        year: 2015,
        genre: "Pop",
        songs: [
            { name: "Mark My Words", artist: "Justin Bieber", file: "music/justin_bieber_what_do_you_mean.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "I'll Show You", artist: "Justin Bieber", file: "music/Justin Bieber - Sorry.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "What Do You Mean?", artist: "Justin Bieber", file: "music/justin_bieber_what_do_you_mean.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "Sorry", artist: "Justin Bieber", file: "music/Justin Bieber - Sorry.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "Love Yourself", artist: "Justin Bieber", file: "music/justin_bieber_love_yourself.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "Company", artist: "Justin Bieber", file: "music/justin_bieber_company.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "No Pressure", artist: "Justin Bieber", file: "music/justin_bieber_what_do_you_mean.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "No Sense", artist: "Justin Bieber", file: "music/justin_bieber_what_do_you_mean.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "The Feeling", artist: "Justin Bieber", file: "music/justin_bieber_what_do_you_mean.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "Life Is Worth Living", artist: "Justin Bieber", file: "music/justin_bieber_what_do_you_mean.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "Where Are Ü Now", artist: "Justin Bieber", file: "music/justin_bieber_where_are_u_now.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "Children", artist: "Justin Bieber", file: "music/justin_bieber_what_do_you_mean.mp3", cover: "covers/sorry.jpeg", genre: "Pop" },
            { name: "Purpose", artist: "Justin Bieber", file: "music/justin_bieber_what_do_you_mean.mp3", cover: "covers/sorry.jpeg", genre: "Pop" }
        ]
    },
    "Un Verano Sin Ti": {
        name: "Un Verano Sin Ti",
        artist: "Bad Bunny",
        cover: "covers/otro atardecer.jpeg",
        year: 2022,
        genre: "Reggaeton",
        songs: [
            { name: "Moscow Mule", artist: "Bad Bunny", file: "music/bad_bunny_moscow_mule.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Después de la Playa", artist: "Bad Bunny", file: "music/bad_bunny_despues_de_la_playa.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Me Porto Bonito", artist: "Bad Bunny", file: "music/bad_bunny_me_porto_bonito.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Tití Me Preguntó", artist: "Bad Bunny", file: "music/bad_bunny_titi_me_pregunto.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Un Ratito", artist: "Bad Bunny", file: "music/bad_bunny_un_ratito.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Yo No Soy Celoso", artist: "Bad Bunny", file: "music/bad_bunny_yo_no_soy_celoso.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Tarot", artist: "Bad Bunny", file: "music/bad_bunny_tarot.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Neverita", artist: "Bad Bunny", file: "music/bad_bunny_neverita.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "La Corriente", artist: "Bad Bunny", file: "music/bad_bunny_la_corriente.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Efecto", artist: "Bad Bunny", file: "music/bad_bunny_efecto.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Party", artist: "Bad Bunny", file: "music/bad_bunny_party.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Aguacero", artist: "Bad Bunny", file: "music/bad_bunny_aguacero.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Enséñame a Bailar", artist: "Bad Bunny", file: "music/bad_bunny_ensename_a_bailar.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Ojitos Lindos", artist: "Bad Bunny", file: "music/bad_bunny_ojitos_lindos.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Dos Mil 16", artist: "Bad Bunny", file: "music/bad_bunny_dos_mil_16.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "El Apagón", artist: "Bad Bunny", file: "music/bad_bunny_el_apagon.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Otro Atardecer", artist: "Bad Bunny", file: "music/bad_bunny_otro_atardecer.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Un Coco", artist: "Bad Bunny", file: "music/bad_bunny_un_coco.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Andrea", artist: "Bad Bunny", file: "music/bad_bunny_andrea.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Me Fui de Vacaciones", artist: "Bad Bunny", file: "music/bad_bunny_me_fui_de_vacaciones.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Un Verano Sin Ti", artist: "Bad Bunny", file: "music/bad_bunny_un_verano_sin_ti.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Agosto", artist: "Bad Bunny", file: "music/bad_bunny_agosto.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" },
            { name: "Callaíta", artist: "Bad Bunny", file: "music/bad_bunny_callaita.mp3", cover: "covers/otro atardecer.jpeg", genre: "Reggaeton" }
        ]
    },
    "Dinastia": {
        name: "Dinastia",
        artist: "Peso Pluma",
        cover: "covers/back.jpeg",
        year: 2023,
        genre: "Regional Mexicano",
        songs: [
            { name: "Intro", artist: "Peso Pluma/Tito Double P", file: "music/Intro.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Dopamina", artist: "Peso Pluma/Tito Double P", file: "music/Dopamina.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Ni Pedo", artist: "Peso Pluma/Tito Double P", file: "music/Ni_Pedo.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Putielegante", artist: "Peso Pluma/Tito Double P", file: "music/Putielegante.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "7-3", artist: "Peso Pluma/Tito Double P", file: "music/7-3.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Billete", artist: "Peso Pluma/Tito Double P", file: "music/Billete.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Daño", artist: "Peso Pluma/Tito Double P", file: "music/Daño.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Trucha", artist: "Peso Pluma/Tito Double P", file: "music/Trucha.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Morras II", artist: "Peso Pluma/Tito Double P", file: "music/Morras_II.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Mezcal", artist: "Peso Pluma/Tito Double P", file: "music/Mezcal.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Malibu", artist: "Peso Pluma/Tito Double P", file: "music/Malibu.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "20s", artist: "Peso Pluma/Tito Double P", file: "music/20s.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Viejo Lobo", artist: "Peso Pluma/Tito Double P", file: "music/Viejo_Lobo.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Tú con Él", artist: "Peso Pluma/Tito Double P", file: "music/Tu_con_El.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" },
            { name: "Bckpckbyz", artist: "Peso Pluma/Tito Double P", file: "music/Bckpckbyz.mp3", cover: "covers/back.jpeg", genre: "Regional Mexicano" }
        ]
    },
    "Justice": {
        name: "Justice",
        artist: "Justin Bieber",
        cover: "covers/peaches.jpg",
        year: 2021,
        genre: "Pop",
        songs: [
            { name: "2 Much", artist: "Justin Bieber", file: "music/justin_bieber_2_much.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Deserve You", artist: "Justin Bieber", file: "music/justin_bieber_deserve_you.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "As I Am (feat. Khalid)", artist: "Justin Bieber", file: "music/justin_bieber_as_i_am_feat_khalid.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Off My Face", artist: "Justin Bieber", file: "music/justin_bieber_off_my_face.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Holy (feat. Chance the Rapper)", artist: "Justin Bieber", file: "music/justin_bieber_holy_feat_chance_the_rapper.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Unstable (feat. The Kid LAROI)", artist: "Justin Bieber", file: "music/justin_bieber_unstable_feat_the_kid_laroi.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "MLK Interlude", artist: "Justin Bieber", file: "music/justin_bieber_mlk_interlude.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Die for You (feat. Dominic Fike)", artist: "Justin Bieber", file: "music/justin_bieber_die_for_you_feat_dominic_fike.mp.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Hold On", artist: "Justin Bieber", file: "music/justin_bieber_hold_on.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Somebody", artist: "Justin Bieber", file: "music/justin_bieber_somebody.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Ghost", artist: "Justin Bieber", file: "music/justin_bieber_ghost.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Peaches (feat. Daniel Caesar & Giveon)", artist: "Justin Bieber", file: "music/justin_bieber_peaches_feat_daniel_caesar_giveon.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Love You Different (feat. BEAM)", artist: "Justin Bieber", file: "music/justin_bieber_love_you_different_feat_beam.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Loved by You (feat. Burna Boy)", artist: "Justin Bieber", file: "music/justin_bieber_loved_by_you_feat_burna_boy.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Anyone", artist: "Justin Bieber", file: "music/justin_bieber_anyone.mp3", cover: "covers/peaches.jpg", genre: "Pop" },
            { name: "Lonely (feat. Benny Blanco)", artist: "Justin Bieber", file: "music/justin_bieber_lonely_feat_benny_blanco.mp3", cover: "covers/peaches.jpg", genre: "Pop" }
        ]
    },
    "Debí Tirar Más Fotos": {
        name: "Debí Tirar Más Fotos",
        artist: "Bad Bunny",
        cover: "covers/baile inolvidable.jpeg",
        year: 2025,
        genre: "Reggaeton",
        songs: [
            { name: "NUEVAYoL", artist: "Bad Bunny", file: "music/bad_bunny_nuevayol.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "VOY A LLeVARTE PA PR", artist: "Bad Bunny", file: "music/bad_bunny_voy_a_llevarte_pa_pr.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "BAILE INoLVIDABLE", artist: "Bad Bunny", file: "music/bad_bunny_baile_inolvidable.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "PERFuMITO NUEVO (ft. RaiNao)", artist: "Bad Bunny", file: "music/bad_bunny_perfumito_nuevo_ft_rainao.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "WELTiTA (ft. Chuwi)", artist: "Bad Bunny", file: "music/bad_bunny_weltita_ft_chuwi.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "VeLDÁ (ft. Dei V & Omar Courtz)", artist: "Bad Bunny", file: "music/bad_bunny_velda_ft_dei_v_omar_courtz.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "EL CLúB", artist: "Bad Bunny", file: "music/bad_bunny_el_club.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "KETU TeCRÉ", artist: "Bad Bunny", file: "music/bad_bunny_ketu_tecre.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "BOKeTE", artist: "Bad Bunny", file: "music/bad_bunny_bokete.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "KLOuFRENS", artist: "Bad Bunny", file: "music/bad_bunny_kloufrens.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "TURiSTA", artist: "Bad Bunny", file: "music/bad_bunny_turista.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "CAFé CON RON (ft. Pleneros de la Cresta)", artist: "Bad Bunny", file: "music/bad_bunny_cafe_con_ron_ft_pleneros_de_la_cresta.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "PIToRRO DE COCO", artist: "Bad Bunny", file: "music/bad_bunny_pitorro_de_coco.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "LO QUE LE PASÓ A HAWAii", artist: "Bad Bunny", file: "music/bad_bunny_lo_que_le_paso_a_hawaii.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "EoO", artist: "Bad Bunny", file: "music/bad_bunny_eoo.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "DtMF", artist: "Bad Bunny", file: "music/bad_bunny_dtmf.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" },
            { name: "LA MuDANZA", artist: "Bad Bunny", file: "music/bad_bunny_la_mudanza.mp3", cover: "covers/baile inolvidable.jpeg", genre: "Reggaeton" }
        ]
    },
    "Genesis": {
        name: "Genesis",
        artist: "Peso Pluma",
        cover: "covers/genesis.jpg",
        year: 2024,
        genre: "Regional Mexicano",
        songs: [
            { name: "Rosa Pastel (feat. Jasiel Núñez)", artist: "Peso Pluma", file: "music/peso_pluma_rosa_pastel_feat_jasiel_nunez.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Luna (feat. Junior H)", artist: "Peso Pluma", file: "music/peso_pluma_luna_feat_junior_h.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "77 (feat. Eladio Carrión)", artist: "Peso Pluma", file: "music/peso_pluma_77_feat_eladio_carrion.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Rubicon", artist: "Peso Pluma", file: "music/peso_pluma_rubicon.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Carnal (feat. Natanael Cano)", artist: "Peso Pluma", file: "music/peso_pluma_carnal_feat_natanael_cano.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Gavilán II (feat. Tito Double P)", artist: "Peso Pluma", file: "music/peso_pluma_gavilan_ii_feat_tito_double_p.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "VVS (feat. Darey Castro & Edgardo Nuñez)", artist: "Peso Pluma", file: "music/peso_pluma_vvs_feat_darey_castro_edgardo_nunez.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Su Casa (feat. Luis R Conríquez)", artist: "Peso Pluma", file: "music/peso_pluma_su_casa_feat_luis_r_conriquez.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Lady Gaga (feat. Gabito Ballesteros & Junior H)", artist: "Peso Pluma", file: "music/peso_pluma_lady_gaga_feat_gabito_ballesteros_junior_h.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Zapata", artist: "Peso Pluma", file: "music/peso_pluma_zapata.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "La People (feat. Tito Double P)", artist: "Peso Pluma", file: "music/peso_pluma_la_people_feat_tito_double_p.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Nueva Vida", artist: "Peso Pluma", file: "music/peso_pluma_nueva_vida.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Lagunas (feat. Jasiel Núñez)", artist: "Peso Pluma", file: "music/peso_pluma_lagunas_feat_jasiel_nunez.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" },
            { name: "Bye", artist: "Peso Pluma", file: "music/peso_pluma_bye.mp3", cover: "covers/genesis.jpg", genre: "Regional Mexicano" }
        ]
    },
    "YHLQMDLG": {
        name: "YHLQMDLG",
        artist: "Bad Bunny",
        cover: "covers/yhlqmdlg.jpg",
        year: 2020,
        genre: "Reggaeton",
        songs: [
            { name: "Si Veo a Tu Mamá", artist: "Bad Bunny", file: "music/bad_bunny_si_veo_a_tu_mama.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "La Difícil", artist: "Bad Bunny", file: "music/bad_bunny_la_dificil.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Pero Ya No", artist: "Bad Bunny", file: "music/bad_bunny_pero_ya_no.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "La Santa (feat. Daddy Yankee)", artist: "Bad Bunny", file: "music/bad_bunny_la_santa_feat_daddy_yankee.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Yo Perreo Sola", artist: "Bad Bunny", file: "music/bad_bunny_yo_perreo_sola.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Bichiyal (feat. Yaviah)", artist: "Bad Bunny", file: "music/bad_bunny_bichiyal_feat_yaviah.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Soliá", artist: "Bad Bunny", file: "music/bad_bunny_solia.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "La Zona", artist: "Bad Bunny", file: "music/bad_bunny_la_zona.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Qué Malo (feat. Ñengo Flow)", artist: "Bad Bunny", file: "music/bad_bunny_que_malo_feat_nengo_flow.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Vete", artist: "Bad Bunny", file: "music/bad_bunny_vete.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Ignorantes (feat. Sech)", artist: "Bad Bunny", file: "music/bad_bunny_ignorantes_feat_sech.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "A Tu Merced", artist: "Bad Bunny", file: "music/bad_bunny_a_tu_merced.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Una Vez (feat. Mora)", artist: "Bad Bunny", file: "music/bad_bunny_una_vez_feat_mora.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Safaera (feat. Jowell & Randy & Ñengo Flow)", artist: "Bad Bunny", file: "music/bad_bunny_safaera_feat_jowell_randy_nengo_flow.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "25/8", artist: "Bad Bunny", file: "music/bad_bunny_25_8.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Está Cabrón Ser Yo", artist: "Bad Bunny", file: "music/bad_bunny_esta_cabron_ser_yo.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Puesto Pa' Guerrial", artist: "Bad Bunny", file: "music/bad_bunny_puesto_pa_guerrial.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "P FKN R", artist: "Bad Bunny", file: "music/bad_bunny_p_fkn_r.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "Hablamos Mañana (feat. Duki & Pablo Chill-E)", artist: "Bad Bunny", file: "music/bad_bunny_hablamos_manana_feat_duki_pablo_chill_e.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" },
            { name: "<3", artist: "Bad Bunny", file: "music/bad_bunny_corazon.mp3", cover: "covers/yhlqmdlg.jpg", genre: "Reggaeton" }
        ]
    }
};

// ==========================================
// DATOS: PLAYLISTS POR GÉNERO
// ==========================================
let genrePlaylists = {
   "Amor": {
    name: "Amor",
    color: "rgba(110, 111, 99, 0.26)",
    cover: "portadas/amo5.jpg",
    songs: [
        { name: "Siempre te voy a querer", artist: "Calibre 50", file: "music/Siempre Te Voy A Querer.mp3", cover: "covers/siempre te voy a querer.jpeg", genre: "Amor", isManual: true },
        { name: "Te Regalo", artist: "Ulices Chaidez", file: "music/Ulices Chaidez - Te Regalo (Letra).mp3", cover: "covers/te regalo.png", genre: "Amor", isManual: true },
        { name: "Perfecta", artist: "Banda Los Recoditos", file: "music/perfecta.mp3", cover: "covers/perfecta.jpg", genre: "Amor", isManual: true },
        { name: "Enamorado", artist: "Yahritza Y Su Esencia", file: "music/Yahritza Y Su Esencia - Enamorado (Video Oficial).mp3", cover: "covers/yarit.jpeg", genre: "Amor", isManual: true },
        { name: "Piénsalo", artist: "Banda MS", file: "music/BANDA MS - PIÉNSALO (VIDEO OFICIAL).mp3", cover: "covers/piensalo.jpg", genre: "Amor", isManual: true },
        { name: "Darte un Beso", artist: "Prince Royce", file: "music/Prince Royce - Darte un Beso.mp3", cover: "covers/farte un beso.jpeg", genre: "Amor", isManual: true },
        { name: "Esa Carita", artist: "Ivan Cornejo", file: "music/Ivan Cornejo - Esa Carita (Audio Oficial).mp3", cover: "covers/ivan.png", genre: "Amor", isManual: true },
        { name: "Tú", artist: "Los Elegantes de Jerez", file: "music/Los Elegantes de Jerez - Tú.mp3", cover: "covers/jerez.jpeg", genre: "Amor", isManual: true },
        { name: "Porque Me Enamoré", artist: "Ulices Chaidez y Sus Plebes", file: "music/Porque Me Enamore - (Video Oficial) - Ulices Chaidez y Sus Plebes - Del Records 2016.mp3", cover: "covers/te regalo.png", genre: "Amor", isManual: true },
        { name: "A La Antigüita", artist: "Calibre 50", file: "music/A La Antigüita - Calibre 50 (LETRA).mp3", cover: "covers/antigua.jpeg", genre: "Amor", isManual: true },
        { name: "Ojitos de Miel", artist: "T3R Elemento", file: "music/Ojitos de Miel - T3R Elemento - DEL Records 2020.mp3", cover: "covers/miel.jpg", genre: "Amor", isManual: true },
        { name: "El Amor de Mi Vida", artist: "Conjunto Renacer", file: "music/El Amor de Mi Vida.mp3", cover: "covers/renacer.jpeg", genre: "Amor", isManual: true },
        { name: "Inseparables", artist: "Yahritza Y Su Esencia, Ivan Cornejo", file: "music/Yahritza Y Su Esencia, Ivan Cornejo - Inseparables (Official Lyric Video).mp3", cover: "covers/insepa.jpg", genre: "Amor", isManual: true },
        { name: "Hermosa Experiencia", artist: "Banda MS", file: "music/Banda MS - Hermosa Experiencia (Audio).mp3", cover: "covers/hermosa.jpeg", genre: "Amor", isManual: true },
        { name: "La Boca Les Callamos", artist: "La Fiera De Ojinaga", file: "music/laboca.mp3", cover: "covers/fiera.jpg", genre: "Amor", isManual: true },
        { name: "Háblame de Ti", artist: "Banda MS", file: "music/BANDA MS - HÁBLAME DE TI (LETRA).mp3", cover: "covers/habla de ti.jpg", genre: "Amor", isManual: true },
        { name: "Vas a Querer Volver", artist: "La Fuerza Norteña", file: "music/VAS A QUERER VOLVER - LA FUERZA NORTEÑA.mp3", cover: "covers/vas a querer.jpeg", genre: "Amor", isManual: true },
        { name: "Miel", artist: "La Potencia De La Música Norteña", file: "music/miel.mp3", cover: "covers/miell.jpg", genre: "Amor", isManual: true },
        { name: "El Vaquero", artist: "Los Elegantes de Jerez", file: "music/Los elegantes de jerez - Huapango el vaquero (Huapango).mp3", cover: "covers/elegante.webp", genre: "Amor", isManual: true }
    ]
},

"All": {
    name: "All",
    color: "rgba(110, 111, 99, 0.26)",
    cover: "portadas/all.jpg",
    songs: [
        { name: "Nieves de enero", artist: "Chalino", file: "cancionesall/Nieves de Enero.mp3", cover: "allportadas/chalino.jpeg", genre: "All", isManual: true },
        { name: "01 Los Dos Amigos", artist: "Los Cadetes de Linares", file: "cancionesall/01 Los Dos Amigos.mp3", cover: "allportadas/cadetesdelinares.jpg", genre: "All", isManual: true },

        { name: "Prestamela a mi", artist: "Calibre 50", file: "cancionesall/prestamela a mi.mp3", cover: "allportadas/calibre50.jpg", genre: "All", isManual: true },
        { name: "Belleza de cantina", artist: "Cardenales de nuevo leon", file: "cancionesall/Belleza De Cantina.mp3", cover: "allportadas/cardenalesdenuevoleon.jpg", genre: "All", isManual: true },


        { name: "Actos De Un Tonto", artist: "Conjunto Primavera", file: "cancionesall/Actos De Un Tonto.mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "Ave Cautiva", artist: "Conjunto Primavera", file: "cancionesall/Ave Cautiva.mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "Más al tigre (Video Oficial)", artist: "Banda Elemental & Julión Álvarez", file: "cancionesall/Banda Elemental & Julión Álvarez - Una raya más al tigre (video oficial).mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Pasado (Video Oficial)", artist: "Carin Leon & Jean Piero", file: "cancionesall/Carin Leon & Jean Piero  -El Invierno Pasado (Video Oficial).mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Que Vuelvas", artist: "Carin Leon x Grupo Frontera", file: "cancionesall/Carin Leon x Grupo Frontera - Que Vuelvas.mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "COMO DUELE EQUIVOCARSE", artist: "Espinoza Paz", file: "cancionesall/COMO DUELE EQUIVOCARSE - Carin Leon & Espinoza Paz (Lyric Video).mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Adiós Amor (Visualizer)", artist: "Conjunto Primavera", file: "cancionesall/Conjunto Primavera - Adiós Amor (Visualizer).mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "En Cada Gota De Mi Sangre", artist: "Conjunto Primavera", file: "cancionesall/Conjunto Primavera - En Cada Gota De Mi Sangre..mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "Mi Sacrificio", artist: "Conjunto Primavera", file: "cancionesall/Conjunto Primavera - Mi Sacrificio..mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "Si Te Vuelvo A Ver (Audio)", artist: "Conjunto Primavera", file: "cancionesall/Conjunto Primavera - Si Te Vuelvo A Ver (Audio).mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "Te Quiero Con La Vida", artist: "Conjunto Primavera", file: "cancionesall/Conjunto Primavera - Te Quiero Con La Vida..mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "Cuál Adiós", artist: "Banda Cuisillos", file: "cancionesall/Cuál Adiós.mp3", cover: "allportadas/bandaclavenueva.jpg", genre: "All", isManual: true },
        { name: "Cuando Toque Mi Piel", artist: "Carin Leon Ft. Roy Rosas", file: "cancionesall/Cuando Toque Mi Piel - Carin Leon Ft. Roy Rosas.mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Déjenme Llorar", artist: "Carin Leon Ft. Martin Ramos", file: "cancionesall/Déjenme Llorar - Carin Leon Ft. Martin Ramos.mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Dos Cartas y una Flor", artist: "Los Caminantes", file: "cancionesall/Dos Cartas y una Flor.mp3", cover: "allportadas/loscaminantes.jpeg", genre: "All", isManual: true },
        { name: "El Caballo Jovero", artist: "Los Cadetes de Linares", file: "cancionesall/El Caballo Jovero - Los Cadetes de Linares.mp3", cover: "allportadas/caballojovero.jpg", genre: "All", isManual: true },
        { name: "El Palomito", artist: "Los Cadetes de Linares", file: "cancionesall/El Palomito - Los Cadetes de Linares.mp3", cover: "allportadas/cadetesdelinares.jpg", genre: "All", isManual: true },
        { name: "Almas Gemelas", artist: "El Trono De México", file: "cancionesall/El Trono De México  - Almas Gemelas.mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "Te Recordaré", artist: "El Trono De México", file: "cancionesall/Te Recordaré.mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "Corazón Mágico (Video Oficial)", artist: "El Trono De México", file: "cancionesall/El Trono de México  Corazón Mágico (Video Oficial).mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "PROMETISTE VOLVER (VIDEO OFICIAL)", artist: "El Trono De México", file: "cancionesall/EL TRONO DE MEXICO  PROMETISTE VOLVER  (VIDEO OFICIAL).mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "Por Amor A Ti", artist: "El Trono De México", file: "cancionesall/El Trono De México - Por Amor A Ti.mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "Te Ves Fatal", artist: "El Trono De México", file: "cancionesall/El Trono De México - Te Ves Fatal.mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "Eres Ese Algo", artist: "La Maquinaria Norteña", file: "cancionesall/Eres Ese Algo.mp3", cover: "allportadas/maquinaarianortenia.jpg", genre: "All", isManual: true },
        { name: "Ganas de Volver a Amar", artist: "El Trono De México", file: "cancionesall/Ganas de Volver a Amar.mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "Toxico (Video Oficial)", artist: "Grupo Firme - Carin Leon", file: "cancionesall/elcarin.mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Guaro RMX", artist: "Pipe, Carin, J..., Charrito & Navarrete", file: "cancionesall/toxico.mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Así Fue Letra en Español", artist: "Juan Gabriel", file: "cancionesall/Juan Gabriel  Así Fue  Letra en Español.mp3", cover: "allportadas/juangabriel.jpeg", genre: "All", isManual: true },
        { name: "Afuera Está Lloviendo (LETRA)", artist: "Julión Álvarez", file: "cancionesall/Julión Álvarez - Afuera Está Lloviendo (LETRA).mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Aquí Algo Cambió (Video Oficial)", artist: "Julión Álvarez", file: "cancionesall/Julión Álvarez - Aquí Algo Cambió (Video Oficial).mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Corazón Mágico (LETRA)", artist: "Julión Álvarez", file: "cancionesall/Julión Álvarez - Corazón Mágico (LETRA).mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "La Hice Sufrir (Video Lyric)", artist: "Julión Álvarez", file: "cancionesall/Julión Álvarez - La Hice Sufrir (Video Lyric).mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "La Suerte (Video Lyric)", artist: "Julión Álvarez Y Su Norteño Banda", file: "cancionesall/Julión Álvarez Y Su Norteño Banda - Buscándole A La Suerte (Video Lyric).mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Mis Recuerdos (Audio)", artist: "Julión Álvarez Y Su Norteño Banda", file: "cancionesall/Julión Álvarez Y Su Norteño Banda - No Llores Mis Recuerdos (Audio).mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Regalo de Dios", artist: "Julión Álvarez y su Norteño Banda", file: "cancionesall/Julión Álvarez y su Norteño Banda - Regalo de Dios.mp3", cover: "allportadas/rgalodediosjulion.jpeg", genre: "All", isManual: true },
        { name: "Mi Credo", artist: "K-Paz De La Sierra", file: "cancionesall/K-Paz De La Sierra - Mi Credo.mp3", cover: "allportadas/kpazdelasierra.jpeg", genre: "All", isManual: true },
        { name: "Te Agradezco (Official Video)", artist: "Kany García, Carin Leon", file: "cancionesall/Kany García, Carin Leon - Te Lo Agradezco (Official Video).mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Con Ese Corazón", artist: "La Maquinaria Norteña", file: "cancionesall/La Maquinaria Norteña - Con Ese Corazón.mp3", cover: "allportadas/maquinaarianortenia.jpg", genre: "All", isManual: true },
        { name: "Por Obvias Razones", artist: "La Maquinaria Norteña", file: "cancionesall/La Maquinaria Norteña - Por Obvias Razones.mp3", cover: "allportadas/maquinaarianortenia.jpg", genre: "All", isManual: true },
        { name: "Te Quiero Ver", artist: "La Maquinaria Norteña", file: "cancionesall/La Maquinaria Norteña - Te Quiero Ver.mp3", cover: "allportadas/maquinaarianortenia.jpg", genre: "All", isManual: true },
        { name: "Pero Te Vas A Arrepentir", artist: "Los Yonic's ft. Marco Antonio Solís", file: "cancionesall/Los Yonic's - Pero Te Vas A Arrepentir (Audio) ft. Marco Antonio Solís.mp3", cover: "allportadas/los yonics.jpeg", genre: "All", isManual: true },
        { name: "Procura (Audio)", artist: "Maluma", file: "cancionesall/Maluma - Procura (Audio).mp3", cover: "allportadas/maluma.jpeg", genre: "All", isManual: true },
        { name: "Según Quién (Letra)", artist: "Maluma, Carin Leon", file: "cancionesall/Maluma, Carin Leon - Según Quién (Letra).mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Mañana Que Ya No Esté", artist: "El Trono De México", file: "cancionesall/Manana Que Ya No Este.mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "Mi Cómplice", artist: "Conjunto Primavera", file: "cancionesall/Mi Cómplice.mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "Mi Corrido", artist: "Julion Alvarez", file: "cancionesall/Mi Corrido.mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Necesito Decirte", artist: "Conjunto Primavera", file: "cancionesall/Necesito Decirte.mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "No Sé", artist: "Conjunto Primavera", file: "cancionesall/No Sé.mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "No Te Podías Quedar", artist: "Conjunto Primavera", file: "cancionesall/No Te Podías Quedar.mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "De Tanto En Lado (Videoclip Oficial)", artist: "Pablo Alborán, Carin Leon", file: "cancionesall/Pablo Alborán, Carín León - Viaje a ningún lado (Videoclip Oficial).mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Pongámonos De Acuerdo", artist: "Julión Álvarez", file: "cancionesall/Pongámonos De Acuerdo.mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Prometiste Volver", artist: "El Trono De México", file: "cancionesall/Prometiste Volver.mp3", cover: "allportadas/tronodemexico.jpeg", genre: "All", isManual: true },
        { name: "El Correcto (Video Oficial)", artist: "Reik, Carin Leon", file: "cancionesall/Reik, Carin Leon - El Correcto (Video Oficial).mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true },
        { name: "Te Lloré", artist: "Conjunto Primavera", file: "cancionesall/Te Lloré.mp3", cover: "allportadas/conjuntoprimavera.jpeg", genre: "All", isManual: true },
        { name: "Tu Postura", artist: "Banda MS", file: "cancionesall/Tu Postura.mp3", cover: "allportadas/bandams.jpeg", genre: "All", isManual: true },
        { name: "Volveré (Album Version)", artist: "K-Paz De La Sierra", file: "cancionesall/Volveré (Album Version).mp3", cover: "allportadas/kpazdelasierra.jpeg", genre: "All", isManual: true },
        { name: "Voy A Olvidarte", artist: "Julión Álvarez", file: "cancionesall/Voy A Olvidarte.mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Y Así Fue", artist: "Julión Álvarez", file: "cancionesall/Y Así Fue.mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Y Si Mejor Te Olvido", artist: "Julión Álvarez", file: "cancionesall/Y Si Mejor Te Olvido.mp3", cover: "allportadas/julionalvares.jpeg", genre: "All", isManual: true },
        { name: "Fue un Placer Conocerte (En Vivo)", artist: "Yuri, Carin Leon", file: "cancionesall/Fue un Placer Conocerte.mp3", cover: "allportadas/carinleon.jpg", genre: "All", isManual: true }
    
    ]
},





    "De fiesta": {
        name: "De fiesta",
        color: "rgba(110, 111, 99, 0.26)",
        cover: "portadas/fiesta3.jpg",
        songs: [
    { name: "Taki Taki", artist: "DJ Snake, Selena Gomez, Ozuna, Cardi B", file: "musicfiesta/DJ Snake, Selena Gomez, Ozuna, Cardi B - Taki Taki (LetraLyrics).mp3", cover: "covers/taki.jpeg", genre: "De fiesta", isManual: true },
{ name: "Baile Inolvidable", artist: "Bad Bunny", file: "musicfiesta/BAD BUNNY - BAILE INoLVIDABLE (Visualizer)  DeBÍ TiRAR MáS FOToS.mp3", cover: "covers/baile inolvidable.jpeg", genre: "De fiesta", isManual: true },
{ name: "Pepas", artist: "Farruko", file: "musicfiesta/Farruko - Pepas (Audio).mp3", cover: "covers/pepa.jpeg", genre: "De fiesta", isManual: true },
{ name: "Vivir mi vida", artist: "Marc Anthony", file: "musicfiesta/Marc Anthony - Vivir Mi Vida (Letra  Lyrics).mp3", cover: "covers/vivirmivida.jpg", genre: "De fiesta", isManual: true },
{ name: "YW&F", artist: "Oscar Maydon", file: "musicfiesta/Oscar Maydon - YW & F (Versión Reggaeton).mp3", cover: "covers/tipogatsby.jpeg", genre: "De fiesta", isManual: true },
{ name: "No se va", artist: "Grupo Frontera", file: "musicfiesta/Grupo Frontera - NO SE VA (Video Oficial).mp3", cover: "covers/noseva.jpeg", genre: "De fiesta", isManual: true },
{ name: "Perro Negro", artist: "Bad Bunny ft. Feid", file: "musicfiesta/BAD BUNNY ft. FEID - PERRO NEGRO (Visualizer)  nadie sabe lo que va a pasar mañana.mp3", cover: "covers/nadiesabe.jpeg", genre: "De fiesta", isManual: true },
{ name: "No me conoce", artist: "Jhay Cortez, J. Balvin, Bad Bunny", file: "musicfiesta/Jhay Cortez, J. Balvin, Bad Bunny - No Me Conoce (Remix).mp3", cover: "covers/nomeconoce.jpeg", genre: "De fiesta", isManual: true },
{ name: "Escandalo", artist: "La Sonora Dinamita", file: "musicfiesta/Escandalo - La Sonora Dinamita  Discos Fuentes [Audio].mp3", cover: "covers/escandalo.jpeg", genre: "De fiesta", isManual: true },
{ name: "La vida es un carnaval", artist: "Celia Cruz", file: "musicfiesta/Celia Cruz  La Vida Es un Carnaval [Letra].mp3", cover: "covers/vidacarnaval.webp", genre: "De fiesta", isManual: true },
{ name: "Devuelveme a mi chica", artist: "Hombres G", file: "musicfiesta/Devuélveme a mi chica.mp3", cover: "covers/devuelveme.jpeg", genre: "De fiesta", isManual: true },
{ name: "Oye mujer", artist: "Raymix", file: "musicfiesta/Raymix - Oye Mujer.mp3", cover: "covers/oyemujer.jpeg", genre: "De fiesta", isManual: true },
{ name: "No son de klle", artist: "Santa Fe Klan, Duki, Peso Pluma", file: "musicfiesta/SANTA FE KLAN, DUKI, PESO PLUMA - NO SON DE CALLE (Video Oficial).mp3", cover: "covers/nosondeklle.jpeg", genre: "De fiesta", isManual: true },
{ name: "Requisitos 420", artist: "Alemán & L-Gante", file: "musicfiesta/Alemán & L-Gante - Requisito 420 (Video Oficial).mp3", cover: "covers/requisitos.jpeg", genre: "De fiesta", isManual: true },
{ name: "EoO", artist: "Bad Bunny", file: "musicfiesta/BAD BUNNY - EoO (Visualizer)  DeBÍ TiRAR MáS FOToS.mp3", cover: "covers/baile inolvidable.jpeg", genre: "De fiesta", isManual: true },
{ name: "La dueña del swing", artist: "Los Hermanos Rosario", file: "musicfiesta/01 - La Dueña del Swing.mp3", cover: "covers/laduena.jpeg", genre: "De fiesta", isManual: true },
{ name: "Pasame la botella", artist: "Match & Daddy", file: "musicfiesta/La Botella.mp3", cover: "covers/labotellamachydaddy.jpeg", genre: "De fiesta", isManual: true },
{ name: "Agua", artist: "Tainy, J. Balvin", file: "musicfiesta/Tainy, J. Balvin - Agua.mp3", cover: "covers/aguajbalbin.jpeg", genre: "De fiesta", isManual: true },
{ name: "PV", artist: "Victor Mendivil & Fenix Flexin", file: "musicfiesta/P.V - Victor Mendivil & Fenix Flexin (Audio Oficial).mp3", cover: "covers/pvvictormrndevil.jpg", genre: "De fiesta", isManual: true },
{ name: "Me queda un X100TO", artist: "Grupo Frontera x Bad Bunny", file: "musicfiesta/Grupo Frontera x Bad Bunny - UN X100TO (Video Oficial).mp3", cover: "covers/mequeda.jpeg", genre: "De fiesta", isManual: true },
{ name: "Bailando", artist: "Enrique Iglesias ft. Descemer Bueno, Gente De Zona", file: "musicfiesta/Enrique Iglesias  Bailando (Lyrics) feat. Descemer Bueno, Gente De Zona.mp3", cover: "covers/bailandoenriqueiglesias.jpg", genre: "De fiesta", isManual: true },
{ name: "Mejores Jordan", artist: "Victor Mendivil x Oscar Maydon", file: "musicfiesta/VICTOR MENDIVIL X OSCAR MAYDON -  MEJORES JORDANS.mp3", cover: "covers/mejoresjordanoscarmaidon.jpg", genre: "De fiesta", isManual: true },
{ name: "Madonna", artist: "Natanael Cano x Oscar Maydon", file: "musicfiesta/Natanael Cano X Oscar Maydon - Madonna  [Official Video].mp3", cover: "covers/madonnanatanael.jpeg", genre: "De fiesta", isManual: true },
{ name: "Efecto", artist: "Bad Bunny", file: "musicfiesta/Bad Bunny - Efecto (360 Visualizer)  Un Verano Sin Ti.mp3", cover: "covers/otro atardecer.jpeg", genre: "De fiesta", isManual: true },
{ name: "Pues que le hago", artist: "Chuyin", file: "musicfiesta/download.mp3", cover: "covers/puesque.jpeg", genre: "De fiesta", isManual: true },
{ name: "Give Me Everything", artist: "Pitbull", file: "musicfiesta/Give Me Everything - Pitbull, Ne-Yo, AFROJACK, Nayer (Sub. Español  Lyrics).mp3", cover: "covers/Pitbull_-_Give_Me_Everything.jpg", genre: "De fiesta", isManual: true },
{ name: "Preview", artist: "Bad Bunny", file: "musicfiesta/Bad Bunny - UN PREVIEW (Letra).mp3", cover: "covers/preview.jpeg", genre: "De fiesta", isManual: true },
{ name: "I Gotta Feeling", artist: "The Black Eyed Peas", file: "musicfiesta/The Black Eyed Peas  I Gotta Feeling [Letra en Español].mp3", cover: "covers/pitbulll.jpeg", genre: "De fiesta", isManual: true },
{ name: "La curiosidad", artist: "Oscar Maydon ft. Natanael Cano & Gabito Ballesteros", file: "musicfiesta/Jay Wheeler - La Curiosidad RMX Blue - Myke Towers, Jhay Cortez, Rauw Alejandro, Lunay, Kendo.mp3", cover: "covers/lacuriosidad.jpeg", genre: "De fiesta", isManual: true },
{ name: "Tipo gatsby", artist: "Oscar Maydon ft. Natanael Cano & Gabito Ballesteros", file: "musicfiesta/Tipo Gatsby - (Ft. Natanael Cano & Gabito Ballesteros) Oscar Maydon.mp3", cover: "covers/tipogatsby.jpeg", genre: "De fiesta", isManual: true },
{ name: "911 remix", artist: "Sech, Jhay Cortez", file: "musicfiesta/Sech, Jhay Cortez - 911 (Remix).mp3", cover: "covers/911remix.jpeg", genre: "De fiesta", isManual: true },
{ name: "Me jalo", artist: "Grupo Frontera, Fuerza Regida", file: "musicfiesta/Grupo Frontera, Fuerza Regida - ME JALO (Letra Oficial).mp3", cover: "covers/mejalofuerzaregid.jpeg", genre: "De fiesta", isManual: true },
{ name: "Fin de semana", artist: "Oscar Maydon x Junior H", file: "musicfiesta/Oscar Maydon x Junior H - Fin De Semana (LetraLyrics).mp3", cover: "covers/finde.jpg", genre: "De fiesta", isManual: true }
]
    }
};





// ==========================================
// VARIABLES DE ESTADO
// ==========================================
const playlistCovers = [
    "#FF6B6B", // Rojo coral
    "#4ECDC4", // Verde menta
    "#45B7D1", // Azul cielo
    "#F7DC6F", // Amarillo mostaza
    "#BB8FCE", // Púrpura
    "#82E0AA", // Verde claro
    "#F8C471", // Naranja
    "#85C1E9", // Azul claro
    "#D2B4DE", // Lavanda
    "#A3E4D7", // Verde agua
    "#F1948A", // Rosa
    "#73C6B6", // Verde jade
    "#D7BDE2", // Lila
    "#F9E79F", // Amarillo suave
    "#AED6F1", // Celeste
    "#F5B7B1", // Rosa pálido
    "#A9DFBF", // Verde menta claro
    "#EDBB99", // Durazno
    "#C39BD3", // Morado
    "#7FB3D8"  // Azul acero
];

let currentIndex = -1;
let currentView = "all";
let currentPlaylistName = null;
let currentAlbum = null;
let currentGenre = null;
let currentAlbumIndex = -1;
let isPlayingFromAlbum = false;
let playlists = JSON.parse(localStorage.getItem("musicPlayerPlaylists")) || {};
let registros = JSON.parse(localStorage.getItem("registros")) || [];

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================
const $ = selector => document.querySelector(selector);

function normalize(text = "") {
    return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatTime(seconds = 0) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function savePlaylists() {
    localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists));
}

function saveGenrePlaylists() {
    localStorage.setItem("musicPlayerGenrePlaylists", JSON.stringify(genrePlaylists));
}

function loadGenrePlaylists() {
    const saved = localStorage.getItem("musicPlayerGenrePlaylists");
    if (!saved) return;

    try {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(genre => {
            if (genrePlaylists[genre]) {
                genrePlaylists[genre].songs = parsed[genre].songs.filter(song => song.isManual);
            }
        });
    } catch {
        localStorage.removeItem("musicPlayerGenrePlaylists");
    }
}

function showNotification(message, type = "info") {
    const oldNotification = document.querySelector(".notification");
    if (oldNotification) oldNotification.remove();

    const colors = {
        success: "#fa2d48",
        error: "#ff4757",
        warning: "#f7b731",
        info: "#2d98da"
    };

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 18px;
        right: 18px;
        z-index: 99999;
        padding: 14px 20px;
        border-radius: 999px;
        color: white;
        font-size: 14px;
        font-weight: 700;
        background: ${colors[type] || colors.info};
        box-shadow: 0 18px 35px rgba(0,0,0,.35);
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2400);
}

function getSongId(song) {
    return `${song.name}-${song.artist}`.toLowerCase();
}

function getAllSongs() {
    const allSongs = [];

    songs.forEach((song, index) => {
        allSongs.push({ ...song, index, source: "independent", isFromAlbum: false });
    });

    Object.keys(albums).forEach(albumName => {
        albums[albumName].songs.forEach((song, index) => {
            allSongs.push({ ...song, index, albumName, source: "album", isFromAlbum: true });
        });
    });

    return allSongs;
}

function emptyState(text) {
    return `
        <div class="playlist-item" style="grid-column:1/-1;">
            <div>
                <i class="fas fa-music"></i>
                <span>${text}</span>
                <div class="song-count">Intenta buscar otra canción.</div>
            </div>
        </div>
    `;
}

// ==========================================
// GESTIÓN DE PLAYLISTS
// ==========================================
function loadPlaylists() {
    const saved = localStorage.getItem("musicPlayerPlaylists");
    if (saved) {
        try {
            playlists = JSON.parse(saved);
        } catch (e) {
            console.error("Error al cargar playlists:", e);
            playlists = {};
        }
    } else {
        playlists = {};
    }
}

// ==========================================
// NAVEGACIÓN Y VISTAS
// ==========================================
function createNavButtons() {
    const buttons = [
    { id: "allBtn", text: `<i class="fas fa-house"></i> Inicio`, view: "all" },
    { id: "albumsBtn", text: `<i class="fas fa-compact-disc"></i> Álbumes`, view: "albums" },
    { id: "playlistsBtn", text: `<i class="fas fa-headphones"></i> Playlists`, view: "playlists" },
    { id: "recordsBtn", text: `<i class="fas fa-user-plus"></i> Registros`, view: "records" }
];

    navButtons.innerHTML = buttons.map(btn => `
        <button class="nav-btn" id="${btn.id}" data-view="${btn.view}">${btn.text}</button>
    `).join("");

    navButtons.addEventListener("click", e => {
        const button = e.target.closest(".nav-btn");
        if (!button) return;

        const view = button.dataset.view;
        if (view === "new") {
            showCreatePlaylistModal();
            return;
        }

        switchView(view);
    });

    updateActiveNavButton();
}

function updateActiveNavButton() {
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

    if (currentView === "all" || currentView === "genre") $("#allBtn")?.classList.add("active");
    if (currentView === "albums" || currentView === "album") $("#albumsBtn")?.classList.add("active");
    if (currentView === "playlists" || currentView === "playlist") $("#playlistsBtn")?.classList.add("active");
    if (currentView === "records") {
    document.getElementById("recordsBtn")?.classList.add("active");
}
}

function switchView(view) {
    currentView = view;
    currentPlaylistName = null;
    currentAlbum = null;
    currentGenre = null;
    searchInput.value = "";
    
    loadPlaylists();
    renderCatalog();
    updateActiveNavButton();
}

// ==========================================
// RENDERIZADO DEL CATÁLOGO
// ==========================================
function renderCatalog(filter = "") {
    catalog.innerHTML = "";

    if (currentView === "all") renderGenrePlaylists();
    if (currentView === "albums") renderAlbumList(filter);
    if (currentView === "album") renderAlbumSongs(filter);
    if (currentView === "playlists") renderPlaylistList();
    if (currentView === "playlist") renderPlaylistSongs(filter);
    if (currentView === "genre") renderGenreSongs(filter);
    if (currentView === "records") renderRegistros();
}



// ==========================================
// REGISTROS DE USUARIOS
// ==========================================

function saveRegistros() {
    localStorage.setItem("registros", JSON.stringify(registros));
}

function renderRegistros() {
    catalog.innerHTML = `
        <div class="playlist-title">
            <div>
                <h3>
                    <i class="fas fa-user-plus"></i>
                    Registro de usuarios
                </h3>
                <p>Agrega usuarios y guarda sus datos en el navegador.</p>
            </div>
        </div>

        <div class="registro-container">

            <form id="registroForm" class="registro-form">

                <input
                    type="text"
                    id="registroNombre"
                    placeholder="Nombre"
                    required
                >

                <input
                    type="email"
                    id="registroCorreo"
                    placeholder="Correo electrónico"
                    required
                >

                <button type="submit">
                    <i class="fas fa-save"></i>
                    Registrar
                </button>

            </form>

            <div id="registrosLista"></div>

        </div>
    `;

    const form = document.getElementById("registroForm");

    form.addEventListener("submit", registrarUsuario);

    mostrarRegistros();
}

function registrarUsuario(event) {
    event.preventDefault();

    const nombre = document.getElementById("registroNombre").value.trim();
    const correo = document.getElementById("registroCorreo").value.trim();

    if (!nombre || !correo) {
        showNotification("Completa todos los campos", "error");
        return;
    }

    const nuevoRegistro = {
        nombre: nombre,
        correo: correo
    };

    registros.push(nuevoRegistro);

    saveRegistros();

    event.target.reset();

    mostrarRegistros();

    showNotification("Registro guardado correctamente", "success");
}

function mostrarRegistros() {
    const lista = document.getElementById("registrosLista");

    if (!lista) return;

    if (registros.length === 0) {
        lista.innerHTML = `
            <p>
                No hay registros todavía.
            </p>
        `;
        return;
    }

    lista.innerHTML = "";

    registros.forEach((registro, index) => {

        const item = document.createElement("div");

        item.className = "registro-item";

        item.innerHTML = `
            <div>
                <strong>${registro.nombre}</strong>
                <span>${registro.correo}</span>
            </div>

            <span>#${index + 1}</span>
        `;

        lista.appendChild(item);
    });
}

function renderGenrePlaylists() {
    catalog.innerHTML = `
        <div class="playlist-title">
            <div>
                <h3><i class="fas fa-music"></i> Explorar por género</h3>
                <p>Elige el mood que quieres escuchar.</p>
            </div>
        </div>
    `;

    Object.keys(genrePlaylists).forEach(genreName => {
        const genre = genrePlaylists[genreName];
        const item = document.createElement("div");
        item.className = "genre-container";
        item.style.background = `linear-gradient(135deg, ${genre.color}, rgba(0,0,0,.35))`;
        item.innerHTML = `
            <img src="${genre.cover}" class="genre-cover" alt="${genre.name}">
            <div class="genre-title"><i class="fas fa-headphones"></i>${genre.name}</div>
            <div class="genre-count">${genre.songs.length} canciones</div>
            <button class="genre-play-btn"><i class="fas fa-play"></i> Ver canciones</button>
        `;

        item.addEventListener("click", () => {
            currentView = "genre";
            currentGenre = genreName;
            renderCatalog();
            updateActiveNavButton();
        });

        catalog.appendChild(item);
    });
}

function renderAlbumList(filter = "") {
    const query = normalize(filter);

    catalog.innerHTML = `
        <div class="playlist-title">
            <div>
                <h3><i class="fas fa-compact-disc"></i> Álbumes</h3>
                <p>Tus discos guardados.</p>
            </div>
        </div>
    `;

    Object.keys(albums)
        .filter(albumName => {
            const album = albums[albumName];
            return normalize(album.name).includes(query) || normalize(album.artist).includes(query);
        })
        .forEach(albumName => {
            const album = albums[albumName];
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${album.cover}" alt="${album.name}" loading="lazy">
                <span>${album.name}</span>
                <span class="artist">${album.artist}</span>
                <span class="album">${album.songs.length} canciones${album.year ? ` • ${album.year}` : ""}</span>
                <div class="play-icon"><i class="fas fa-arrow-right"></i></div>
            `;

            card.addEventListener("click", () => {
                currentView = "album";
                currentAlbum = albumName;
                renderCatalog();
                updateActiveNavButton();
            });

            catalog.appendChild(card);
        });
}

function renderAlbumSongs(filter = "") {
    if (!currentAlbum || !albums[currentAlbum]) return;

    const album = albums[currentAlbum];
    const query = normalize(filter);

    catalog.innerHTML = `
        <div class="playlist-title">
            <div style="display:flex;align-items:center;gap:14px;">
                <button id="backToAlbumsBtn"><i class="fas fa-arrow-left"></i></button>
                <img src="${album.cover}" alt="${album.name}" style="width:62px;height:62px;border-radius:14px;object-fit:cover;">
                <div>
                    <h3>${album.name}</h3>
                    <p>${album.artist} • ${album.songs.length} canciones${album.year ? ` • ${album.year}` : ""}</p>
                </div>
            </div>
            <button id="playAllBtn"><i class="fas fa-play"></i> Reproducir todo</button>
        </div>
    `;

    $("#backToAlbumsBtn").onclick = () => switchView("albums");
    $("#playAllBtn").onclick = () => playAlbumSong(0, currentAlbum);

    album.songs
        .filter(song => normalize(song.name).includes(query) || normalize(song.artist).includes(query))
        .forEach((song, index) => catalog.appendChild(createSongCard(song, index, true)));
}

function renderGenreSongs(filter = "") {
    if (!currentGenre || !genrePlaylists[currentGenre]) return;

    const genre = genrePlaylists[currentGenre];
    const query = normalize(filter);

    catalog.innerHTML = `
        <div class="playlist-title" style="background:linear-gradient(135deg,${genre.color},rgba(0,0,0,.38));">
            <div style="display:flex;align-items:center;gap:14px;">
                <button id="backToGenresBtn"><i class="fas fa-arrow-left"></i></button>
                <div>
                    <h3>${genre.name}</h3>
                    <p>${genre.songs.length} canciones</p>
                </div>
            </div>
            <button id="playAllGenreBtn"><i class="fas fa-play"></i> Reproducir todo</button>
        </div>
    `;

    $("#backToGenresBtn").onclick = () => switchView("all");
    $("#playAllGenreBtn").onclick = () => playGenreSong(0);

    const filtered = genre.songs.filter(song => normalize(song.name).includes(query) || normalize(song.artist).includes(query));

    if (!filtered.length) {
        catalog.insertAdjacentHTML("beforeend", emptyState("No hay canciones en este género"));
        return;
    }

    filtered.forEach(song => {
        const originalIndex = genre.songs.findIndex(
            s => getSongId(s) === getSongId(song)
        );

        catalog.appendChild(
            createSongCard(song, originalIndex, song.isFromAlbum, true)
        );
    });
}

function renderPlaylistList() {
    catalog.innerHTML = `
        <div class="playlist-title">
            <div>
                <h3><i class="fas fa-headphones"></i> Mis Playlists</h3>
                <p>Crea listas personalizadas.</p>
            </div>
        </div>
    `;

    const createCard = document.createElement("div");
    createCard.className = "playlist-item create-playlist";
    createCard.innerHTML = `
        <div>
            <i class="fas fa-plus-circle"></i>
            <span>Crear playlist</span>
        </div>
    `;
    createCard.onclick = showCreatePlaylistModal;
    catalog.appendChild(createCard);

    const playlistNames = Object.keys(playlists);
    
    if (playlistNames.length === 0) {
        catalog.insertAdjacentHTML("beforeend", `
            <div class="playlist-item" style="grid-column:1/-1;">
                <div>
                    <i class="fas fa-headphones"></i>
                    <span>No tienes playlists aún</span>
                    <div class="song-count">Crea una para empezar.</div>
                </div>
            </div>
        `);
        return;
    }

    const icons = [
        "fa-music", "fa-headphones", "fa-heart", "fa-star", 
        "fa-fire", "fa-bolt", "fa-gem", "fa-crown",
        "fa-ghost", "fa-skull", "fa-rocket", "fa-dragon",
        "fa-feather", "fa-moon", "fa-sun", "fa-cloud",
        "fa-umbrella", "fa-pizza-slice", "fa-gamepad", "fa-guitar"
    ];

    playlistNames.forEach((name, index) => {
        const playlist = playlists[name];
        const songCount = playlist.songs ? playlist.songs.length : 0;
        
        // Usar color guardado, o asignar uno nuevo
        let savedColor = playlist.cover;
        if (!savedColor) {
            savedColor = playlistCovers[Math.floor(Math.random() * playlistCovers.length)];
            playlists[name].cover = savedColor;
        }
        
        // Usar ícono guardado, o asignar uno nuevo
        let savedIcon = playlist.icon;
        if (!savedIcon) {
            savedIcon = icons[Math.floor(Math.random() * icons.length)];
            playlists[name].icon = savedIcon;
        }
        
        // Guardar si se asignó algo nuevo
        if (!playlist.cover || !playlist.icon) {
            savePlaylists();
        }

        const item = document.createElement("div");
        item.className = "playlist-item";
        
        item.innerHTML = `
            <div style="background:${savedColor};width:100%;aspect-ratio:1;border-radius:12px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;cursor:pointer;box-sizing:border-box;">
                <div style="z-index:2;position:relative;">
                    <i class="fas ${savedIcon}" style="font-size:48px;color:rgba(255,255,255,0.4);"></i>
                </div>
                <div style="position:relative;z-index:2;width:100%;">
                    <h3 style="color:white;font-size:18px;font-weight:700;margin:0 0 5px 0;word-break:break-word;text-shadow:0 2px 4px rgba(0,0,0,0.3);">${name}</h3>
                    <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:0;text-shadow:0 1px 3px rgba(0,0,0,0.3);">${songCount} canciones</p>
                </div>
            </div>
        `;

        item.addEventListener("click", () => {
            currentView = "playlist";
            currentPlaylistName = name;
            renderCatalog();
            updateActiveNavButton();
        });

        catalog.appendChild(item);
    });
}

function renderPlaylistSongs(filter = "") {
    if (!currentPlaylistName || !playlists[currentPlaylistName]) {
        switchView("playlists");
        return;
    }

    const playlist = playlists[currentPlaylistName];
    const songsList = playlist.songs || [];
    const query = normalize(filter);

    catalog.innerHTML = `
        <div class="playlist-title">
            <div style="display:flex;align-items:center;gap:14px;">
                <button id="backToPlaylistsBtn"><i class="fas fa-arrow-left"></i></button>
                <div>
                    <h3>${currentPlaylistName}</h3>
                    <p>${songsList.length} canciones</p>
                </div>
            </div>
            <button id="deletePlaylistBtn"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
    `;

    $("#backToPlaylistsBtn").addEventListener("click", () => switchView("playlists"));
    $("#deletePlaylistBtn").addEventListener("click", deleteCurrentPlaylist);

    if (!songsList.length) {
        catalog.insertAdjacentHTML("beforeend", emptyState("Esta playlist está vacía"));
        return;
    }

    songsList.forEach((item, index) => {
        if (!item.song) return;
        
        if (query && !normalize(item.song.name).includes(query) && !normalize(item.song.artist).includes(query)) {
            return;
        }

        const card = createSongCard(item.song, index, item.isFromAlbum);
        
        const addBtn = card.querySelector(".add-to-playlist-btn");
        if (addBtn) addBtn.remove();

        const remove = document.createElement("button");
        remove.className = "remove-from-playlist-btn";
        remove.innerHTML = `<i class="fas fa-times"></i>`;
        remove.title = "Quitar de playlist";
        remove.addEventListener("click", (e) => {
            e.stopPropagation();
            removeSongFromPlaylist(index);
        });

       card.addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    playSongFromPlaylist(item, index);  // pasar índice
});

        catalog.appendChild(card);
    });
}

function createSongCard(song, index, isFromAlbum = false, isGenre = false) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animation = "fadeIn .35s ease";

    card.innerHTML = `
        <img src="${song.cover}" alt="${song.name}" loading="lazy">
        <span>${song.name}</span>
        <span class="artist">${song.artist}</span>
        ${song.albumName ? `<span class="album">${song.albumName}</span>` : ""}
        <button class="add-to-playlist-btn" title="Agregar"><i class="fas fa-plus"></i></button>
        <div class="play-icon"><i class="fas fa-play"></i></div>
    `;

    card.onclick = e => {
        if (e.target.closest("button")) return;

        if (isGenre) {
            playGenreSong(index);
        } else if (isFromAlbum) {
            playSong(index, true);
        } else {
            playSong(index, false);
        }
    };

    const addBtn = card.querySelector(".add-to-playlist-btn");
    addBtn.onclick = e => {
        e.stopPropagation();
        showAddToPlaylistModal(song, index, isFromAlbum);
    };

    return card;
}

// ==========================================
// REPRODUCCIÓN DE MÚSICA
// ==========================================
function playSong(index, isFromAlbum = false) {
    let song;

    if (isFromAlbum && currentAlbum) {
        const album = albums[currentAlbum];
        if (!album || !album.songs[index]) return;

        song = album.songs[index];
        currentAlbumIndex = index;
        isPlayingFromAlbum = true;
    } else {
        if (!songs[index]) return;

        song = songs[index];
        currentIndex = index;
        isPlayingFromAlbum = false;
        currentAlbum = null;
    }

    startPlayback(song);
}

function playAlbumSong(index, albumName) {
    const album = albums[albumName];
    if (!album || !album.songs[index]) return;

    // Limpiar contexto de playlist (porque ahora estás en un álbum)
    currentPlaylistSource = null;
    currentPlaylistNameActive = null;
    currentPlaylistSongs = [];

    currentAlbum = albumName;
    currentAlbumIndex = index;
    isPlayingFromAlbum = true;

    startPlayback(album.songs[index]);
}

function playGenreSong(index) {
    const genre = genrePlaylists[currentGenre];
    if (!genre || !genre.songs[index]) return;

    const song = genre.songs[index];
    
    // Guardar contexto de playlist
    currentPlaylistSource = 'genre';
    currentPlaylistNameActive = currentGenre;
    currentPlaylistSongs = genre.songs;
    currentPlaylistIndex = index;

    if (song.isFromAlbum && song.albumName) {
        playAlbumSong(song.index, song.albumName);
    } else {
        currentIndex = index;
        isPlayingFromAlbum = false;
        currentAlbum = null;
        startPlayback(song);
    }
}

function playSongFromPlaylist(item, index) {
    // Guardar contexto de playlist
    currentPlaylistSource = 'playlist';
    currentPlaylistNameActive = currentPlaylistName;
    currentPlaylistSongs = playlists[currentPlaylistName].songs.map(s => s.song);
    currentPlaylistIndex = index;

    if (item.isFromAlbum && item.albumName) {
        playAlbumSong(item.index, item.albumName);
    } else {
        isPlayingFromAlbum = false;
        currentAlbum = null;
        startPlayback(item.song);
    }
}

function startPlayback(song) {
    if (!audio) {
        showNotification("Error: Reproductor no disponible", "error");
        return;
    }

    audio.src = encodeURI(song.file);  // ✅ ASÍ funciona
    audio.load();

    updatePlayerInfo(song);
    showMiniPlayer();

    audio.play()
        .then(() => updatePlayButtons(true))
        .catch((err) => {
            console.error("Error:", err);
            showNotification("No se pudo reproducir la canción", "error");
        });
}

function updatePlayerInfo(song) {
    songName.textContent = song.name;
    artist.textContent = song.artist;
    coverImg.src = song.cover;

    const miniName = $("#miniPlayerSongName");
    const miniArtist = $("#miniPlayerArtist");
    const miniCover = $("#miniPlayerCover");

    if (miniName) miniName.textContent = song.name;
    if (miniArtist) miniArtist.textContent = song.artist;
    if (miniCover) miniCover.src = song.cover;
}

function updatePlayButtons(isPlaying) {
    const icon = isPlaying ? "pause" : "play";

    playBtn.innerHTML = `<i class="fas fa-${icon}"></i>`;

    const miniPlayBtn = $("#miniPlayerPlayBtn");
    if (miniPlayBtn) miniPlayBtn.innerHTML = `<i class="fas fa-${icon}"></i>`;

    cover.classList.toggle("playing", isPlaying);
}

function nextSong() {
    // Si estamos reproduciendo desde una playlist (género o playlist personal)
    if (currentPlaylistSource && currentPlaylistSongs.length > 0) {
        currentPlaylistIndex = (currentPlaylistIndex + 1) % currentPlaylistSongs.length;
        const nextSongData = currentPlaylistSongs[currentPlaylistIndex];
        
        if (currentPlaylistSource === 'genre') {
            playGenreSong(currentPlaylistIndex);
        } else if (currentPlaylistSource === 'playlist') {
            const playlist = playlists[currentPlaylistNameActive];
            if (playlist && playlist.songs[currentPlaylistIndex]) {
                playSongFromPlaylist(playlist.songs[currentPlaylistIndex], currentPlaylistIndex);
            }
        }
        return;
    }
    
    // Si estamos en un álbum
    if (isPlayingFromAlbum && currentAlbum) {
        const album = albums[currentAlbum];
        if (!album || !album.songs.length) return;
        currentAlbumIndex = (currentAlbumIndex + 1) % album.songs.length;
        playAlbumSong(currentAlbumIndex, currentAlbum);
        return;
    }
    
    // Modo normal (canciones independientes)
    if (!songs.length) return;
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
}

function prevSong() {
    // Si estamos reproduciendo desde una playlist (género o playlist personal)
    if (currentPlaylistSource && currentPlaylistSongs.length > 0) {
        currentPlaylistIndex = (currentPlaylistIndex - 1 + currentPlaylistSongs.length) % currentPlaylistSongs.length;
        const prevSongData = currentPlaylistSongs[currentPlaylistIndex];
        
        if (currentPlaylistSource === 'genre') {
            playGenreSong(currentPlaylistIndex);
        } else if (currentPlaylistSource === 'playlist') {
            const playlist = playlists[currentPlaylistNameActive];
            if (playlist && playlist.songs[currentPlaylistIndex]) {
                playSongFromPlaylist(playlist.songs[currentPlaylistIndex], currentPlaylistIndex);
            }
        }
        return;
    }
    
    // Si estamos en un álbum
    if (isPlayingFromAlbum && currentAlbum) {
        const album = albums[currentAlbum];
        if (!album || !album.songs.length) return;
        currentAlbumIndex = (currentAlbumIndex - 1 + album.songs.length) % album.songs.length;
        playAlbumSong(currentAlbumIndex, currentAlbum);
        return;
    }
    
    // Modo normal (canciones independientes)
    if (!songs.length) return;
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
}

function togglePlay() {
    if (!audio || !audio.src) return;

    if (audio.paused) {
        audio.play().then(() => updatePlayButtons(true));
    } else {
        audio.pause();
        updatePlayButtons(false);
    }
}

// ==========================================
// MINI PLAYER
// ==========================================
function createMiniPlayer() {
    if ($("#miniPlayer")) return;

    const mini = document.createElement("div");
    mini.id = "miniPlayer";
    mini.className = "mini-player";
    mini.style.display = "none";

    mini.innerHTML = `
        <div class="mini-player-content">
            <div class="mini-player-left">
                <div class="mini-cover-wrapper">
                    <img id="miniPlayerCover" src="covers/cover1.jpg" alt="Portada" class="mini-player-cover">
                </div>
                <div class="mini-player-info">
                    <h4 id="miniPlayerSongName">Selecciona una canción</h4>
                    <p id="miniPlayerArtist">Reproductor local</p>
                    <div class="mini-player-time">
                        <span id="miniCurrentTime">0:00</span>
                        <span class="time-divider">•</span>
                        <span id="miniTotalTime">0:00</span>
                    </div>
                </div>
            </div>
            <div class="mini-player-center">
                <div class="mini-player-controls">
                    <button id="miniPlayerPrevBtn" class="mini-player-btn" title="Anterior">
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button id="miniPlayerPlayBtn" class="mini-player-btn play-btn" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button id="miniPlayerNextBtn" class="mini-player-btn" title="Siguiente">
                        <i class="fas fa-step-forward"></i>
                    </button>
                </div>
                <input type="range" id="miniPlayerProgress" value="0" min="0" max="100" class="mini-player-progress">
            </div>
            <div class="mini-player-right">
                <button id="closeMiniPlayerBtn" class="mini-player-close" title="Cerrar">
                    <i class="fas fa-xmark"></i>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(mini);

    $("#miniPlayerPlayBtn").onclick = togglePlay;
    $("#miniPlayerPrevBtn").onclick = prevSong;
    $("#miniPlayerNextBtn").onclick = nextSong;
    $("#closeMiniPlayerBtn").onclick = stopPlayer;

    $("#miniPlayerProgress").addEventListener("input", e => {
        if (!audio || !audio.duration) return;
        audio.currentTime = (Number(e.target.value) / 100) * audio.duration;
    });
}

function showMiniPlayer() {
    const mini = $("#miniPlayer");
    if (!mini) return;
    
    mini.style.display = "block";
    requestAnimationFrame(() => {
        mini.style.opacity = "1";
        mini.style.transform = "translateY(0)";
    });
}

function hideMiniPlayer() {
    const mini = $("#miniPlayer");
    if (!mini) return;

    mini.style.opacity = "0";
    mini.style.transform = "translateY(120px)";

    setTimeout(() => {
        mini.style.display = "none";
    }, 300);
}

function forceHideBigPlayer() {
    if (player) {
        player.style.display = "none";
        player.style.visibility = "hidden";
        player.style.opacity = "0";
        player.style.pointerEvents = "none";
        player.setAttribute("aria-hidden", "true");
    }

    const library = document.querySelector(".library");
    if (library) library.style.width = "100%";
}

function stopPlayer() {
    if (!audio) return;
    
    audio.pause();
    audio.removeAttribute("src");
    audio.load();

    currentIndex = -1;
    currentAlbumIndex = -1;
    isPlayingFromAlbum = false;
    currentAlbum = null;
    
    // JIJIIJA
    currentPlaylistSource = null;
    currentPlaylistNameActive = null;
    currentPlaylistSongs = [];
    currentPlaylistIndex = -1;

    updatePlayButtons(false);
    hideMiniPlayer();
    forceHideBigPlayer();

    songName.textContent = "Selecciona una canción";
    artist.textContent = "Reproductor local";
    coverImg.src = "covers/cover1.jpg";

    const miniName = $("#miniPlayerSongName");
    const miniArtist = $("#miniPlayerArtist");
    const miniCover = $("#miniPlayerCover");

    if (miniName) miniName.textContent = "Selecciona una canción";
    if (miniArtist) miniArtist.textContent = "Reproductor local";
    if (miniCover) miniCover.src = "covers/cover1.jpg";
}
// ==========================================
// MODALES
// ==========================================
function createModals() {
    document.body.insertAdjacentHTML("beforeend", `
        <div id="createPlaylistModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus-circle"></i> Crear Playlist</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Nombre de la playlist:</label>
                        <input type="text" id="playlistNameInput" placeholder="Ej: Mis favoritas" maxlength="30">
                        <div class="char-counter" id="charCounter">0/30</div>
                    </div>
                    <div class="form-actions">
                        <button class="btn-secondary">Cancelar</button>
                        <button id="confirmCreatePlaylistBtn" class="btn-primary" disabled>Crear</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="addToPlaylistModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> Agregar a Playlist</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="song-info-modal">
                        <img id="modalSongCover" src="" alt="Portada" style="width:60px;height:60px;border-radius:12px;object-fit:cover;">
                        <div>
                            <h4 id="modalSongName"></h4>
                            <p id="modalSongArtist"></p>
                        </div>
                    </div>
                    <div id="playlistsList" class="playlists-list"></div>
                    <div class="form-actions">
                        <button class="btn-secondary">Cancelar</button>
                        <button id="createNewPlaylistFromModalBtn" class="btn-primary"><i class="fas fa-plus"></i> Nueva</button>
                    </div>
                </div>
            </div>
        </div>
    `);

    document.body.addEventListener("click", e => {
        if (e.target.classList.contains("modal")) e.target.style.display = "none";
        if (e.target.closest(".close-modal") || e.target.closest(".btn-secondary")) {
            document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
        }
    });

    const input = $("#playlistNameInput");
    const counter = $("#charCounter");
    const confirmBtn = $("#confirmCreatePlaylistBtn");

    input.addEventListener("input", () => {
        const length = input.value.trim().length;
        counter.textContent = `${length}/30`;
        confirmBtn.disabled = length === 0;
    });

    confirmBtn.onclick = () => {
        const name = input.value.trim();
        if (!name) return;

        if (playlists[name]) {
            showNotification("Ya existe una playlist con ese nombre", "warning");
            return;
        }

        const icons = [
    "fa-music", "fa-headphones", "fa-heart", "fa-star", 
    "fa-fire", "fa-bolt", "fa-gem", "fa-crown",
    "fa-ghost", "fa-skull", "fa-rocket", "fa-dragon",
    "fa-feather", "fa-moon", "fa-sun", "fa-cloud",
    "fa-umbrella", "fa-pizza-slice", "fa-gamepad", "fa-guitar"
];

playlists[name] = {
    songs: [],
    cover: playlistCovers[Math.floor(Math.random() * playlistCovers.length)],
    icon: icons[Math.floor(Math.random() * icons.length)]
};
        savePlaylists();

        $("#createPlaylistModal").style.display = "none";
        input.value = "";
        counter.textContent = "0/30";
        confirmBtn.disabled = true;

        showNotification(`Playlist "${name}" creada`, "success");

        if (currentView === "playlists") renderPlaylistList();
    };

    $("#createNewPlaylistFromModalBtn").onclick = () => {
        $("#addToPlaylistModal").style.display = "none";
        showCreatePlaylistModal();
    };
}

function showCreatePlaylistModal() {
    const modal = $("#createPlaylistModal");
    if (!modal) return;

    modal.style.display = "flex";
    setTimeout(() => $("#playlistNameInput")?.focus(), 80);
}

function showAddToPlaylistModal(song, index, isFromAlbum = false) {
    $("#modalSongCover").src = song.cover;
    $("#modalSongName").textContent = song.name;
    $("#modalSongArtist").textContent = song.artist;

    const list = $("#playlistsList");
    list.innerHTML = "";

    const playlistNames = Object.keys(playlists);

    if (!playlistNames.length) {
        list.innerHTML = `
            <div class="empty-playlists">
                <i class="fas fa-headphones"></i>
                <p>No tienes playlists creadas.</p>
            </div>
        `;
    }

    playlistNames.forEach(name => {
        const item = document.createElement("div");
        item.className = "playlist-item-modal";
        
        const songCount = playlists[name].songs ? playlists[name].songs.length : 0;
        
        item.innerHTML = `
            <div class="playlist-info">
                <div class="playlist-icon"><i class="fas fa-music"></i></div>
                <div class="playlist-details">
                    <h4>${name}</h4>
                    <p>${songCount} canciones</p>
                </div>
            </div>
            <div class="song-count-badge">Agregar</div>
        `;

        item.onclick = () => {
            addSongToPlaylistInModal(song, index, name, isFromAlbum);
            $("#addToPlaylistModal").style.display = "none";
        };

        list.appendChild(item);
    });

    $("#addToPlaylistModal").style.display = "flex";
}

function addSongToPlaylistInModal(song, index, playlistName, isFromAlbum = false) {
    const id = isFromAlbum
        ? `album_${currentAlbum || song.albumName}_${index}_${song.name}`
        : `song_${index}_${song.name}`;

    if (!playlists[playlistName].songs) {
        playlists[playlistName].songs = [];
    }

    const exists = playlists[playlistName].songs.some(item => item.id === id);

    if (exists) {
        showNotification("Esta canción ya está en la playlist", "warning");
        return;
    }

    playlists[playlistName].songs.push({
        id,
        song,
        index,
        isFromAlbum,
        albumName: isFromAlbum ? currentAlbum || song.albumName : null
    });

    savePlaylists();
    showNotification(`"${song.name}" agregada a "${playlistName}"`, "success");

    if (currentView === "playlist" && currentPlaylistName === playlistName) {
        renderCatalog(searchInput.value);
    }
}

function removeSongFromPlaylist(index) {
    if (!currentPlaylistName) return;
    if (!confirm("¿Quitar esta canción de la playlist?")) return;

    playlists[currentPlaylistName].songs.splice(index, 1);
    savePlaylists();
    renderCatalog(searchInput.value);
    showNotification("Canción quitada", "info");
}

function deleteCurrentPlaylist() {
    if (!currentPlaylistName) return;
    if (!confirm(`¿Eliminar la playlist "${currentPlaylistName}"?`)) return;

    delete playlists[currentPlaylistName];
    savePlaylists();
    switchView("playlists");
    showNotification("Playlist eliminada", "info");
}

// ==========================================
// BÚSQUEDA
// ==========================================
function searchHandler() {
    const value = searchInput.value.trim();
    if (currentView === "records") {
    return;
}

    if (!value) {
        renderCatalog("");
        return;
    }

    if (["all", "albums", "playlists"].includes(currentView)) {
        renderSearchResults(value);
    } else {
        renderCatalog(value);
    }
}

function renderSearchResults(searchTerm) {
    const query = normalize(searchTerm);
    const results = getAllSongs().filter(song =>
        normalize(song.name).includes(query) ||
        normalize(song.artist).includes(query) ||
        normalize(song.albumName).includes(query) ||
        normalize(song.genre).includes(query)
    );

    catalog.innerHTML = `
        <div class="playlist-title">
            <div>
                <h3><i class="fas fa-search"></i> Resultados</h3>
                <p>${results.length} resultado(s) para "${searchTerm}"</p>
            </div>
        </div>
    `;

    if (!results.length) {
        catalog.insertAdjacentHTML("beforeend", emptyState("No se encontraron canciones"));
        return;
    }

    const fragment = document.createDocumentFragment();
    results.forEach(song => {
        fragment.appendChild(createSongCard(song, song.index, song.isFromAlbum));
    });
    catalog.appendChild(fragment);
}

// ==========================================
// ORGANIZACIÓN DE GÉNEROS
// ==========================================
function organizeSongsByGenre() {
    Object.keys(genrePlaylists).forEach(genre => {
        genrePlaylists[genre].songs = genrePlaylists[genre].songs.filter(song => song.isManual);
    });

    getAllSongs().forEach(song => {
        const genreKey = genrePlaylists[song.genre] ? song.genre : null;
        if (!genreKey) return;

        const exists = genrePlaylists[genreKey].songs.some(item => getSongId(item) === getSongId(song));

        if (!exists) {
            genrePlaylists[genreKey].songs.push({ ...song, isManual: false });
        }
    });
}

// ==========================================
// RESTAURAR ÚLTIMA CANCIÓN
// ==========================================
function restoreLastSong() {
    forceHideBigPlayer();

    const saved = localStorage.getItem("lastSongData");
    if (!saved) return;

    try {
        const data = JSON.parse(saved);

        if (data.index === -1 || data.index === null) {
            hideMiniPlayer();
            return;
        }

        if (data.isFromAlbum && data.albumName && albums[data.albumName]) {
            const song = albums[data.albumName].songs[data.index];
            if (!song) return;

            currentAlbum = data.albumName;
            currentAlbumIndex = data.index;
            isPlayingFromAlbum = true;

            audio.src = song.file;
            updatePlayerInfo(song);
        } else if (songs[data.index]) {
            const song = songs[data.index];

            currentIndex = data.index;
            isPlayingFromAlbum = false;

            audio.src = song.file;
            updatePlayerInfo(song);
        }

        hideMiniPlayer();
    } catch {
        localStorage.removeItem("lastSongData");
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
    const value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;

    progress.value = value;

    const miniProgress = $("#miniPlayerProgress");
    if (miniProgress) miniProgress.value = value;

    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    totalTimeDisplay.textContent = formatTime(audio.duration);

    const miniCurrent = $("#miniCurrentTime");
    const miniTotal = $("#miniTotalTime");

    if (miniCurrent) miniCurrent.textContent = formatTime(audio.currentTime);
    if (miniTotal) miniTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", nextSong);

progress.addEventListener("input", () => {
    if (!audio.duration) return;
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
});

volumeControl.addEventListener("input", () => {
    audio.volume = Number(volumeControl.value) / 100;
    localStorage.setItem("playerVolume", volumeControl.value);
});

searchInput.addEventListener("input", searchHandler);

document.addEventListener("keydown", e => {
    const tag = document.activeElement.tagName.toLowerCase();
    if (tag === "input") return;

    if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
    }

    if (e.code === "ArrowRight") nextSong();
    if (e.code === "ArrowLeft") prevSong();
});

window.addEventListener("beforeunload", () => {
    const data = {
        isFromAlbum: isPlayingFromAlbum,
        index: isPlayingFromAlbum ? currentAlbumIndex : currentIndex,
        albumName: isPlayingFromAlbum ? currentAlbum : null
    };

    localStorage.setItem("lastSongData", JSON.stringify(data));
});

// ==========================================
// INICIALIZACIÓN
// ==========================================
function init() {
    const savedVolume = localStorage.getItem("playerVolume");
    
    if (savedVolume !== null) {
        volumeControl.value = savedVolume;
    }

    audio.volume = Number(volumeControl.value) / 100;
    forceHideBigPlayer();
    createMiniPlayer();
    createModals();
    createNavButtons();
    loadGenrePlaylists();
    loadPlaylists();
    organizeSongsByGenre();
    renderCatalog();
    forceHideBigPlayer();
    restoreLastSong();
}

init();