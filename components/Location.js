const Location = [
    { locate: 'Bangkok, Thailand', cord: { lat: 13.736717, long: 100.523186 } },
    { locate: 'Krabi, Thailand', cord: { lat: 8.0812076, long: 98.8848255 } },
    { locate: 'Kanchanaburi, Thailand', cord: { lat: 14.0362449, long: 99.0413476 } },
    { locate: 'Kalasin, Thailand', cord: { lat: 16.4386382, long: 103.4986907 } },
    { locate: 'Kamphaeng Phet, Thailand', cord: { lat: 16.3950047, long: 99.2332608 } },
    { locate: 'Khon Kaen, Thailand', cord: { lat: 16.4440319, long: 102.7500532 } },
    { locate: 'Chanthaburi, Thailand', cord: { lat: 12.601872, long: 102.0742376 } },
    { locate: 'Chachoengsao, Thailand', cord: { lat: 13.5782213, long: 101.1391626 } },
    { locate: 'Chonburi, Thailand', cord: { lat: 13.0495081, long: 100.9017925 } },
    { locate: 'Chainat, Thailand', cord: { lat: 15.1592991, long: 100.0784153 } },
    { locate: 'Chaiyaphum, Thailand', cord: { lat: 16.0082727, long: 101.3326424 } },
    { locate: 'Chumphon, Thailand', cord: { lat: 10.3183224, long: 98.5236746 } },
    { locate: 'Chiang Rai, Thailand', cord: { lat: 19.921806, long: 99.8086844 } },
    { locate: 'Chiang Mai, Thailand', cord: { lat: 18.7943239, long: 98.9214578 } },
    { locate: 'Trang, Thailand', cord: { lat: 7.56074, long: 99.5988791 } },
    { locate: 'Trat, Thailand', cord: { lat: 12.2434513, long: 102.5059877 } },
    { locate: 'Tak, Thailand', cord: { lat: 16.5239313, long: 97.4944001 } },
    { locate: 'Nakhon Nayok, Thailand', cord: { lat: 14.2020165, long: 101.214369 } },
    { locate: 'Nakhon Pathom, Thailand', cord: { lat: 13.7852851, long: 99.9701029 } },
    { locate: 'Nakhon Phanom, Thailand', cord: { lat: 17.4063194, long: 103.8336588 } },
    { locate: 'Nakhon Ratchasima, Thailand', cord: { lat: 14.9674218, long: 102.06823 } },
    { locate: 'Nakhon Si Thammarat, Thailand', cord: { lat: 8.4242435, long: 99.8963919 } },
    { locate: 'Nakhon Sawan, Thailand', cord: { lat: 15.6888632, long: 100.051194 } },
    { locate: 'Nonthaburi, Thailand', cord: { lat: 13.8557611, long: 100.4783308 } },
    { locate: 'Narathiwat, Thailand', cord: { lat: 6.1849834, long: 101.4520728 } },
    { locate: 'Nan, Thailand', cord: { lat: 18.7838955, long: 100.7702083 } },
    { locate: 'Bueng Kan, Thailand', cord: { lat: 18.110199, long: 103.4362244 } },
    { locate: 'Buriram, Thailand', cord: { lat: 14.9951206, long: 103.1028367 } },
    { locate: 'Pathum Thani, Thailand', cord: { lat: 14.0963557, long: 100.5017378 } },
    { locate: 'Prachuap Khiri Khan, Thailand', cord: { lat: 11.8168367, long: 99.7853585 } },
    { locate: 'Prachinburi, Thailand', cord: { lat: 14.0229419, long: 101.3415784 } },
    { locate: 'Pattani, Thailand', cord: { lat: 6.8695371, long: 101.2417014 } },
    { locate: 'Phra Nakhon Si Ayutthaya, Thailand', cord: { lat: 14.3537709, long: 100.5512628 } },
    { locate: 'Phayao, Thailand', cord: { lat: 19.2711307, long: 99.8757075 } },
    { locate: 'Phang Nga, Thailand', cord: { lat: 8.6741671, long: 97.6086363 } },
    { locate: 'Phatthalung, Thailand', cord: { lat: 7.4928245, long: 99.8004278 } },
    { locate: 'Phichit, Thailand', cord: { lat: 16.2811585, long: 100.1112918 } },
    { locate: 'Phitsanulok, Thailand', cord: { lat: 16.8170342, long: 100.2504741 } },
    { locate: 'Phetchaburi, Thailand', cord: { lat: 12.9544239, long: 99.3250505 } },
    { locate: 'Phetchabun, Thailand', cord: { lat: 6.2487684, long: 100.6537143 } },
    { locate: 'Phrae, Thailand', cord: { lat: 18.262015, long: 99.679231 } },
    { locate: 'Phuket, Thailand', cord: { lat: 7.8309254, long: 98.0797405 } },
    { locate: 'Maha Sarakham, Thailand', cord: { lat: 16.0250622, long: 102.6137267 } },
    { locate: 'Mukdahan, Thailand', cord: { lat: 16.5568083, long: 104.6402533 } },
    { locate: 'Mae Hong Son, Thailand', cord: { lat: 18.7261112, long: 97.438268 } },
    { locate: 'Yasothon, Thailand', cord: { lat: 15.7954462, long: 104.1331161 } },
    { locate: 'Yala, Thailand', cord: { lat: 6.5493556, long: 101.2592467 } },
    { locate: 'Roi Et, Thailand', cord: { lat: 15.9395486, long: 103.5311778 } },
    { locate: 'Ranong, Thailand', cord: { lat: 9.9662514, long: 98.6248355 } },
    { locate: 'Rayong, Thailand', cord: { lat: 12.6828479, long: 101.2138863 } },
    { locate: 'Ratchaburi, Thailand', cord: { lat: 13.5472038, long: 99.3380222 } },
    { locate: 'Lopburi, Thailand', cord: { lat: 15.2021029, long: 100.6412842 } },
    { locate: 'Lampang, Thailand', cord: { lat: 18.2830004, long: 99.4517254 } },
    { locate: 'Lamphun, Thailand', cord: { lat: 18.0691152, long: 98.4355819 } },
    { locate: 'Loei, Thailand', cord: { lat: 17.4874231, long: 100.9338592 } },
    { locate: 'Sisaket, Thailand', cord: { lat: 14.955871, long: 103.844346 } },
    { locate: 'Sakon Nakhon, Thailand', cord: { lat: 17.1718642, long: 104.1440014 } },
    { locate: 'Songkhla, Thailand', cord: { lat: 7.2048006, long: 100.5809339 } },
    { locate: 'Satun, Thailand', cord: { lat: 6.6133424, long: 100.0604314 } },
    { locate: 'Samut Prakan, Thailand', cord: { lat: 13.5980152, long: 100.5641045 } },
    { locate: 'Samut Songkhram, Thailand', cord: { lat: 13.3763198, long: 99.8920905 } },
    { locate: 'Samut Sakhon, Thailand', cord: { lat: 13.5429305, long: 100.2712219 } },
    { locate: 'Sa Kaeo, Thailand', cord: { lat: 13.800767, long: 102.0429656 } },
    { locate: 'Saraburi, Thailand', cord: { lat: 14.526435, long: 100.9012499 } },
    { locate: 'Sing Buri, Thailand', cord: { lat: 14.9168889, long: 100.194797 } },
    { locate: 'Sukhothai, Thailand', cord: { lat: 17.2526064, long: 99.4305323 } },
    { locate: 'Suphan Buri, Thailand', cord: { lat: 14.5699883, long: 99.5021279 } },
    { locate: 'Surat Thani, Thailand', cord: { lat: 15.23844, long: 104.84866 } },
    { locate: 'Surin, Thailand', cord: { lat: 14.906207, long: 103.3103925 } },
    { locate: 'Nong Khai, Thailand', cord: { lat: 17.9482402, long: 102.4558122 } },
    { locate: 'Nong Bua Lamphu, Thailand', cord: { lat: 17.2257018, long: 102.0523573 } },
    { locate: 'Ang Thong, Thailand', cord: { lat: 14.6209449, long: 100.2119342 } },
    { locate: 'Amnat Charoen, Thailand', cord: { lat: 15.9112184, long: 104.4593206 } },
    { locate: 'Udon Thani, Thailand', cord: { lat: 17.4456203, long: 102.2813234 } },
    { locate: 'Uttaradit, Thailand', cord: { lat: 17.7723493, long: 99.9840364 } },
    { locate: 'Uthai Thani, Thailand', cord: { lat: 15.3703927, long: 99.2648087 } },
    { locate: 'Ubon Ratchathani, Thailand', cord: { lat: 15.1544629, long: 104.4437667 } },
]

export default  Location;